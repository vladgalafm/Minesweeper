---
name: release
description: Manual release flow for this project — bump version, build, deploy to GitHub Pages. Invoke when asked to release, deploy, or publish a new version.
disable-model-invocation: true
allowed-tools: Read, Edit, Bash(npm i), Bash(npm run build), Bash(npm run deploy), Bash(git add *), Bash(git commit *)
model: haiku-4-5
---

# release

Goal: produce a versioned production build and push it live to GitHub Pages without introducing errors or skipping verification.

## Workflow

Use this checklist literally. Mark each step done before moving to the next.

- [ ] Step 1: Decide version bump. Read `package.json` to find the current version. Apply semver:
  - **Patch** (`x.x.N`): bug fixes only
  - **Minor** (`x.N.0`): new features, backwards-compatible
  - **Major** (`N.0.0`): breaking changes or major redesign

  If the user did not specify a bump type, ask before proceeding.

- [ ] Step 2: Bump version. Edit the `"version"` field in `package.json` to the new value.

- [ ] Step 3: Update lock file. Run:
  ```
  npm i
  ```
  Confirm it exits cleanly (no errors, no unrelated package changes).

- [ ] Step 4: Commit the version bump. Run:
  ```
  git add package.json package-lock.json
  git commit -m "build vX.Y.Z"
  ```
  Replace `X.Y.Z` with the actual new version.

- [ ] Step 5: Build the production bundle. Run:
  ```
  npm run build
  ```
  If the build exits with errors, stop and report the full error output. Do not proceed to deploy.

- [ ] Step 6: Deploy to GitHub Pages. Run:
  ```
  npm run deploy
  ```
  This pushes the `build/` directory to the `gh-pages` branch via the `gh-pages` package. Requires GitHub authentication via local git credentials.

- [ ] Step 7: Verify. Open https://vladgalafm.github.io/Minesweeper/ and confirm the new version loads. If possible, check the visible version string or network response.

## If the version bump type is unclear

Do not guess. Ask the user one clarifying question — what changed in this release? Then map their answer to the correct semver bump before touching any file.

## Gotchas

- **`homepage` in `package.json`**: sets the base URL used by Create React App. Do not change it — changing it breaks asset paths in the deployed build.
- **Auth failure on deploy**: `npm run deploy` pushes via git. If it fails with an auth error, the user needs to ensure their git credentials have push access to the repo. Do not retry in a loop.
- **Unrelated package changes after `npm i`**: if `package-lock.json` shows changes beyond the version bump, investigate before committing. Do not bundle unrelated lockfile churn into the release commit.
- **Build warnings vs errors**: CRA may print warnings during build. Warnings do not block deploy; errors do. Read the last line of build output to distinguish.

## When NOT to use this skill

- Hotfixes that haven't been committed yet — ensure all changes are committed to `master` first.
- Releasing a specific branch other than `master` — the deploy always ships whatever is in the working tree.
- Reverting a bad deploy — that requires manually resetting the `gh-pages` branch; handle it outside this skill.
