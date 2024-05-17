# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.5] - 2024-04-09

### Changed

- The action image is now built using the `public.ecr.aws/infra-blocks/docker-typescript-action-base`
base image.

## [2.0.4] - 2024-01-27

### Changed

- Bumped the `@infra-blocks/github-actions` dependency to `0.2.1`.
- Updated the README.md with streamlined usage examples.

## [2.0.3] - 2024-01-13

### Added

- Unit tests on inputs parsing.

### Changed

- Changed the code layout furthermore, to be even more in line with the more generic approach of the
`docker-typescript-action-template`.

## [2.0.2] - 2024-01-11

### Changed

- Bumped the `@infra-blocks/github-actions` dependency to `0.2.0`.

## [2.0.1] - 2024-01-11

### Changed

- The implementation now offshores some of the logic to the `@infra-blocks/github-actions` package.
- Reviewed the whole layout of the code, based on the `docker-typescript-action-template`.

## [2.0.0] - 2024-01-11

### Changed

- The action has been updated to use the docker engine instead of Node.js. This means that the syntax to use
it has changed to `docker://public.ecr.aws/infra-blocks/check-labels-action:v2`.

## [1.1.0] - 2024-01-04

### Added

- Optional `pull-request` input. The default behavior remains the same, which is to use what found under
`github.event.pull_request`.

## [1.0.0] - 2034-12-03

### Changed

- Minor tweaks to project configuration.

### Added

- Some debugging logs.

## [0.1.0] - 2023-07-10

### Added

- First release!

[2.0.5]: https://github.com/infra-blocks/check-labels-action/compare/v2.0.4...v2.0.5
[2.0.4]: https://github.com/infra-blocks/check-labels-action/compare/v2.0.3...v2.0.4
[2.0.3]: https://github.com/infra-blocks/check-labels-action/compare/v2.0.2...v2.0.3
[2.0.2]: https://github.com/infra-blocks/check-labels-action/compare/v2.0.1...v2.0.2
[2.0.1]: https://github.com/infra-blocks/check-labels-action/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/infra-blocks/check-labels-action/compare/v1.1.0...v2.0.0
[1.1.0]: https://github.com/infra-blocks/check-labels-action/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/infra-blocks/check-labels-action/compare/v0.1.0...v1.0.0
[0.1.0]: https://github.com/infra-blocks/check-labels-action/releases/tag/v0.1.0
