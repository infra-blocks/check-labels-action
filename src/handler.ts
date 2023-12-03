import { Context } from "@actions/github/lib/context.js";
import { PullRequest } from "@infra-blocks/github";
import { checkNotNull } from "@infra-blocks/checks";
import * as core from "@actions/core";
import VError from "verror";

export interface Config {
  oneOf: RegExp[];
}

// TODO: move into lib?
export type Outputs = Record<string, string>;

export interface Handler<O extends Outputs = Outputs> {
  handle(): Promise<O>;
}

export interface CheckLabelsOutputs extends Outputs {
  ["matched-labels"]: string;
}

export class CheckLabelsHandler implements Handler<CheckLabelsOutputs> {
  private static ERROR_NAME = "CheckLabelsHandlerError";

  private readonly context: Context;
  private readonly config: Config;

  constructor(params: { context: Context; config: Config }) {
    const { context, config } = params;
    this.context = context;
    this.config = config;
  }

  handle(): Promise<CheckLabelsOutputs> {
    core.debug(
      `processing PR event with config: ${JSON.stringify(
        { oneOf: this.config.oneOf.map((regex) => regex.toString()) },
        null,
        2
      )}`
    );

    const matched = [];
    const pullRequest = checkNotNull(
      this.context.payload.pull_request
    ) as PullRequest;
    const labels = pullRequest.labels.map((label) => label.name);
    const oneOfMatches = this.matches({
      labels,
      patterns: this.config.oneOf,
    });

    if (oneOfMatches.length !== 1) {
      throw new VError(
        { name: CheckLabelsHandler.ERROR_NAME },
        `expected to find exactly one match of ${JSON.stringify(
          this.config.oneOf.map((pattern) => pattern.source)
        )} but found ${oneOfMatches.length} in PR labels ${JSON.stringify(
          labels
        )}`
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

export function createHandler(params: {
  context: Context;
  config: Config;
}): Handler {
  return new CheckLabelsHandler(params);
}
