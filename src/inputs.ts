import { context } from "@actions/github";
import { checkNotNull } from "@infra-blocks/checks";
import { zu } from "@infra-blocks/zod-utils";
import { z } from "zod";
import { CheckLabelsActionError } from "./error.js";
import { HandlerParams, Inputs } from "./types.js";

export function parseInputs(inputs: Inputs): HandlerParams {
  try {
    return (
      z
        .object({
          "exactly-once": zu.jsonFromString().pipe(z.string().array()),
          issue: zu
            .jsonFromString()
            .default(() =>
              JSON.stringify(checkNotNull(context.payload.pull_request)),
            )
            .pipe(
              z.object({
                labels: z
                  .object({
                    name: z.string(),
                  })
                  .array(),
              }),
            ),
        })
        // TODO: remap-keys function.
        .transform((parsed) => ({
          exactlyOnce: parsed["exactly-once"],
          issue: parsed.issue,
        }))
        .parse(inputs)
    );
  } catch (err) {
    throw new CheckLabelsActionError(
      { cause: err as Error },
      `error parsing inputs ${JSON.stringify(inputs)}`,
    );
  }
}
