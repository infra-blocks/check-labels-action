import { expect } from "@infra-blocks/test";
import { handler } from "../../src/handler.js";

describe("handler", function () {
  describe(handler.name, function () {
    describe("exactly-once", function () {
      it("should work with a label matching", async function () {
        const pullRequest = JSON.stringify({
          labels: [{ name: "big-toto" }],
        });
        expect(
          await handler({
            "exactly-once": JSON.stringify(["toto"]),
            "pull-request": pullRequest,
          }),
        ).to.deep.equal({
          "matched-labels": JSON.stringify(["big-toto"]),
        });
      });
      it("should throw if it cannot find a match", async function () {
        const pullRequest = JSON.stringify({
          labels: [{ name: "toto" }],
        });
        await expect(
          handler({
            "exactly-once": JSON.stringify(["tata"]),
            "pull-request": pullRequest,
          }),
        ).to.be.rejected;
      });
    });
  });
});
