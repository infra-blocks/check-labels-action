import { expect } from "@infra-blocks/test";
import { parseInputs } from "../../src/inputs.js";

describe("inputs", function () {
  describe(parseInputs.name, function () {
    describe("exactly-once", function () {
      const issue = JSON.stringify({
        labels: [{ name: "toto" }],
      });

      it("should work for a valid JSON string array", function () {
        const exactlyOnce = JSON.stringify(["expression", "isme"]);
        expect(
          parseInputs({
            "exactly-once": exactlyOnce,
            issue,
          }),
        ).to.deep.equal({
          exactlyOnce: [new RegExp("expression"), new RegExp("isme")],
          issue: {
            labels: [{ name: "toto" }],
          },
        });
      });
      it("should throw if exactly-once is not a JSON string array", function () {
        const exactlyOnce = JSON.stringify([
          "hello",
          2,
          "woops no number thanks",
        ]);

        expect(() =>
          parseInputs({
            "exactly-once": exactlyOnce,
            issue,
          }),
        ).to.throw();
      });
      it("should throw if input is missing", function () {
        expect(() => parseInputs({ issue })).to.throw();
      });
    });

    describe("issue", function () {
      const exactlyOnce = JSON.stringify(["expression", "isme"]);

      it("should work for a valid JSON object", function () {
        const issue = JSON.stringify({
          labels: [{ name: "toto" }],
        });

        expect(
          parseInputs({
            "exactly-once": exactlyOnce,
            issue,
          }),
        ).to.deep.equal({
          exactlyOnce: [new RegExp("expression"), new RegExp("isme")],
          issue: {
            labels: [{ name: "toto" }],
          },
        });
      });
      it("should throw if issue has no labels", function () {
        const issue = JSON.stringify({
          labelz: [{ name: "toto" }],
        });

        expect(() =>
          parseInputs({
            "exactly-once": exactlyOnce,
            issue,
          }),
        ).to.throw();
      });
      it("should throw if input is missing", function () {
        expect(() => parseInputs({ "exactly-once": exactlyOnce })).to.throw();
      });
    });
  });
});
