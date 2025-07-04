# React Components API Documentation

This document provides comprehensive API documentation for all React components in the Minesweeper application.

## Table of Contents

- [Game Components](#game-components)
  - [Game](#game)
  - [GameField](#gamefield)
  - [GameColumn](#gamecolumn)
  - [GameCell](#gamecell)
  - [GameHeader](#gameheader)
- [Menu Components](#menu-components)
  - [Menu](#menu)
  - [MenuBtn](#menubtn)
- [Settings Components](#settings-components)
  - [Settings](#settings)
  - [DiffSelect](#diffselect)
  - [DiffOption](#diffoption)
  - [DiffHistory](#diffhistory)
- [UI Components](#ui-components)
  - [Modal](#modal)
  - [Result](#result)
  - [Loader](#loader)
  - [RotateBlocker](#rotateblocker)
- [Tutorial Components](#tutorial-components)
  - [Tutorial](#tutorial)
  - [TutorialStatic](#tutorialstatic)
- [Update Components](#update-components)
  - [UpdateStatic](#updatestatic)

---

## Game Components

### Game

Main game container component that orchestrates the game layout and header.

**Location:** `src/components/Game/Game.js`

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `layoutMode` | `string` | ✅ | Layout mode for responsive design |
| `started` | `boolean` | ✅ | Whether the game has started |
| `inProgress` | `boolean` | ✅ | Whether the game is currently in progress |
| `cols` | `number` | ✅ | Number of columns in the game grid |
| `rows` | `number` | ✅ | Number of rows in the game grid |
| `cells` | `array` | ✅ | 2D array representing the game cells |
| `timeProceed` | `number` | ✅ | Current game time in seconds |
| `flagMode` | `boolean` | ✅ | Whether flag mode is active |
| `minesLeft` | `number` | ✅ | Number of mines left to be flagged |
| `leaveGameHandler` | `function` | ✅ | Handler to leave/exit the game |
| `toggleFlagMode` | `function` | ✅ | Handler to toggle flag mode on/off |
| `clickOnCellHandler` | `function` | ✅ | Handler for cell click events |
| `toggleFlagOnCellHandler` | `function` | ✅ | Handler for cell flag toggle events |

#### CSS Classes

- `game` - Main container
- `game--wide` - Applied when cols > 9
- `game--finished` - Applied when game started but not in progress

#### Usage Example

```jsx
<Game
  layoutMode="portrait"
  started={true}
  inProgress={false}
  cols={9}
  rows={9}
  cells={gameState.cells}
  timeProceed={120}
  flagMode={false}
  minesLeft={5}
  leaveGameHandler={() => handleLeaveGame()}
  toggleFlagMode={() => handleToggleFlagMode()}
  clickOnCellHandler={(col, row) => handleCellClick(col, row)}
  toggleFlagOnCellHandler={(col, row) => handleCellFlag(col, row)}
/>
```

---

### GameField

Container component for the game grid that renders columns of cells.

**Location:** `src/components/GameField/GameField.js`

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `started` | `boolean` | ✅ | Whether the game has started |
| `cols` | `number` | ✅ | Number of columns in the game grid |
| `rows` | `number` | ✅ | Number of rows in the game grid |
| `cells` | `array` | ✅ | 2D array representing the game cells |
| `clickOnCellHandler` | `function` | ✅ | Handler for cell click events |
| `toggleFlagOnCellHandler` | `function` | ✅ | Handler for cell flag toggle events |

#### CSS Classes

- `game-field` - Main container
- `game-field__content` - Content wrapper

---

### GameColumn

Component representing a single column of game cells.

**Location:** `src/components/GameColumn/GameColumn.js`

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `started` | `boolean` | ✅ | Whether the game has started |
| `rows` | `number` | ✅ | Number of rows in the column |
| `colIndex` | `number` | ✅ | Index of the current column |
| `cellsCol` | `array` | ✅ | Array of cell objects for this column |
| `clickOnCellHandler` | `function` | ✅ | Handler for cell click events |
| `toggleFlagOnCellHandler` | `function` | ✅ | Handler for cell flag toggle events |

---

### GameCell

Individual cell component representing a single square in the minesweeper grid.

**Location:** `src/components/GameCell/GameCell.js`

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `started` | `boolean` | ✅ | Whether the game has started |
| `colIndex` | `number` | ✅ | Column index of the cell |
| `rowIndex` | `number` | ✅ | Row index of the cell |
| `cell` | `object` | ✅ | Cell state object |
| `clickOnCellHandler` | `function` | ✅ | Handler for cell click events |
| `toggleFlagOnCellHandler` | `function` | ✅ | Handler for cell flag toggle events |

#### Cell Object Structure

```javascript
{
  opened: boolean,        // Whether the cell is opened
  mine: boolean,          // Whether the cell contains a mine
  minesAround: number,    // Number of mines in adjacent cells (0-8)
  flagged: boolean,       // Whether the cell is flagged
  defused: boolean,       // Whether the cell is defused
  blownUp: boolean,       // Whether the cell caused game over
  rightFlagged: boolean,  // Whether the cell was correctly flagged
  wrongFlagged: boolean   // Whether the cell was incorrectly flagged
}
```

#### CSS Classes

- `game-cell` - Main container
- `game-cell--opened` - When cell is opened
- `game-cell--flagged` - When cell is flagged
- `game-cell--defused` - When cell is defused
- `game-cell--blown-up` - When cell caused game over
- `game-cell--right-flagged` - When cell was correctly flagged
- `game-cell--wrong-flagged` - When cell was incorrectly flagged
- `game-cell--flashlight` - Animation effect when game not started

---

### GameHeader

Header component displaying game information and controls.

**Location:** `src/components/GameHeader/GameHeader.js`

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `inProgress` | `boolean` | ✅ | Whether the game is currently in progress |
| `timeProceed` | `number` | ✅ | Current game time in seconds |
| `flagMode` | `boolean` | ✅ | Whether flag mode is active |
| `minesLeft` | `number` | ✅ | Number of mines left to be flagged |
| `leaveGameHandler` | `function` | ✅ | Handler to leave/exit the game |
| `toggleFlagMode` | `function` | ✅ | Handler to toggle flag mode |

---

## Menu Components

### Menu

Main menu component with navigation buttons.

**Location:** `src/components/Menu/Menu.js`

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `switchBlockHandler` | `function` | ✅ | Handler to switch between app sections |
| `clickSoundHandler` | `function` | ✅ | Handler for click sound effects |
| `openSoundHandler` | `function` | ✅ | Handler for open sound effects |

---

### MenuBtn

Reusable button component for menu navigation.

**Location:** `src/components/MenuBtn/MenuBtn.js`

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | ✅ | Button text content |
| `switchBlockHandler` | `function` | ✅ | Click handler function |

---

## Settings Components

### Settings

Settings screen component with sound toggle, difficulty selection, and game history.

**Location:** `src/components/Settings/Settings.js`

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `sound` | `boolean` | ✅ | Current sound setting |
| `difficulty` | `string` | ✅ | Current difficulty level |
| `history` | `object` | ✅ | Game statistics object |
| `toggleSoundHandler` | `function` | ✅ | Handler to toggle sound on/off |
| `changeDifficulty` | `function` | ✅ | Handler to change difficulty level |
| `returnHandler` | `function` | ✅ | Handler to return to menu |

---

### DiffSelect

Difficulty selection component with radio buttons.

**Location:** `src/components/DiffSelect/DiffSelect.js`

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `selectedDifficulty` | `string` | ✅ | Currently selected difficulty |
| `changeDifficulty` | `function` | ✅ | Handler for difficulty change |

#### Difficulty Options

Options are imported from `src/data/data.js`:

```javascript
[
  { value: '9x9', label: 'Beginner', mines: 10 },
  { value: '9x16', label: 'Amateur', mines: 20 },
  { value: '16x16', label: 'Intermediate', mines: 40 },
  { value: '30x16', label: 'Expert', mines: 99 }
]
```

---

### DiffOption

Individual difficulty option radio button component.

**Location:** `src/components/DiffOption/DiffOption.js`

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `value` | `string` | ✅ | Option value (e.g., "9x9") |
| `label` | `string` | ✅ | Display label (e.g., "Beginner") |
| `mines` | `number` | ✅ | Number of mines for this difficulty |
| `selected` | `boolean` | ✅ | Whether this option is selected |

---

### DiffHistory

Component displaying game statistics and history for current difficulty.

**Location:** `src/components/DiffHistory/DiffHistory.js`

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `bestTime` | `number` | ✅ | Best completion time (Infinity if none) |
| `gamesPlayed` | `number` | ✅ | Total games played |
| `gamesWon` | `number` | ✅ | Total games won |
| `longestWinStreak` | `number` | ✅ | Longest winning streak |
| `longestLoseStreak` | `number` | ✅ | Longest losing streak |
| `currentWinStreak` | `number` | ✅ | Current winning streak |

---

## UI Components

### Modal

Generic modal component for dialogs and overlays.

**Location:** `src/components/Modal/Modal.js`

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `content` | `string` | ❌ | Text content for simple modals |
| `updateVersion` | `string` | ❌ | Version string for update modals |
| `result` | `string` | ❌ | Game result ("win" or "lose") |
| `timeProceed` | `number` | ❌ | Game completion time |
| `history` | `object` | ❌ | Game statistics object |
| `hideModalHandler` | `function` | ❌ | Handler to close modal (if closable) |
| `btn1Name` | `string` | ❌ | First button text |
| `btn1Action` | `function` | ❌ | First button handler |
| `btn2Name` | `string` | ❌ | Second button text |
| `btn2Action` | `function` | ❌ | Second button handler |

---

### Result

Game result component showing completion statistics.

**Location:** `src/components/Result/Result.js`

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `result` | `string` | ✅ | Game result ("win" or "lose") |
| `timeProceed` | `number` | ✅ | Game completion time in seconds |
| `history` | `object` | ✅ | Game statistics object |

---

### Loader

Loading spinner component.

**Location:** `src/components/Loader/Loader.js`

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `loaderState` | `string` | ✅ | Loader state ("hidden" or visible) |

---

### RotateBlocker

Component shown when device needs to be rotated to portrait orientation.

**Location:** `src/components/RotateBlocker/RotateBlocker.js`

#### Props

None - this is a static component.

---

## Tutorial Components

### Tutorial

Tutorial screen container component.

**Location:** `src/components/Tutorial/Tutorial.js`

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `exitHandler` | `function` | ✅ | Handler to exit tutorial |

---

### TutorialStatic

Static tutorial content component with game rules and instructions.

**Location:** `src/components/TutorialStatic/TutorialStatic.js`

#### Props

None - this is a static content component.

---

## Update Components

### UpdateStatic

Component displaying update information and changelog.

**Location:** `src/components/UpdateStatic/UpdateStatic.js`

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `version` | `string` | ✅ | New version number |

---

## Data Structures

### Cell Template

```javascript
{
  opened: false,
  mine: false,
  minesAround: 0,
  flagged: false,
  defused: false,
  blownUp: false,
  rightFlagged: false,
  wrongFlagged: false
}
```

### Game Template

```javascript
{
  difficulty: '9x9',
  cols: 9,
  rows: 9,
  cells: [], // 2D array of cell objects
  started: false,
  inProgress: false,
  timeProceed: 0,
  flaggedAmount: 0,
  safeCellsRevealed: 0,
  result: null
}
```

### History Template

```javascript
{
  bestTime: Infinity,
  gamesPlayed: 0,
  gamesWon: 0,
  longestWinStreak: 0,
  longestLoseStreak: 0,
  currentWinStreak: 0,
  currentLoseStreak: 0
}
```

## Component Hierarchy

```
App
├── Loader
├── RotateBlocker  
├── Menu
│   └── MenuBtn (×3)
├── Settings
│   ├── DiffSelect
│   │   └── DiffOption (×4)
│   └── DiffHistory
├── Tutorial
│   └── TutorialStatic
├── Game
│   ├── GameHeader
│   └── GameField
│       └── GameColumn (×cols)
│           └── GameCell (×rows)
└── Modal
    ├── Result
    └── UpdateStatic
```

---

## Notes

- All components use functional components with React hooks
- Components follow a consistent naming convention with PascalCase
- Each component has its own CSS file with BEM methodology
- Event handlers are passed down through props for better testability
- The game state is managed at the App level and passed down through props
