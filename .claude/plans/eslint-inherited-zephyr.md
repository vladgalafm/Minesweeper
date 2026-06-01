# Plan: Adapt ESLint + Stylelint from inherited project

## Context

`.eslintrc.js`, `.stylelintrc.js`, `.eslintignore`, `.stylelintignore`, and `jsconfig.json` were
copied from a Next.js + Storybook project. This project is CRA 5 + React 19. The configs cannot
run as-is: two infrastructure files are missing, framework-specific plugins reference packages that
aren't installed, and line endings conflict with `.editorconfig`. No lint packages are installed.

**Decisions from planning:**
- Line endings → LF (strip `'windows'` from both configs)
- Strip: Next.js, Storybook, JSDoc, Unicorn, babel plugin, newline-destructuring plugins
- Keep: react, react-hooks, jsx-a11y, import rules, all code-quality rules
- Import: keep `import/no-unresolved` + configure `jsconfig` resolver for path aliases
- `max-lines-per-function` + `no-magic-numbers` → keep as `warn`, violations fixed separately
- Integration: npm scripts only (no husky/lint-staged)
- Remove `eslintConfig` from `package.json`

---

## Step 1 — Adapt `.eslintrc.js`

### Remove entirely
- Lines 1–2: both `require(...)` calls (`eslint-next-frontend-plugin-config`, `jsconfig.json`)
- Lines 5–6: `VALID_NUMBER_OF_CALLBACKS_FOR_JEST_SOURCES` and `nextFrontendPluginConfig` variables
- From `extends`: `'plugin:@next/next/recommended'`, `'plugin:storybook/recommended'`
- From `plugins`: `'babel'`, `'jsdoc'`, `'unicorn'`, `'newline-destructuring'`, `'next-frontend'`
- All `babel/*` rules (lines 55–58)
- All `unicorn/*` rules (lines 545–567)
- All `jsdoc/*` rules (lines 573–594)
- `'newline-destructuring/newline'` rule (lines 360–365)
- `'@next/next/no-img-element'` and `'@next/next/no-document-import-in-page'` rules (656–657)
- `'next-frontend/architect-imports'` rule (line 659)
- From `settings['import/resolver']`: the `require.resolve('./infrastructure/lint/...')` entry (line 667)
- From `settings['import/core-modules']`: all storybook/swiper entries (lines 675–688)
- `settings.jsdoc` block (lines 689–695)
- The `**/api-provider/emulations/**/*.js` override (lines 731–733) — not relevant to this project

### Modify
- `linebreak-style` (line 272): `'windows'` → `'unix'`
- `import/no-unresolved` ignore (lines 253–259): remove `'^storybook/'`, `'^@storybook/'`, and `'^swiper'` entries; simplify to plain `'error'`
- `no-restricted-globals` + `no-restricted-properties` (lines 340–354): remove Next.js-specific messages; keep the rule with a generic message or remove if no longer relevant
- `settings['import/resolver']` (lines 661–671): remove the broken resolver entry, keep only:
  ```js
  'import/resolver': {
      jsconfig: {
          config: './jsconfig.json',
      },
  }
  ```
- `env.jest` (line 14): `'true'` (string) → `true` (boolean) — clear typo in source

---

## Step 2 — Adapt `.eslintignore`

Remove line 2 (`!/.storybook`) and line 1 (its comment). Final file:
```
node_modules
build
public
```

---

## Step 3 — Adapt `.stylelintrc.js`

Single change: line 196 `'linebreaks': 'windows'` → `'linebreaks': 'unix'`.

**Version constraint:** The config uses ~30 stylistic rules removed from stylelint core in v15
(`color-hex-case`, `function-comma-*`, `selector-combinator-space-*`, etc.). Use `stylelint@14`
to avoid unknown-rule errors. Upgrade to v16 + `stylelint-stylistic` is a separate future task.

---

## Step 4 — `.stylelintignore`

No changes needed. Already correct for CRA: ignores `node_modules`, `build`, `public`.

---

## Step 5 — Adapt `package.json`

Remove `eslintConfig` field (lines 23–28). Add lint scripts:

```json
"lint:js":      "eslint src/",
"lint:js:fix":  "eslint src/ --fix",
"lint:css":     "stylelint \"src/**/*.css\"",
"lint:css:fix": "stylelint \"src/**/*.css\" --fix",
"lint":         "npm run lint:js && npm run lint:css",
"lint:fix":     "npm run lint:js:fix && npm run lint:css:fix"
```

---

## Step 6 — Install packages

CRA 5 hoists its own `eslint`, `eslint-plugin-react`, `eslint-plugin-react-hooks`,
`eslint-plugin-jsx-a11y`, and `@babel/eslint-parser` into project `node_modules`. Install them
as explicit devDeps to pin versions and make them self-documenting:

```bash
npm install --save-dev \
  eslint \
  @babel/core \
  @babel/eslint-parser \
  eslint-plugin-react \
  eslint-plugin-react-hooks \
  eslint-plugin-jsx-a11y \
  eslint-plugin-import \
  eslint-import-resolver-jsconfig
```

```bash
npm install --save-dev \
  stylelint@14 \
  stylelint-config-recommended \
  stylelint-config-css-modules \
  stylelint-order
```

`.npmrc` has `save-exact=true` — all versions will be pinned automatically.

---

## Known post-setup violations (not fixed in this task)

| Rule | Where | Why |
|------|--------|-----|
| `max-lines-per-function` (warn) | `App.js` | 24 KB file by design |
| `no-magic-numbers` (error) | `App.js` | board dimensions (9, 16, 30) |
| `unit-disallowed-list` (px) | all CSS | existing px usage |
| `selector-combinator-disallowed-list` (>) | all CSS | existing `>` selectors |
| `no-warning-comments` | any file with `TODO`/`FIXME` | strict rule, no exceptions |

---

## Verification

1. `npm run lint:js` — runs without `Cannot find module` errors; outputs violation list
2. `npm run lint:css` — runs without `Cannot find module` errors; outputs violation list
3. `npm run lint:js:fix` — auto-fixable violations are corrected in-place
4. Path alias `Src/*` imports in `src/` are not flagged as `import/no-unresolved`
5. `react-scripts start` still works (CRA build unaffected by standalone lint setup)
