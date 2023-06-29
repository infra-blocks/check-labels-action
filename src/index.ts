import * as core from "@actions/core";
import { context } from "@actions/github";
import { createHandler } from "./handler.js";
import VError = require("verror");
import {
  checkSupportedEvent,
  Event,
  getInputs,
  stringInput,
} from "@infra-blocks/github";

async function main() {
  core.debug(`received context: ${JSON.stringify(context, null, 2)}`);
  checkSupportedEvent(context.eventName, [Event.Push]);
  const inputs = getInputs({
    example: stringInput(),
  });
  const handler = createHandler({
    context,
    config: {
      example: inputs.example,
    },
  });
  await handler.handle();
}

main().catch((err: Error) => core.setFailed(VError.fullStack(err)));
