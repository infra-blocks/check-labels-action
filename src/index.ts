import { checkNotNull } from "@infra-blocks/checks";
import { runActionHandler, stringInput } from "@infra-blocks/github";
import { handler } from "./handler.js";
import { context } from "@actions/github";

// TODO: jsonArrayInput() or integrate zod with inputs instead.
runActionHandler(handler, {
  "exactly-once": stringInput(),
  "pull-request": stringInput({
    default: () => JSON.stringify(checkNotNull(context.payload.pull_request)),
  }),
});
