import { expect } from "@infra-blocks/test";
import { parseInputs } from "../../src/inputs.js";

describe("inputs", function () {
  describe(parseInputs.name, function () {
    describe("example-input", function () {
      it("should work with a valid value", function () {
        expect(parseInputs({ "example-input": "hello" })).to.deep.equal({
          exampleInput: "hello",
        });
      });
      it("should throw when input is missing", function () {
        expect(() => parseInputs({})).to.throw();
      });
    });
  });
});
