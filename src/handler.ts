import { CheckLabelsActionError } from "./error.js";
import { Matcher, getMatchers } from "./matcher.js";
import { HandlerOutputs, HandlerParams, Issue } from "./types.js";

export class CheckLabelsHandler {
  private readonly exactlyOnce: Matcher[];
  private readonly issue: Issue;

  private constructor(params: { exactlyOnce: Matcher[]; issue: Issue }) {
    const { exactlyOnce, issue } = params;
    this.exactlyOnce = exactlyOnce;
    this.issue = issue;
  }

  handle(): Promise<HandlerOutputs> {
    const matched = [];
    const labels = this.issue.labels.map((label) => label.name);
    const oneOfMatches = this.matches({
      labels,
      matchers: this.exactlyOnce,
    });

    if (oneOfMatches.length !== 1) {
      throw new CheckLabelsActionError(
        {},
        `expected to find exactly one match of ${JSON.stringify(
          this.exactlyOnce.map((matcher) => matcher.source()),
        )} but found ${oneOfMatches.length} in PR labels ${JSON.stringify(
          labels,
        )}`,
      );
    }

    matched.push(...oneOfMatches);

    return Promise.resolve({
      "matched-labels": matched,
    });
  }

  private matches(params: { labels: string[]; matchers: Matcher[] }): string[] {
    const { labels, matchers } = params;
    const matches = [];
    for (const matcher of matchers) {
      const patternMatches = labels.filter((label) => matcher.matches(label));
      matches.push(...patternMatches);
    }
    return matches;
  }

  static create(params: { exactlyOnce: Matcher[]; issue: Issue }) {
    return new CheckLabelsHandler(params);
  }
}

export async function handler(params: HandlerParams): Promise<HandlerOutputs> {
  const { exactlyOnce, issue } = params;
  const handler = CheckLabelsHandler.create({
    issue,
    exactlyOnce: getMatchers(exactlyOnce),
  });
  return handler.handle();
}
