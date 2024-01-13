export interface Inputs {
  "exactly-once"?: string;
  "pull-request"?: string;
}

export interface Label {
  name: string;
}

export interface PullRequest {
  labels: Label[];
}

export interface HandlerParams {
  exactlyOnce: RegExp[];
  pullRequest: PullRequest;
}

export interface HandlerOutputs {
  ["matched-labels"]: string;
}
