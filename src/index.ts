import { checkNotNull } from "@infra-blocks/checks";
import {
  arrayInput,
  runActionHandler,
  stringInput,
} from "@infra-blocks/github";
import { handler } from "./handler.js";
import { context } from "@actions/github";

runActionHandler(handler, {
  "one-of": arrayInput({ separator: ",", trim: true }),
  "pull-request": stringInput({
    default: () => JSON.stringify(checkNotNull(context.payload.pull_request)),
  }),
});
