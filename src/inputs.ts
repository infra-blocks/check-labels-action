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
        "pull-request": z
          .string()
          .default(() =>
            JSON.stringify(checkNotNull(context.payload.pull_request)),
          ),
      })
      .transform((parsed) => ({
        exactlyOnceJson: JSON.parse(parsed["exactly-once"]) as unknown,
        pullRequestJson: JSON.parse(parsed["pull-request"]) as unknown,
      }))
      .pipe(
        z.object({
          exactlyOnceJson: z.string().array(),
          pullRequestJson: z.object({
            labels: z
              .object({
                name: z.string(),
              })
              .array(),
          }),
        }),
      )
      .transform(({ exactlyOnceJson, pullRequestJson }) => ({
        exactlyOnce: exactlyOnceJson.map((exp) => new RegExp(exp)),
        pullRequest: pullRequestJson,
      }))
      .parse(inputs);
  } catch (err) {
    throw new CheckLabelsActionError(
      { cause: err as Error },
      `error parsing inputs ${JSON.stringify(inputs)}`,
    );
  }
}
