import { expect, fake } from "@infra-blocks/test";
import {
  getMatchers,
  LiteralMatcher,
  RegexMatcher,
} from "../../src/matcher.js";
import * as sinon from "sinon";

describe("matcher", function () {
  describe(LiteralMatcher.name, function () {
    const matcher = LiteralMatcher.fromString("hello");
    describe("matches", function () {
      it("should return true when the input is equal", function () {
        expect(matcher.matches("hello")).to.be.true;
      });
      it("should return false when input has different casing", function () {
        expect(matcher.matches("Hello")).to.be.false;
      });
      it("should return false when input as whitespace padding", function () {
        expect(matcher.matches(" hello ")).to.be.false;
      });
      it("should return false when input is a superset", function () {
        expect(matcher.matches("de hello?")).to.be.false;
      });
      it("should return false when input has a prefix", function () {
        expect(matcher.matches("de hello")).to.be.false;
      });
      it("should return false when input has a suffix", function () {
        expect(matcher.matches("hello?")).to.be.false;
      });
    });
  });
  describe(RegexMatcher.name, function () {
    describe("source", function () {
      it("should work with empty regex", function () {
        const matcher = RegexMatcher.create(new RegExp(""));
        expect(matcher.source()).to.equal("/(?:)/");
      });
      it("should work with regex without escapes", function () {
        const matcher = RegexMatcher.create(new RegExp("[12345]"));
        expect(matcher.source()).to.equal("/[12345]/");
      });
      it("should work with regex without escapes", function () {
        const matcher = RegexMatcher.create(new RegExp("\\."));
        expect(matcher.source()).to.equal("/\\./");
      });
      it("should return true for a valid regex with flags and with escapes", function () {
        const matcher = RegexMatcher.create(new RegExp("\\.", "id"));
        expect(matcher.source()).to.equal("/\\./di");
      });
    });
    describe("matches", () => {
      it("should dispatch to regex test function", function () {
        const test = sinon.fake.returns(true);
        const fakeRegex = fake<RegExp>({
          test,
        });
        const matcher = RegexMatcher.create(fakeRegex);
        expect(matcher.matches("toto")).to.be.true;
        expect(test).to.have.been.calledOnceWith("toto");
      });
    });
    describe(RegexMatcher.fromRegexLiteral.name, function () {
      it("should construct the right regexp with escapes and flags", function () {
        const matcher = RegexMatcher.fromRegexLiteral("/^\\.env(\\(.+\\))$/i");
        // One valid string.
        expect(matcher.matches(".env(5)")).to.be.true;
        // Empty is no bueno.
        expect(matcher.matches("")).to.be.false;
        // Does not start with a dot.
        expect(matcher.matches("env(5)")).to.be.false;
        // Does not have parentheses.
        expect(matcher.matches(".env5")).to.be.false;
        // Empty parentheses.
        expect(matcher.matches(".env()")).to.be.false;
        // Has left padding.
        expect(matcher.matches(" .env(5)")).to.be.false;
        // Has right padding.
        expect(matcher.matches(".env(5) ")).to.be.false;
      });
      it("should throw for invalid flags", function () {
        expect(() =>
          RegexMatcher.fromRegexLiteral("/^\\.env(\\(.+\\))$/shambala"),
        ).to.throw();
      });
    });
    describe(getMatchers.name, function () {
      it("should return appropriate matchers for multiple ones", function () {
        const matchers = getMatchers([
          "literal matcher",
          "/^regex .* matcher$/",
          "/regex/matcher/with/nested/slashes/di",
        ]);
        expect(matchers[0].source()).to.equal("literal matcher");
        // Not a regex. Determined by checking with superset.
        expect(matchers[0].matches("literal matcher")).to.be.true;
        expect(matchers[0].matches("literal matcherz")).to.be.false;

        expect(matchers[1].source()).to.equal("/^regex .* matcher$/");
        // Test that it's really a regex matcher and not literal (doesn't need the slashes /).
        expect(matchers[1].matches("regex trolololol matcher")).to.be.true;

        expect(matchers[2].source()).to.equal(
          "/regex/matcher/with/nested/slashes/di",
        );
        expect(matchers[2].matches("regex/matcher/with/nested/slashes")).to.be
          .true;
      });
    });
  });
});
