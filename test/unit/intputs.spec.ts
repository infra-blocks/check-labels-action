import { expect } from "@infra-blocks/test";
import { parseInputs } from "../../src/inputs.js";

describe("inputs", function () {
  describe(parseInputs.name, function () {
    it("should throw if inputs are missing", function () {
      expect(() => parseInputs({})).to.throw();
    });
    it("should throw if exactly-once is not a JSON string array", function () {
      const exactlyOnce = JSON.stringify([
        "hello",
        2,
        "woops no number thanks",
      ]);
      const pullRequest = JSON.stringify({
        labels: [{ name: "toto" }],
      });

      expect(() =>
        parseInputs({
          "exactly-once": exactlyOnce,
          "pull-request": pullRequest,
        }),
      ).to.throw();
    });
    it("should throw if pull-request has no labels", function () {
      const exactlyOnce = JSON.stringify(["expression", "isme"]);
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
    it("should correctly transform both inputs otherwise", function () {
      const exactlyOnce = JSON.stringify(["expression", "isme"]);
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
  });
});
