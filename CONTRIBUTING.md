# Contribution Guidelines

## Development

### Setup

This project depends on the following tools:
- [nvm](https://github.com/nvm-sh/nvm) as the node version manager.
- [docker](https://docs.docker.com/engine/install/) as the `docker compose` backend
- [docker compose](https://docs.docker.com/compose/install/) to build/run/test the repository's image.

To initialize the repository, run the following commands:
```shell
nvm install
npm install
npm run compile
npm run lint
npm run test
```

In addition, it is recommended that users install a [shell hook](https://github.com/nvm-sh/nvm#deeper-shell-integration)
so that `nvm use` is run upon changing into a project that utilises `nvm`.

## Releasing

The CI fully automates the release process. The only manual intervention required is to assign a semantic
versioning label to the pull request before merging (this is a required check). Upon merging, the
release process kicks off. It manages a set of semantic versioning git tags,
as described [here](https://github.com/infra-blocks/git-tag-semver-action).

Upon tagging the default branch, jobs to tag docker images with the same tags will kick off.
