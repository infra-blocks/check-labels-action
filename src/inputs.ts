<<<<<<< HEAD
import { context } from "@actions/github";
import { checkNotNull } from "@infra-blocks/checks";
import { z } from "zod";
import { CheckLabelsActionError } from "./error.js";
import { PullRequest } from "./types.js";

export interface Inputs {
  "exactly-once"?: string;
  "pull-request"?: string;
}

export interface ParsedInputs {
  exactlyOnce: RegExp[];
  pullRequest: PullRequest;
}

export function parseInputs(inputs: Inputs): ParsedInputs {
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
=======
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
>>>>>>> template/master
      { cause: err as Error },
      `error parsing inputs ${JSON.stringify(inputs)}`,
    );
  }
}
