import { expect } from "@infra-blocks/test";
import { handler } from "../../src/handler.js";

describe("handler", function () {
  describe(handler.name, function () {
    describe("one-of", function () {
      it("should work with a label matching", async function () {
        const pullRequest = JSON.stringify({
          labels: [{ name: "toto" }],
        });
        expect(
          await handler({ "one-of": ["toto"], "pull-request": pullRequest }),
        ).to.deep.equal({
          "matched-labels": "toto",
        });
      });
      it("should throw if it cannot find a match", async function () {
        const pullRequest = JSON.stringify({
          labels: [{ name: "toto" }],
        });
        await expect(
          handler({ "one-of": ["tata"], "pull-request": pullRequest }),
        ).to.be.rejected;
      });
    });
  });
});
