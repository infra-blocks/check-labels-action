import { expect } from "@infra-blocks/test";
import { handler } from "../../src/handler.js";

describe("handler", function () {
  describe(handler.name, function () {
    describe("exactly-once", function () {
      it("should work with a label matching", async function () {
        expect(
          await handler({
            exactlyOnce: ["toto"],
            issue: { labels: [{ name: "toto" }] },
          }),
        ).to.deep.equal({
          "matched-labels": ["toto"],
        });
      });
      it("should throw if it cannot find a match", async function () {
        await expect(
          handler({
            exactlyOnce: ["tata"],
            issue: { labels: [{ name: "toto" }] },
          }),
        ).to.be.rejected;
      });
    });
  });
});
