import { expect } from "@infra-blocks/test";
import { parseInputs } from "../../src/inputs.js";
import { Issue } from "../../src/types.js";

describe("inputs", function () {
  describe(parseInputs.name, function () {
    const validExactlyOnce = ["expression", "isme"];
    const validIssue = {
      labels: [{ name: "toto" }],
    };

    function expectSuccess(params: { exactlyOnce?: string[]; issue?: Issue }) {
      const { exactlyOnce = validExactlyOnce, issue = validIssue } = params;

      expect(
        parseInputs({
          "exactly-once": JSON.stringify(exactlyOnce),
          issue: JSON.stringify(issue),
        }),
      ).to.deep.equal({ exactlyOnce, issue });
    }

    function expectFailure(params: { exactlyOnce?: unknown; issue?: unknown }) {
      const { exactlyOnce, issue } = params;

      expect(() =>
        parseInputs({
          "exactly-once": JSON.stringify(exactlyOnce),
          issue: JSON.stringify(issue),
        }),
      ).to.throw();
    }

    describe("exactly-once", function () {
      it("should work for a valid JSON string array", function () {
        expectSuccess({ exactlyOnce: ["one", "two"] });
      });
      it("should throw if exactly-once is not a JSON string array", function () {
        expectFailure({
          exactlyOnce: ["hello", 2, "woops no number thanks"],
          issue: validIssue,
        });
      });
      it("should throw if input is missing", function () {
        expectFailure({ issue: JSON.stringify(validIssue) });
      });
    });

    describe("issue", function () {
      it("should work for a valid JSON object", function () {
        expectSuccess({ issue: { labels: [{ name: "toto" }] } });
      });
      it("should throw if issue has no labels", function () {
        expectFailure({
          exactlyOnce: validExactlyOnce,
          issue: { labelz: [{ name: "toto" }] },
        });
      });
      it("should throw if input is missing", function () {
        expectFailure({ exactlyOnce: validExactlyOnce });
      });
    });
  });
});
