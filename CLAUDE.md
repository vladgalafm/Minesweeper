# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

React PWA Minesweeper — single-developer project, plain JavaScript (no TypeScript), Create React App. Deployed to GitHub Pages.

## Architecture

All game state and logic live in `src/App.js` by design. Do not introduce Context API, Redux, or other state management libraries. `src/components/` contains 18 presentational components — keep state there minimal.

## Critical conventions → `.claude/rules/critical-conventions.md`

## Code style

- 4-space indentation (per `.editorconfig`)
- Functional components with hooks only — no class components
- Each component lives at `src/components/<Name>/<Name>.js` + `<Name>.css`
- `.npmrc` has `save-exact=true` — use exact versions when adding dependencies

## Commands

- Run tests (CI/non-watch): `npm test -- --watchAll=false`
- Deploy to GitHub Pages: `npm run deploy`

## Testing

Testing libraries are installed (`@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`) but no test files exist yet. See `.claude/skills/add-tests/SKILL.md` for patterns to follow when adding tests.

## Git workflow

Direct commits to `master`. No PR process.
