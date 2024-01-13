import { expect } from "@infra-blocks/test";
import { parseInputs } from "../../src/inputs.js";

describe("inputs", function () {
  describe(parseInputs.name, function () {
    describe("exactly-once", function () {
      const pullRequest = JSON.stringify({
        labels: [{ name: "toto" }],
      });

      it("should work for a valid JSON string array", function () {
        const exactlyOnce = JSON.stringify(["expression", "isme"]);
        expect(
          parseInputs({
            "exactly-once": exactlyOnce,
            "pull-request": pullRequest,
          }),
        ).to.deep.equal({
          exactlyOnce: [new RegExp("expression"), new RegExp("isme")],
          pullRequest: {
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
            "pull-request": pullRequest,
          }),
        ).to.throw();
      });
      it("should throw if input is missing", function () {
        expect(() => parseInputs({ "pull-request": pullRequest })).to.throw();
      });
    });

    describe("pull-request", function () {
      const exactlyOnce = JSON.stringify(["expression", "isme"]);

      it("should work for a valid JSON object", function () {
        const pullRequest = JSON.stringify({
          labels: [{ name: "toto" }],
        });

        expect(
          parseInputs({
            "exactly-once": exactlyOnce,
            "pull-request": pullRequest,
          }),
        ).to.deep.equal({
          exactlyOnce: [new RegExp("expression"), new RegExp("isme")],
          pullRequest: {
            labels: [{ name: "toto" }],
          },
        });
      });
      it("should throw if pull-request has no labels", function () {
        const pullRequest = JSON.stringify({
          labelz: [{ name: "toto" }],
        });

        expect(() =>
          parseInputs({
            "exactly-once": exactlyOnce,
            "pull-request": pullRequest,
          }),
        ).to.throw();
      });
      it("should throw if input is missing", function () {
        expect(() => parseInputs({ "exactly-once": exactlyOnce })).to.throw();
      });
    });
  });
});
