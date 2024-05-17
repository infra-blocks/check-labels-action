# check-labels-action
[![Build](https://github.com/infra-blocks/check-labels-action/actions/workflows/build.yml/badge.svg)](https://github.com/infra-blocks/check-labels-action/actions/workflows/build.yml)
[![Release](https://github.com/infra-blocks/check-labels-action/actions/workflows/release.yml/badge.svg)](https://github.com/infra-blocks/check-labels-action/actions/workflows/release.yml)
[![Git Tag](https://github.com/infra-blocks/check-labels-action/actions/workflows/git-tag.yml/badge.svg)](https://github.com/infra-blocks/check-labels-action/actions/workflows/git-tag.yml)
[![Update From Template](https://github.com/infra-blocks/check-labels-action/actions/workflows/update-from-template.yml/badge.svg)](https://github.com/infra-blocks/check-labels-action/actions/workflows/update-from-template.yml)
[![codecov](https://codecov.io/gh/infra-blocks/check-labels-action/graph/badge.svg?token=9K3NAHOSNI)](https://codecov.io/gh/infra-blocks/check-labels-action)

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
- uses: docker://public.ecr.aws/infra-blocks/check-labels-action:v2
  with:
    exactly-once: '["^bugfix$", "^feature$"]'
```
