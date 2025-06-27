# Contributing to Minesweeper

Welcome to the Minesweeper project! This guide will help you get started as a contributor and understand the development workflow, code structure, and best practices.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development Server](#development-server)
- [Project Structure](#project-structure)
  - [Directory Layout](#directory-layout)
  - [Component Architecture](#component-architecture)
  - [State Management](#state-management)
- [Development Workflow](#development-workflow)
  - [Branching Strategy](#branching-strategy)
  - [Making Changes](#making-changes)
  - [Testing](#testing)
  - [Code Review](#code-review)
- [Coding Standards](#coding-standards)
  - [JavaScript/React Guidelines](#javascriptreact-guidelines)
  - [CSS Guidelines](#css-guidelines)
  - [File Naming](#file-naming)
- [PWA Features](#pwa-features)
  - [Service Worker](#service-worker)
  - [Manifest Configuration](#manifest-configuration)
  - [Offline Support](#offline-support)
- [Game Logic](#game-logic)
  - [Core Algorithms](#core-algorithms)
  - [State Management](#state-management-1)
  - [Local Storage](#local-storage)
- [Audio System](#audio-system)
- [Build and Deployment](#build-and-deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing Guidelines](#contributing-guidelines)

---

## Getting Started

### Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)
- **Git** for version control
- A modern code editor (VS Code recommended)

### Installation

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Minesweeper.git
   cd Minesweeper
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Verify installation:**
   ```bash
   npm start
   ```
   The application should open at `http://localhost:3000`

### Development Server

Available npm scripts:

| Script | Description |
|--------|-------------|
| `npm start` | Start development server with hot reload |
| `npm run build` | Create production build |
| `npm test` | Run test suite |
| `npm run deploy` | Deploy to GitHub Pages |

---

## Project Structure

### Directory Layout

```
Minesweeper/
├── public/                 # Static assets and PWA config
│   ├── img/               # Icons and images
│   │   └── splashscreens/     # PWA splash screens
│   │   └── manifest.json      # PWA manifest
│   │   └── sw.js             # Service worker
│   │   └── index.html        # Main HTML template
│   ├── src/                   # Source code
│   │   └── components/        # React components
│   │   │   └── Game/         # Game-related components
│   │   │   └── Menu/         # Menu and navigation
│   │   │   └── Settings/     # Settings and configuration
│   │   │   └── UI/           # Reusable UI components
│   │   ├── data/             # Game data and templates
│   │   ├── img/              # Source images
│   │   ├── sound/            # Audio files
│   │   ├── App.js            # Main application component
│   │   ├── App.css           # Global styles
│   │   └── index.js          # Application entry point
│   ├── source_img/           # Original image assets
│   ├── package.json          # Project configuration
│   └── README.md            # Project documentation
```

### Component Architecture

The application follows a **hierarchical component structure**:

```
App (Root)
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

**Key Principles:**
- **Functional Components** - All components use React hooks
- **Props Down, Events Up** - Data flows down, events bubble up
- **Single Responsibility** - Each component has one clear purpose
- **Reusability** - Common patterns are extracted into reusable components

### State Management

State is managed at the **App level** using React hooks:

```javascript
// Core game state
const [game, setGame] = useState(gameTemplate);
const [history, setHistory] = useState(historyTemplate);
const [sound, setSound] = useState(true);

// UI state
const [displayedBlock, setDisplayedBlock] = useState('');
const [modalHidden, setModalHidden] = useState(false);
const [flagMode, setFlagMode] = useState(false);
```

**State Flow:**
1. All state managed in `App.js`
2. State passed down through props
3. Event handlers passed down to modify state
4. Local storage integration for persistence

---

## Development Workflow

### Branching Strategy

We use **feature branches** for development:

```bash
# Create a new feature branch
git checkout -b feature/your-feature-name

# Make your changes and commit
git add .
git commit -m "feat: add new feature description"

# Push to your fork
git push origin feature/your-feature-name

# Create a Pull Request on GitHub
```

### Making Changes

1. **Start small** - Break large features into smaller, manageable changes
2. **Follow existing patterns** - Maintain consistency with existing code
3. **Test thoroughly** - Verify your changes work across different difficulty levels
4. **Update documentation** - Keep API docs and comments current

### Testing

**Manual Testing Checklist:**
- [ ] Game starts and plays correctly
- [ ] All difficulty levels work
- [ ] Flag mode functions properly
- [ ] Settings persist correctly
- [ ] PWA features work offline
- [ ] Audio plays when enabled
- [ ] Responsive design works on mobile

**Testing Different Scenarios:**
```bash
# Test in different browsers
# Chrome, Firefox, Safari, Edge

# Test PWA functionality
# Install as PWA, test offline mode

# Test on mobile devices
# Portrait/landscape orientation
```

### Code Review

**Before submitting a PR:**
- [ ] Code follows project conventions
- [ ] No console.log statements left in code
- [ ] Functions are documented with comments
- [ ] Variable names use camelCase
- [ ] Components have proper prop validation
- [ ] Performance impact considered

---

## Coding Standards

### JavaScript/React Guidelines

**Component Structure:**
```javascript
import React, { useState, useEffect } from 'react';
import './ComponentName.css';

export function ComponentName({
    prop1,
    prop2,
    handlerFunction
}) {
    // State declarations
    const [state, setState] = useState(initialValue);
    
    // Effect hooks
    useEffect(() => {
        // Side effects
    }, [dependencies]);
    
    // Event handlers
    const handleEvent = () => {
        // Handle event
    };
    
    // Render
    return (
        <div className="component-name">
            {/* JSX content */}
        </div>
    );
}
```

**Naming Conventions:**
- **Components:** PascalCase (`GameCell`, `MenuBtn`)
- **Variables:** camelCase (`timeProceed`, `minesLeft`)
- **Constants:** camelCase (`minesAmount`, `difficultyOptions`)
- **Functions:** camelCase (`clickOnCellHandler`, `toggleFlagMode`)
- **Files:** PascalCase for components, camelCase for utilities

**Function Guidelines:**
```javascript
// ✅ Good - Clear purpose, descriptive name
function countMinesAround(cells, x, y) {
    // Implementation
}

// ✅ Good - Event handler naming
function clickOnCellHandler(col, row) {
    // Implementation
}

// ❌ Avoid - Vague naming
function doStuff(data) {
    // Implementation
}
```

### CSS Guidelines

**BEM Methodology:**
```css
/* Block */
.game-cell {
    /* Base styles */
}

/* Element */
.game-cell__btn {
    /* Button styles */
}

/* Modifier */
.game-cell--opened {
    /* Modified state */
}

/* Combined */
.game-cell__btn--mine {
    /* Specific button state */
}
```

**Organization:**
- Each component has its own CSS file
- Global styles in `App.css`
- Use CSS custom properties for theming
- Mobile-first responsive design

### File Naming

**Component Files:**
```
src/components/ComponentName/
├── ComponentName.js      # Main component
├── ComponentName.css     # Component styles
└── index.js             # Optional barrel export
```

**Asset Files:**
```
public/img/              # Production images
src/img/                # Development images
src/sound/              # Audio files
source_img/             # Original assets
```

---

## PWA Features

### Service Worker

The application includes PWA support with offline capabilities:

**Key Features:**
- **Offline Mode** - Game works without internet
- **App Installation** - Can be installed as native app
- **Update Notifications** - Users notified of new versions

**Service Worker Location:** `public/sw.js`

**Testing PWA Features:**
```bash
# Build production version
npm run build

# Serve built files (use a local server)
npx serve -s build

# Test in Chrome DevTools > Application > Service Workers
```

### Manifest Configuration

PWA configuration in `public/manifest.json`:

```json
{
  "short_name": "Minesweeper",
  "name": "Minesweeper",
  "display": "fullscreen",
  "orientation": "portrait",
  "theme_color": "#006994"
}
```

### Offline Support

**Offline Assets:**
- All game assets cached by service worker
- Game state persisted in localStorage
- Works completely offline after first load

---

## Game Logic

### Core Algorithms

**Mine Generation:**
```javascript
function setMines(excludeX, excludeY) {
    // Randomly place mines avoiding first click
    // Ensure fair distribution
}
```

**Mine Counting:**
```javascript
function countMinesAround(cells, x, y) {
    // Count mines in 8 adjacent cells
    // Handle boundary conditions
}
```

**Cell Revelation:**
```javascript
function revealCell(gameState, x, y) {
    // Recursive reveal for empty cells
    // Flood fill algorithm
}
```

### State Management

**Game State Structure:**
```javascript
const gameTemplate = {
    difficulty: '9x9',      // Current difficulty
    cols: 9,                // Grid columns
    rows: 9,                // Grid rows
    cells: [],              // 2D cell array
    started: false,         // Game started flag
    inProgress: false,      // Game active flag
    timeProceed: 0,         // Elapsed time
    flaggedAmount: 0,       // Flags placed
    safeCellsRevealed: 0,   // Progress tracking
    result: null            // Win/lose state
};
```

**Cell State Structure:**
```javascript
const cellTemplate = {
    opened: false,          // Cell revealed
    mine: false,            // Contains mine
    minesAround: 0,         // Adjacent mine count
    flagged: false,         // User flagged
    defused: false,         // Mine defused
    blownUp: false,         // Caused game over
    rightFlagged: false,    // Correctly flagged
    wrongFlagged: false     // Incorrectly flagged
};
```

### Local Storage

**Storage Keys:**
```javascript
'_hv-m-v'  // App version
'_hv-m-n'  // Update notification status
'_hv-m-g'  // Current game data
'_hv-m-h'  // User history/statistics
'_hv-m-s'  // Sound preference
```

**Data Persistence:**
- Game state saved on every move
- Statistics tracked per difficulty
- Settings preserved between sessions

---

## Audio System

**Sound Effects:**
- `click.mp3` - UI interaction sounds
- `bomb.mp3` - Mine explosion
- `bomb2.mp3` - Alternative explosion
- `reveal.mp3` - Cell reveal sound
- `game_open.mp3` - Game start
- `game_start.mp3` - First move
- `update_notify.mp3` - Update notification

**Implementation:**
```javascript
function playSound(file, force) {
    if ((typeof force === 'undefined' && sound) || force) {
        const audio = new Audio(file);
        audio.play();
    }
}
```

**Audio Guidelines:**
- Respect user sound preferences
- Use `force` parameter for critical sounds
- Keep audio files small for performance

---

## Build and Deployment

### Production Build

```bash
# Create optimized build
npm run build

# Test production build locally
npx serve -s build
```

### Deployment to GitHub Pages

```bash
# Deploy to gh-pages branch
npm run deploy
```

**Deployment Checklist:**
- [ ] Update version number in `package.json`
- [ ] Test production build locally
- [ ] Verify PWA functionality
- [ ] Check responsive design
- [ ] Confirm all assets load correctly

### Version Management

**Versioning Strategy:**
- Follow semantic versioning (MAJOR.MINOR.PATCH)
- Update version in `package.json`
- Update version constant in `App.js`
- Create git tags for releases

---

## Troubleshooting

### Common Issues

**Issue: Game state not persisting**
```javascript
// Check localStorage keys
console.log(localStorage.getItem('_hv-m-g'));

// Clear corrupted data
localStorage.removeItem('_hv-m-g');
```

**Issue: PWA not updating**
```bash
# Hard refresh to bypass cache
Ctrl+Shift+R (Windows/Linux)
Cmd+Shift+R (Mac)

# Check service worker in DevTools
Application > Service Workers > Update
```

**Issue: Audio not playing**
```javascript
// Check audio file paths
// Verify user hasn't disabled sound
// Test with force parameter
playSound(soundClick, true);
```

### Development Tools

**Recommended VS Code Extensions:**
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- Auto Rename Tag
- Bracket Pair Colorizer

**Chrome DevTools:**
- React Developer Tools
- Application tab for PWA testing
- Network tab for offline testing
- Performance tab for optimization

---

## Contributing Guidelines

### Pull Request Process

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** thoroughly
5. **Submit** a pull request

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Manual testing completed
- [ ] All difficulty levels tested
- [ ] PWA functionality verified
- [ ] Mobile responsive checked

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
```

### Code of Conduct

- **Be respectful** and inclusive
- **Focus on** constructive feedback
- **Help others** learn and improve
- **Follow** project conventions
- **Keep** discussions on-topic

### Getting Help

**Need help?**
- Check existing issues on GitHub
- Read the API documentation
- Look at similar implementations in the codebase
- Ask questions in pull request comments

### Recognition

Contributors are recognized in:
- GitHub contributors list
- Release notes for significant contributions
- Special thanks in project documentation

---

## Advanced Topics

### Performance Optimization

**Key Areas:**
- **React.memo** for expensive components
- **useCallback** for event handlers
- **Lazy loading** for non-critical components
- **Audio preloading** for better UX

### Accessibility

**Current Features:**
- Keyboard navigation support
- ARIA labels for buttons
- Screen reader friendly
- High contrast support

**Future Improvements:**
- Voice commands
- Haptic feedback
- Customizable themes

### Testing Strategy

**Unit Testing:**
```javascript
// Test game logic functions
describe('countMinesAround', () => {
    it('should count adjacent mines correctly', () => {
        // Test implementation
    });
});
```

**Integration Testing:**
```javascript
// Test component interactions
describe('GameCell', () => {
    it('should handle click events correctly', () => {
        // Test implementation
    });
});
```

---

**Happy Contributing! 🚀**

Thank you for contributing to the Minesweeper project. Your efforts help make this game better for everyone! 