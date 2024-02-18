export interface Matcher {
  matches(input: string): boolean;
  source(): string;
}

const REGEX_INPUT_REGEX = /\/(?<expression>.*)\/(?<flags>.*)/;

export class RegexMatcher implements Matcher {
  private readonly regex: RegExp;
  private constructor(params: { regex: RegExp }) {
    const { regex } = params;
    this.regex = regex;
  }

  matches(input: string): boolean {
    return this.regex.test(input);
  }

  source(): string {
    // Replace \/ escapes to reflect how the user provided the regex.
    const unescaped = this.regex.source.replace(/\\\//g, "/");

    if (this.regex.flags === "") {
      return `/${unescaped}/`;
    }

    return `/${unescaped}/${this.regex.flags}`;
  }

  static create(regex: RegExp) {
    return new RegexMatcher({ regex });
  }

  static fromRegexLiteral(input: string) {
    const matches = REGEX_INPUT_REGEX.exec(input);
    if (matches == null || matches.groups == null) {
      throw new Error(`invalid regex ${input}`);
    }
    const expression = matches.groups.expression;
    const flags = matches.groups.flags;

    return RegexMatcher.create(new RegExp(expression, flags));
  }

  static isRegexLiteral(input: string): boolean {
    return REGEX_INPUT_REGEX.test(input);
  }
}

export class LiteralMatcher implements Matcher {
  private readonly literal: string;

  private constructor(params: { literal: string }) {
    const { literal } = params;
    this.literal = literal;
  }

  matches(input: string): boolean {
    return input === this.literal;
  }

  source(): string {
    return this.literal;
  }

  static fromString(literal: string) {
    return new LiteralMatcher({ literal });
  }
}

export function getMatcher(input: string): Matcher {
  if (RegexMatcher.isRegexLiteral(input)) {
    return RegexMatcher.fromRegexLiteral(input);
  }
  return LiteralMatcher.fromString(input);
}

export function getMatchers(inputs: ReadonlyArray<string>): Matcher[] {
  return inputs.map((input) => getMatcher(input));
}
