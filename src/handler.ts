import core from "@actions/core";
import { Outputs } from "@infra-blocks/github";

export interface HandlerOutputs extends Outputs {
  "example-output": string;
}

export function handler(params: {
  exampleInput: string;
}): Promise<HandlerOutputs> {
  const { exampleInput } = params;
  core.info("Running handler!");
  core.info(`received your input: ${exampleInput}`);
  return Promise.resolve({
    "example-output": "BYE!",
  });
}
