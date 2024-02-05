# check-labels-action
[![Build Image](https://github.com/infrastructure-blocks/check-labels-action/actions/workflows/build-image.yml/badge.svg)](https://github.com/infrastructure-blocks/check-labels-action/actions/workflows/build-image.yml)
[![Docker Tag](https://github.com/infrastructure-blocks/check-labels-action/actions/workflows/docker-tag.yml/badge.svg)](https://github.com/infrastructure-blocks/check-labels-action/actions/workflows/docker-tag.yml)
[![Git Tag Semver From Label](https://github.com/infrastructure-blocks/check-labels-action/actions/workflows/git-tag-semver-from-label.yml/badge.svg)](https://github.com/infrastructure-blocks/check-labels-action/actions/workflows/git-tag-semver-from-label.yml)
[![Update From Template](https://github.com/infrastructure-blocks/check-labels-action/actions/workflows/update-from-template.yml/badge.svg)](https://github.com/infrastructure-blocks/check-labels-action/actions/workflows/update-from-template.yml)

GitHub Action that enforces the presence/absence of PR labels according to user provided rules. All the expressions
used to match label names are in JS regular expression syntax. So if you want to match a word exactly,
you should wrap it with `^$`. For example, `^bugfix$` instead of `bugfix`.

## Inputs

|     Name     | Required | Description                                                                                                 |
|:------------:|:--------:|-------------------------------------------------------------------------------------------------------------|
| exactly-once |   true   | A JSON array containing expressions to match.<br/> Exactly one match must be found amongst the labels.      |
| pull-request |  false   | A stringified pull request JSON object.<br> Defaults to ${{ github.event.pull_request }} when not provided. |

## Ouputs

|      Name      | Description                                                                  |
|:--------------:|------------------------------------------------------------------------------|
| matched-labels | A stringified JSON array of the label names that were matched by this action |

## Permissions

N/A

## Usage

```yaml
- uses: docker://public.ecr.aws/infrastructure-blocks/check-labels-action:v2
  with:
    exactly-once: '["^bugfix$", "^feature$"]'
```

## Releasing

The CI fully automates the release process. The only manual intervention required is to assign a semantic
versioning label to the pull request before merging (this is a required check). Upon merging, the
release process kicks off. It manages a set of semantic versioning git tags,
as described [here](https://github.com/infrastructure-blocks/git-tag-semver-action).

Upon tagging the default branch, jobs to tag docker images with the same tags will kick off.
