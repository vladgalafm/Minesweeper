---
name: add-tests
description: Add Jest unit tests to this Minesweeper project. Use this skill whenever the user asks to write, add, or create tests — even for just one function, file, or feature. Also triggers when the user asks about test coverage, mentions Jest or @testing-library, wants to verify that a specific function behaves correctly, or asks "how do I test X". Use even if the user phrases it as a question ("what would tests look like for this?").
---

# Adding Jest Tests

## Project context
- Testing libraries: `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, Jest (via Create React App)
- Test files live next to the source: `src/data/data.test.js` tests `src/data/data.js`
- Run all tests: `npm test -- --watchAll=false`
- Run one file: `npm test -- --watchAll=false --testPathPattern="filename.test"`

## Step 1: Pull up-to-date docs via Context7

Before writing tests, resolve and query the relevant libraries:
- Pure JS/data tests → resolve `Jest`, query for `toBe`, `toEqual`, `test.each`, `describe`
- React component tests → also resolve `@testing-library/react`, query for `render`, `screen`, `fireEvent`, `userEvent`

Batch both ToolSearch calls into a single message, then both query-docs calls into a single message. Never load tools one at a time.

## Step 2: Read project conventions

Read `CLAUDE.md` and `.claude/rules/critical-conventions.md` before writing a line of test code. Key traps:
- Cells are indexed `cells[col][row]` (x = column, y = row) — reversed from the typical [row][col]
- `bestTime` is `Infinity` in JS but serializes to `null` in JSON — `expect(x).toBe(Infinity)` works fine in Jest
- Difficulty strings encode `cols × rows`: `"9x9"` means 9 columns, 9 rows (not 9 rows by 9 cols)

## Step 3: Choose what to test first

Work outward from the simplest, most isolated units:

1. **Pure data/constants** (`data.js`, `constants.js`) — no mocking, no DOM, always start here
2. **Pure functions** (utility functions, helpers) — minimal or no mocking
3. **React components** — use `@testing-library/react`; mock `localStorage` and `Audio`
4. **App.js** — complex; test only tightly scoped behaviors; always mock `localStorage` and `window.Audio`

## Step 4: Write the tests

### File placement
```
src/
  data/
    data.js
    data.test.js   ← same directory as the file under test
```

### Test structure
Group by export using `describe`. Name tests by *behavior*, not by implementation detail:

```js
import { minesAmount } from './data';

describe('minesAmount', () => {
    test.each([
        ['9x9', 10],
        ['9x16', 20],
        ['16x16', 40],
        ['30x16', 99],
    ])('%s has %i mines', (difficulty, count) => {
        expect(minesAmount[difficulty]).toBe(count);
    });
});
```

### Key assertion patterns

| Situation | Use |
|-----------|-----|
| Primitive value or same-object reference | `.toBe(value)` |
| Object/array shape and contents | `.toEqual(value)` |
| Object passed through unchanged (not cloned) | `.toBe(ref)` — reference equality proves no copy was made |
| Null | `.toBeNull()` |
| Same assertion over multiple inputs | `test.each([...])` |

**Why `.toBe` vs `.toEqual` matters here:** `gameTemplate(cells)` passes the cells array straight through. `.toBe(mockCells)` confirms the same reference came back — `.toEqual` would pass even if the array was cloned, missing the point.

### Mocking localStorage for component tests
```js
beforeEach(() => {
    Storage.prototype.getItem = jest.fn(() => null);
    Storage.prototype.setItem = jest.fn();
});

afterEach(() => {
    jest.restoreAllMocks();
});
```

### Mocking Audio (required for App.js tests)
```js
beforeAll(() => {
    window.HTMLMediaElement.prototype.play = jest.fn();
});
```

## Step 5: Run and verify

```bash
npm test -- --watchAll=false --testPathPattern="<filename>.test"
```

All tests must be green before reporting done. If a test fails, fix the assertion or the test — never skip or comment out.
