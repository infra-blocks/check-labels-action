import { runActionHandler, stringInput } from "@infra-blocks/github";
import { handler } from "./handler.js";

runActionHandler(handler, {
  exampleInput: stringInput({ name: "example-input" }),
});
