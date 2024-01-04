import { createHandler } from "../../src/handler.js";
import { expect, fake } from "@infra-blocks/test";
import { PullRequest } from "@infra-blocks/github";

describe("handler", function () {
  describe(createHandler.name, function () {
    it("should create handler", function () {
      const handler = createHandler({
        config: { oneOf: [/toto/], pullRequest: fake<PullRequest>() },
      });
      expect(handler).to.not.be.null;
    });
  });
});
