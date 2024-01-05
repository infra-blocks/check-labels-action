import * as core from "@actions/core";
import { context } from "@actions/github";
import { createHandler } from "./handler.js";
import { checkNotNull } from "@infra-blocks/checks";
import {
  arrayInput,
  getInputs,
  PullRequest,
  stringInput,
} from "@infra-blocks/github";
import VError from "verror";

async function main() {
  core.debug(`received env: ${JSON.stringify(process.env, null, 2)}`);
  core.debug(`received context: ${JSON.stringify(context, null, 2)}`);
  const inputs = getInputs({
    "one-of": arrayInput({ separator: ",", trim: true }),
    "pull-request": stringInput({
      default: () => JSON.stringify(checkNotNull(context.payload.pull_request)),
    }),
  });
  const oneOf = inputs["one-of"].map((label) => new RegExp(label));
  const pullRequest = JSON.parse(inputs["pull-request"]) as PullRequest;

  const handler = createHandler({
    config: {
      oneOf,
      pullRequest,
    },
  });
  const outputs = await handler.handle();
  for (const [key, value] of Object.entries(outputs)) {
    core.debug(`setting output ${key}=${value}`);
    core.setOutput(key, value);
  }
}

main().catch((err: Error) => core.setFailed(VError.fullStack(err)));
