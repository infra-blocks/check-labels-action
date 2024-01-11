import VError from "verror";

export class CheckLabelsActionError extends VError {
  static NAME = "CheckLabelsActionError";

  constructor(
    options: Omit<VError.Options, "name">,
    message: string,
    ...params: unknown[]
  ) {
    super(
      { ...options, name: CheckLabelsActionError.NAME },
      message,
      ...params,
    );
  }
}
