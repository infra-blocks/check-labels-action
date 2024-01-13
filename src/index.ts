import { getInputs, runActionHandler } from "@infra-blocks/github-actions";
import { handler } from "./handler.js";
import { parseInputs } from "./inputs.js";

runActionHandler(() => {
<<<<<<< HEAD
  return handler(parseInputs(getInputs("exactly-once", "pull-request")));
=======
  return handler(parseInputs(getInputs("example-input")));
>>>>>>> template/master
});
