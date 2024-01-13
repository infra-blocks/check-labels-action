import { z } from "zod";
import { DockerTypescriptActionTemplateError } from "./error.js";
import { HandlerParams, Inputs } from "./types.js";

export function parseInputs(inputs: Inputs): HandlerParams {
  try {
    return z
      .object({
        "example-input": z.string(),
      })
      .transform((parsed) => ({
        exampleInput: parsed["example-input"],
      }))
      .parse(inputs);
  } catch (err) {
    throw new DockerTypescriptActionTemplateError(
      { cause: err as Error },
      `error parsing inputs ${JSON.stringify(inputs)}`,
    );
  }
}
