---
paths:
  - "src/**/*.js"
---

# Critical conventions

**Grid indexing** — cells are indexed `cells[col][row]` (x = column, y = row). This is intentionally reversed from the typical `[row][col]`. Changing it breaks the entire board.

**LocalStorage keys** — keys like `_hv-m-g`, `_hv-m-h` are intentionally obfuscated. All keys are defined as `STORAGE_KEY_*` constants in `src/constants.js`. Do not rename or change their string values; doing so silently breaks saved data for existing users.

**Difficulty strings** — `"9x9"`, `"16x16"`, `"30x16"` encode `cols × rows`, not `rows × cols`.

**Infinity serialization** — `bestTime` is `Infinity` in JS but serializes to `null` in JSON. A custom reviver in `App.js` restores it on load. Preserve this pattern when touching save/load logic.

**Mine placement** — deferred to first click with a 2-cell exclusion zone around the clicked cell, ensuring the first reveal is always safe.
