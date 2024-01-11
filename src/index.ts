import { getInputs, runActionHandler } from "@infra-blocks/github-actions";
import { handler } from "./handler.js";
import { parseInputs } from "./inputs.js";

runActionHandler(() => {
  return handler(parseInputs(getInputs("exactly-once", "pull-request")));
});
