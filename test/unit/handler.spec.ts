import { handler } from "../../src/handler.js";
import { expect } from "@infra-blocks/test";

describe("handler", function () {
  describe(handler.name, function () {
    it("should return the right output", async function () {
      expect(await handler({ exampleInput: "stuff" })).to.deep.equal({
        "example-output": "BYE!",
      });
    });
  });
});
