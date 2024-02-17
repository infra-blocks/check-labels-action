import { expect } from "@infra-blocks/test";
import { handler } from "../../src/handler.js";

describe("handler", function () {
  describe(handler.name, function () {
    describe("exactly-once", function () {
      it("should work with a label matching", async function () {
        expect(
          await handler({
            exactlyOnce: [new RegExp("toto")],
            issue: {
              labels: [{ name: "big-toto" }],
            },
          }),
        ).to.deep.equal({
          "matched-labels": JSON.stringify(["big-toto"]),
        });
      });
      it("should throw if it cannot find a match", async function () {
        await expect(
          handler({
            exactlyOnce: [new RegExp("tata")],
            issue: {
              labels: [{ name: "toto" }],
            },
          }),
        ).to.be.rejected;
      });
    });
  });
});
