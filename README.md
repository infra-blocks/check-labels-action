# check-labels-action

GitHub Action that enforces the presence/absence of PR labels according to user provided rules.

## Instantiation checklist

- Replace the summary and the action usage section in this document.
- Edit the package.json to reflect the action's name and links
- Replace the self-test section of the [build-image workflow](.github/workflows/build-image.yml).
- Set up code coverage

## Usage

```yaml
name: Template Usage

on:
  push: ~

# The required permissions.
permissions:
  pull-requests: read

# The suggested concurrency controls.
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  example-job:
    runs-on: ubuntu-22.04
    steps:
      - uses: docker://public.ecr.aws/infrastructure-blocks/docker-typescript-action-template:v1
        with:
          example-input: hello
```

## Releasing

The CI fully automates the release process. The only manual intervention required is to assign a semantic
versioning label to the pull request before merging (this is a required check). Upon merging, the
release process kicks off. It manages a set of semantic versioning git tags,
as described [here](https://github.com/infrastructure-blocks/git-tag-semver-action).

Upon tagging the default branch, jobs to tag docker images with the same tags will kick off.
