---
name: release
description: Manual release flow for this project — bump version, build, deploy to GitHub Pages. Invoke when asked to release, deploy, or publish a new version.
disable-model-invocation: true
allowed-tools: Read, Edit, Bash(npm i), Bash(npm run build), Bash(npm run deploy), Bash(git add *), Bash(git commit *), Bash(git push)
model: haiku
---

# release

Goal: produce a versioned production build and push it live to GitHub Pages without introducing errors or skipping verification.

## Workflow

Use this checklist literally. Mark each step done before moving to the next.

- [ ] Step 1: Decide version bump. Read `package.json` for the current version, then run `git log --oneline <current-version-tag>..HEAD` (or `git log --oneline -20` if no tag exists) to read the commits since the last release. Apply semver automatically:
  - **Patch** (`x.x.N`): only bug fixes, refactors, or internal changes
  - **Minor** (`x.N.0`): any new user-facing feature or capability
  - **Major** (`N.0.0`): breaking changes or major redesign

  State the bump type and reasoning in one sentence before proceeding. Only ask the user if the commits are genuinely ambiguous.

- [ ] Step 2: Bump version in two places:
  - Edit the `"version"` field in `package.json` to the new value.
  - Edit `APP_VERSION` in `src/constants.js` to match exactly.

  Both must be identical. The app reads `APP_VERSION` at runtime to show the version to users.

- [ ] Step 3: Update the changelog component. Edit `src/components/UpdateStatic/UpdateStatic.js` — replace the `<li>` items inside `<ul>` to describe what changed in this version. Be accurate: do not copy-paste from a previous release. If the user has not provided release notes, ask for them before editing the file.

- [ ] Step 4: Update lock file. Run:
  ```
  npm i
  ```
  Confirm it exits cleanly (no errors, no unrelated package changes).

- [ ] Step 5: Commit the version bump. Run:
  ```
  git add package.json package-lock.json src/constants.js src/components/UpdateStatic/UpdateStatic.js
  git commit -m "build vX.Y.Z"
  ```
  Replace `X.Y.Z` with the actual new version.

- [ ] Step 6: Build the production bundle. Run:
  ```
  npm run build
  ```
  If the build exits with errors, stop and report the full error output. Do not proceed to deploy.

- [ ] Step 7: Deploy to GitHub Pages. Run:
  ```
  npm run deploy
  ```
  This pushes the `build/` directory to the `gh-pages` branch via the `gh-pages` package. Requires GitHub authentication via local git credentials.

- [ ] Step 8: Push master. Run:
  ```
  git push
  ```
  Keeps `origin/master` in sync with the version bump commit.

## Gotchas

- **`homepage` in `package.json`**: sets the base URL used by Create React App. Do not change it — changing it breaks asset paths in the deployed build.
- **Auth failure on deploy**: `npm run deploy` pushes via git. If it fails with an auth error, the user needs to ensure their git credentials have push access to the repo. Do not retry in a loop.
- **Unrelated package changes after `npm i`**: if `package-lock.json` shows changes beyond the version bump, investigate before committing. Do not bundle unrelated lockfile churn into the release commit.
- **Build warnings vs errors**: CRA may print warnings during build. Warnings do not block deploy; errors do. Read the last line of build output to distinguish.

## When NOT to use this skill

- Hotfixes that haven't been committed yet — ensure all changes are committed to `master` first.
- Releasing a specific branch other than `master` — the deploy always ships whatever is in the working tree.
- Reverting a bad deploy — that requires manually resetting the `gh-pages` branch; handle it outside this skill.
