import VError from "verror";

<<<<<<< HEAD
export class CheckLabelsActionError extends VError {
  static NAME = "CheckLabelsActionError";

=======
export class DockerTypescriptActionTemplateError extends VError {
>>>>>>> template/master
  constructor(
    options: Omit<VError.Options, "name">,
    message: string,
    ...params: unknown[]
  ) {
    super(
<<<<<<< HEAD
      { ...options, name: CheckLabelsActionError.NAME },
=======
      { ...options, name: DockerTypescriptActionTemplateError.name },
>>>>>>> template/master
      message,
      ...params,
    );
  }
}
