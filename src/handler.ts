import { Outputs, PullRequest } from "@infra-blocks/github";
import VError from "verror";

export interface Inputs {
  "exactly-once": string;
  "pull-request": string;
}

export interface CheckLabelsOutputs extends Outputs {
  ["matched-labels"]: string;
}

export class CheckLabelsHandler {
  private static ERROR_NAME = "CheckLabelsHandlerError";

  private readonly oneOf: RegExp[];
  private readonly pullRequest: PullRequest;

  private constructor(params: { oneOf: RegExp[]; pullRequest: PullRequest }) {
    const { oneOf, pullRequest } = params;
    this.oneOf = oneOf;
    this.pullRequest = pullRequest;
  }

  handle(): Promise<CheckLabelsOutputs> {
    const matched = [];
    const labels = this.pullRequest.labels.map((label) => label.name);
    const oneOfMatches = this.matches({
      labels,
      patterns: this.oneOf,
    });

    if (oneOfMatches.length !== 1) {
      throw new VError(
        { name: CheckLabelsHandler.ERROR_NAME },
        `expected to find exactly one match of ${JSON.stringify(
          this.oneOf.map((pattern) => pattern.source),
        )} but found ${oneOfMatches.length} in PR labels ${JSON.stringify(
          labels,
        )}`,
      );
    }

    matched.push(...oneOfMatches);

    return Promise.resolve({
      "matched-labels": JSON.stringify(matched),
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

  static create(params: { oneOf: RegExp[]; pullRequest: PullRequest }) {
    return new CheckLabelsHandler(params);
  }
}

export async function handler(inputs: Inputs) {
  const oneOfParsed = JSON.parse(inputs["exactly-once"]) as object;

  if (!Array.isArray(oneOfParsed)) {
    throw new Error(`expected a JSON array but got ${inputs["exactly-once"]}`);
  }

  const oneOf = oneOfParsed.map((expression: string) => new RegExp(expression));
  const pullRequest = JSON.parse(inputs["pull-request"]) as PullRequest;

  const handler = CheckLabelsHandler.create({ oneOf, pullRequest });
  return handler.handle();
}
