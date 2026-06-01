---
name: release
description: Manual release flow for this project — bump version, build, deploy to GitHub Pages. Invoke when asked to release, deploy, or publish a new version.
---

Follow these steps to release a new version of Minesweeper to GitHub Pages:

## Steps

1. **Decide version bump** — follow semver:
   - Patch (`x.x.N`): bug fixes only
   - Minor (`x.N.0`): new features, backwards-compatible
   - Major (`N.0.0`): breaking changes or major redesign

2. **Bump version in `package.json`** — update the `"version"` field.

3. **Update dependencies and lock file**:
   ```
   npm i
   ```

4. **Commit the version bump**:
   ```
   git add package.json package-lock.json
   git commit -m "build vX.Y.Z"
   ```

5. **Build the production bundle**:
   ```
   npm run build
   ```
   Verify the build completes without errors.

6. **Deploy to GitHub Pages**:
   ```
   npm run deploy
   ```
   This pushes the `build/` directory to the `gh-pages` branch via the `gh-pages` package.

7. **Verify** — visit https://vladgalafm.github.io/Minesweeper/ and confirm the new version loads correctly.

## Notes

- Deployment requires GitHub authentication (uses your local git credentials)
- The `homepage` field in `package.json` sets the base URL — do not change it
- `PUBLIC_URL` is derived from `homepage` automatically by Create React App
