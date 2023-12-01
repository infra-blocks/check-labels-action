import * as core from "@actions/core";
import { context } from "@actions/github";
import { createHandler } from "./handler.js";
import {
  arrayInput,
  checkSupportedEvent,
  Event,
  getInputs,
} from "@infra-blocks/github";
import VError from "verror";

async function main() {
  core.debug(`received context: ${JSON.stringify(context, null, 2)}`);
  const debugInputs = Object.entries(process.env).filter(([key]) =>
    key.startsWith("INPUT")
  );
  core.debug(`received inputs: ${JSON.stringify(debugInputs, null, 2)}`);
  core.debug(`receive env: ${JSON.stringify(process.env, null, 2)}`);
  checkSupportedEvent(context.eventName, [Event.PullRequest]);
  // TODO: trim in lib.
  const inputs = getInputs({
    "one-of": arrayInput({ separator: "," }),
  });
  const oneOf = inputs["one-of"].map((label) => new RegExp(label.trim()));
  const handler = createHandler({
    context,
    config: {
      oneOf,
    },
  });
  const outputs = await handler.handle();
  for (const [key, value] of Object.entries(outputs)) {
    core.debug(`setting output ${key}=${value}`);
    core.setOutput(key, value);
  }
}

main().catch((err: Error) => core.setFailed(VError.fullStack(err)));
