---
name: add-tests
description: Guide for writing React Testing Library tests in this Minesweeper project. Invoke when asked to add, write, or set up tests.
---

This project has zero test files. When adding tests, follow these patterns:

## Test file location

Place test files alongside the component they test:
`src/components/<Name>/<Name>.test.js`

For App.js tests: `src/App.test.js`

## Core conventions to preserve in tests

- **Grid indexing**: `cells[col][row]` — never assume `[row][col]`
- **Difficulty strings**: `"9x9"`, `"16x16"`, `"30x16"` (cols × rows)
- **Mine placement is deferred**: Do not expect mines to exist before the first cell click
- **bestTime = Infinity** for a fresh user; test serialization with the JSON reviver logic

## Testing stack

- `@testing-library/react` for rendering and queries
- `@testing-library/user-event` for interactions (prefer `userEvent` over `fireEvent`)
- `@testing-library/jest-dom` for matchers (`toBeInTheDocument`, `toHaveClass`, etc.)
- Run once (non-watch): `npm test -- --watchAll=false`

## What to test first

1. **Unit tests on pure logic** — mine placement, flood-fill reveal, win condition calculation — these don't need a render
2. **Component smoke tests** — does `<GameCell />` render without crashing given valid props?
3. **Interaction tests** — does clicking a cell trigger the right callback?

## Example structure

```js
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GameCell from './GameCell';

test('renders unrevealed cell', () => {
  render(<GameCell col={0} row={0} revealed={false} mine={false} />);
  expect(screen.getByRole('button')).toBeInTheDocument();
});
```

## What to avoid

- Do not mock `localStorage` unless specifically testing save/load — use `jest.spyOn` if needed
- Do not test implementation details (internal state shape, private functions)
- Do not test `App.js` end-to-end in one giant test — break it into per-feature tests
