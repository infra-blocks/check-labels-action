import * as core from "@actions/core";
import { Outputs, PullRequest } from "@infra-blocks/github";
import VError from "verror";

export interface Inputs {
  "one-of": readonly string[];
  "pull-request": string;
}

export interface Config {
  oneOf: RegExp[];
  pullRequest: PullRequest;
}

export interface CheckLabelsOutputs extends Outputs {
  ["matched-labels"]: string;
}

export class CheckLabelsHandler {
  private static ERROR_NAME = "CheckLabelsHandlerError";

  private readonly config: Config;

  constructor(params: { config: Config }) {
    const { config } = params;
    this.config = config;
  }

  handle(): Promise<CheckLabelsOutputs> {
    core.debug(
      `processing PR event with config: ${JSON.stringify(
        { oneOf: this.config.oneOf.map((regex) => regex.toString()) },
        null,
        2,
      )}`,
    );

    const matched = [];
    const labels = this.config.pullRequest.labels.map((label) => label.name);
    const oneOfMatches = this.matches({
      labels,
      patterns: this.config.oneOf,
    });

    if (oneOfMatches.length !== 1) {
      throw new VError(
        { name: CheckLabelsHandler.ERROR_NAME },
        `expected to find exactly one match of ${JSON.stringify(
          this.config.oneOf.map((pattern) => pattern.source),
        )} but found ${oneOfMatches.length} in PR labels ${JSON.stringify(
          labels,
        )}`,
      );
    }

    matched.push(...oneOfMatches);

    return Promise.resolve({
      "matched-labels": matched.join(","),
    });
  }

  private matches(params: { labels: string[]; patterns: RegExp[] }): string[] {
    const { labels, patterns } = params;
    const matches = [];
    for (const pattern of patterns) {
      const patternMatches = labels.filter((label) => pattern.test(label));
      matches.push(...patternMatches);
    }
    return matches;
  }
}

export function createHandler(params: { config: Config }): CheckLabelsHandler {
  return new CheckLabelsHandler(params);
}

export async function handler(inputs: Inputs) {
  const oneOf = inputs["one-of"].map((label) => new RegExp(label));
  const pullRequest = JSON.parse(inputs["pull-request"]) as PullRequest;

  const handler = createHandler({ config: { oneOf, pullRequest } });
  return handler.handle();
}
