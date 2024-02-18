export interface Inputs {
  "exactly-once"?: string;
  issue?: string;
}

export interface Label {
  name: string;
}

/**
 * The only fields we are interested in, in the context of this action.
 */
export interface Issue {
  labels: Label[];
}

export interface HandlerParams {
  exactlyOnce: string[];
  issue: Issue;
}

export interface HandlerOutputs {
  ["matched-labels"]: Array<string>;
}
