import { context } from "@actions/github";
import { checkNotNull } from "@infra-blocks/checks";
import { z } from "zod";
import { CheckLabelsActionError } from "./error.js";
import { HandlerParams, Inputs } from "./types.js";

export function parseInputs(inputs: Inputs): HandlerParams {
  try {
    return z
      .object({
        "exactly-once": z.string(),
        issue: z
          .string()
          .default(() =>
            JSON.stringify(checkNotNull(context.payload.pull_request)),
          ),
      })
      .transform((parsed) => ({
        exactlyOnceJson: JSON.parse(parsed["exactly-once"]) as unknown,
        issueJson: JSON.parse(parsed["issue"]) as unknown,
      }))
      .pipe(
        z.object({
          exactlyOnceJson: z.string().array(),
          issueJson: z.object({
            labels: z
              .object({
                name: z.string(),
              })
              .array(),
          }),
        }),
      )
      .transform(({ exactlyOnceJson, issueJson }) => ({
        exactlyOnce: exactlyOnceJson.map((exp) => new RegExp(exp)),
        issue: issueJson,
      }))
      .parse(inputs);
  } catch (err) {
    throw new CheckLabelsActionError(
      { cause: err as Error },
      `error parsing inputs ${JSON.stringify(inputs)}`,
    );
  }
}
