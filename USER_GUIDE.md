# Minesweeper User Guide

Welcome to Minesweeper! This comprehensive guide will help you master the classic logic puzzle game and make the most of all available features.

## Table of Contents

- [Getting Started](#getting-started)
  - [How to Play](#how-to-play)
  - [Basic Rules](#basic-rules)
  - [Game Objective](#game-objective)
- [Game Interface](#game-interface)
  - [Game Board](#game-board)
  - [Header Controls](#header-controls)
  - [Menu System](#menu-system)
- [Game Controls](#game-controls)
  - [Desktop Controls](#desktop-controls)
  - [Mobile Controls](#mobile-controls)
  - [Flag Mode](#flag-mode)
- [Difficulty Levels](#difficulty-levels)
  - [Available Levels](#available-levels)
  - [Choosing Difficulty](#choosing-difficulty)
  - [Statistics Tracking](#statistics-tracking)
- [Settings & Customization](#settings--customization)
  - [Sound Settings](#sound-settings)
  - [Game History](#game-history)
  - [Performance Statistics](#performance-statistics)
- [PWA Features](#pwa-features)
  - [Install as App](#install-as-app)
  - [Offline Play](#offline-play)
  - [Updates](#updates)
- [Strategies & Tips](#strategies--tips)
  - [Beginner Tips](#beginner-tips)
  - [Advanced Strategies](#advanced-strategies)
  - [Pattern Recognition](#pattern-recognition)
- [Troubleshooting](#troubleshooting)
- [Frequently Asked Questions](#frequently-asked-questions)

---

## Getting Started

### How to Play

Minesweeper is a logic game where mines are hidden in a grid of squares. Your goal is to reveal all safe squares without triggering any mines.

**Basic Gameplay:**
1. Click on a square to reveal it
2. Numbers show how many mines are adjacent to that square
3. Use the numbers to deduce where mines are located
4. Flag squares you think contain mines
5. Clear all safe squares to win!

### Basic Rules

- **🎯 Win Condition:** Reveal all squares that don't contain mines
- **💣 Lose Condition:** Click on a square containing a mine
- **🔢 Number Clues:** Each number indicates how many mines are in the 8 surrounding squares
- **🚩 Flagging:** Mark suspected mines with flags to avoid accidentally clicking them

### Game Objective

**Primary Goal:** Clear the minefield in the shortest time possible

**Success Metrics:**
- Completion time (tracked for personal records)
- Win/loss ratio (displayed in statistics)
- Winning streaks (recorded in game history)

---

## Game Interface

### Game Board

The game board consists of a grid of squares with different states:

| State | Appearance | Meaning |
|-------|------------|---------|
| **Unopened** | Gray square | Hidden square, unknown content |
| **Empty** | Light square | Safe square with no adjacent mines |
| **Number** | Square with 1-8 | Number of mines in adjacent squares |
| **Mine** | Red square with bomb | Mine square (game over) |
| **Flagged** | Square with flag | Marked as suspected mine |
| **Defused** | Green square | Correctly flagged mine (after win) |

### Header Controls

The game header displays important information and controls:

**Left Side:**
- **🔙 Back Button** - Return to main menu
- **⏱️ Timer** - Shows elapsed game time

**Right Side:**
- **💯 Mine Counter** - Shows remaining unflagged mines
- **🚩 Flag Button** - Toggle flag mode on/off

### Menu System

**Main Menu Options:**
- **New Game** - Start a fresh game
- **Settings** - Configure difficulty and preferences
- **Tutorial** - Learn how to play (in-game help)

---

## Game Controls

### Desktop Controls

**Mouse Controls:**
- **Left Click** - Reveal a square
- **Right Click** - Toggle flag on a square
- **Both Buttons** - Quick reveal (advanced technique)

**Keyboard Shortcuts:**
- **Arrow Keys** - Navigate between squares
- **Space** - Reveal selected square
- **F** - Flag/unflag selected square
- **Esc** - Return to menu

### Mobile Controls

**Touch Controls:**
- **Tap** - Reveal a square
- **Long Press** - Toggle flag on a square
- **Flag Mode** - Tap flag button, then tap squares to flag

**Gestures:**
- **Swipe** - Navigate large grids
- **Pinch** - Zoom in/out (on supported devices)

### Flag Mode

Flag mode makes mobile gameplay easier by changing tap behavior:

**Normal Mode:**
- Tap = Reveal square
- Long press = Flag square

**Flag Mode (🚩 active):**
- Tap = Flag/unflag square
- Button disabled when game not in progress

**Tips for Flag Mode:**
- Activate when you need to place multiple flags
- Deactivate to return to normal revealing
- Visual indicator shows when flag mode is active

---

## Difficulty Levels

### Available Levels

The game offers different difficulty levels optimized for various platforms:

**Mobile Difficulties:**

| Level | Grid Size | Mines | Total Squares | Mine Density |
|-------|-----------|-------|---------------|--------------|
| **Beginner** | 9×9 | 10 | 81 | 12.3% |
| **Amateur** | 12×9 | 20 | 108 | 18.5% |

**Desktop Difficulties:**

| Level | Grid Size | Mines | Total Squares | Mine Density |
|-------|-----------|-------|---------------|--------------|
| **Beginner** | 9×9 | 10 | 81 | 12.3% |
| **Intermediate** | 16×16 | 40 | 256 | 15.6% |
| **Expert** | 30×16 | 99 | 480 | 20.6% |

### Choosing Difficulty

**For New Players:**
- Start with **Beginner** to learn the basics
- Focus on understanding number patterns
- Don't worry about time initially

**For Intermediate Players:**
- Try **Amateur** (mobile) or **Intermediate** (desktop)
- Start timing your games
- Learn advanced techniques

**For Expert Players:**
- Challenge yourself with **Expert** level
- Compete for best times
- Master probability-based decisions

### Statistics Tracking

The game tracks detailed statistics for each difficulty level:

**Performance Metrics:**
- **Best Time** - Your fastest completion
- **Games Played** - Total games attempted
- **Games Won** - Successful completions
- **Win Percentage** - Success rate
- **Longest Win Streak** - Consecutive victories
- **Longest Loss Streak** - Learning opportunities
- **Current Win Streak** - Active streak counter

---

## Settings & Customization

### Sound Settings

Control audio feedback throughout the game:

**Available Sounds:**
- **UI Clicks** - Button and menu interactions
- **Cell Reveals** - Opening squares
- **Game Events** - Win/lose notifications
- **Bomb Explosions** - Mine detonation effects

**Sound Control:**
- Toggle all sounds on/off
- Setting persists between sessions
- Useful for quiet environments

### Game History

View detailed statistics and progress tracking:

**Statistics Display:**
- Performance data for current difficulty
- Historical trends and improvements
- Achievement tracking
- Personal records

**Data Persistence:**
- Statistics saved locally
- Survives app updates
- Can be reset if desired

### Performance Statistics

Monitor your improvement over time:

**Key Metrics:**
- Average completion time
- Success rate trends
- Streak tracking
- Difficulty progression

---

## PWA Features

### Install as App

Transform Minesweeper into a native-like app experience:

**Installation Benefits:**
- **🖥️ Desktop Icon** - Launch directly from desktop
- **📱 Mobile Home Screen** - Add to phone home screen
- **⚡ Faster Loading** - Reduced load times
- **🌐 Offline Access** - Play without internet

**How to Install:**

**On Desktop (Chrome/Edge):**
1. Look for install icon in address bar
2. Click "Install Minesweeper"
3. Confirm installation
4. App appears in applications menu

**On Mobile (iOS/Android):**
1. Open browser menu
2. Select "Add to Home Screen"
3. Confirm installation
4. Icon appears on home screen

### Offline Play

Enjoy uninterrupted gameplay anywhere:

**Offline Capabilities:**
- ✅ Full game functionality
- ✅ All difficulty levels
- ✅ Statistics tracking
- ✅ Settings persistence
- ✅ Sound effects

**How It Works:**
- Game assets cached on first visit
- All game logic runs locally
- No internet required after installation
- Automatic background updates when online

### Updates

Stay current with the latest features:

**Update Process:**
- **Automatic Detection** - App checks for updates
- **User Notification** - Alert when update available
- **Background Download** - Updates download automatically
- **Smooth Transition** - Apply updates without data loss

**What Gets Updated:**
- Bug fixes and improvements
- New features and enhancements
- Performance optimizations
- UI/UX improvements

---

## Strategies & Tips

### Beginner Tips

**Start Smart:**
1. **First Click** - Click anywhere to start; mines are placed after first click
2. **Look for Numbers** - Numbers are your primary clues
3. **Start with Edges** - Corners and edges are often easier to solve
4. **Flag Obvious Mines** - When you're certain, flag immediately

**Basic Patterns:**
- **1 with 1 revealed** - Adjacent unrevealed square likely safe
- **Number equals adjacent flags** - Remaining squares are safe
- **High numbers (7,8)** - Most adjacent squares contain mines

### Advanced Strategies

**Probability Analysis:**
1. **Count Remaining Mines** - Use mine counter strategically
2. **Calculate Odds** - When forced to guess, choose better odds
3. **Pattern Recognition** - Learn common configurations
4. **Edge Strategies** - Master border and corner techniques

**Time Optimization:**
- **Flag Efficiently** - Only flag when necessary for logic
- **Batch Reveals** - Clear obvious areas quickly
- **Minimize Backtracking** - Work systematically
- **Practice Patterns** - Build muscle memory for common situations

### Pattern Recognition

**Common Patterns to Master:**

**1-2-1 Pattern:**
```
[ ][1][2][1][ ]
[ ][?][?][?][ ]
```
*Middle square is always safe*

**1-2-2-1 Pattern:**
```
[ ][1][2][2][1][ ]
[ ][?][?][?][?][ ]
```
*Outer squares contain mines*

**Wall Pattern:**
```
[1][?]
[2][?]
[1][?]
```
*Middle square contains mine*

**Advanced Techniques:**
- **Tank Method** - Systematic probability calculation
- **Chord Clicking** - Simultaneous left+right click reveal
- **Flag Counting** - Track flags vs. mine counter
- **Endgame Analysis** - Final squares probability assessment

---

## Troubleshooting

### Common Issues

**Game Won't Load:**
- Clear browser cache and cookies
- Try different browser
- Check internet connection for first load
- Disable browser extensions temporarily

**Sounds Not Playing:**
- Check sound setting in game options
- Verify browser allows audio
- Try refreshing the page
- Check device volume settings

**Touch Controls Not Working:**
- Enable JavaScript in browser
- Clear browser data
- Try different mobile browser
- Restart browser application

**PWA Installation Failed:**
- Use supported browser (Chrome, Edge, Safari)
- Ensure stable internet connection
- Clear browser cache
- Try incognito/private browsing mode

### Performance Issues

**Game Running Slowly:**
- Close other browser tabs
- Restart browser
- Check available device memory
- Update browser to latest version

**Visual Glitches:**
- Update graphics drivers
- Try different browser
- Disable hardware acceleration
- Clear browser cache

### Data Issues

**Statistics Lost:**
- Check browser local storage settings
- Ensure cookies are enabled
- Backup important statistics
- Contact support if persistent

**Settings Not Saving:**
- Enable local storage in browser
- Check privacy settings
- Clear corrupted data
- Reset to defaults if needed

---

## Frequently Asked Questions

### Gameplay Questions

**Q: Can I change difficulty mid-game?**
A: No, you must finish or abandon current game to change difficulty. Settings are applied to new games only.

**Q: What happens if I accidentally click a mine?**
A: Game ends immediately. You can start a new game or return to menu to try again.

**Q: Why does the mine counter go negative?**
A: You've placed more flags than there are mines. Remove incorrect flags to fix the counter.

**Q: Can I undo moves?**
A: No, all moves are permanent. This is part of the challenge and strategy.

### Technical Questions

**Q: Does the game work offline?**
A: Yes! After the first load, the game works completely offline as a PWA.

**Q: How do I reset my statistics?**
A: Currently, you need to clear browser data or local storage to reset statistics.

**Q: Can I play on multiple devices?**
A: Statistics are stored locally per device. Each device maintains separate progress.

**Q: Is my progress saved automatically?**
A: Yes, game state and statistics are automatically saved as you play.

### Feature Questions

**Q: Will there be more difficulty levels?**
A: Check the project repository for planned features and updates.

**Q: Can I customize the appearance?**
A: Current version uses fixed theme. Customization may be added in future updates.

**Q: Is there a hint system?**
A: No hints are provided to maintain the challenge and learning experience.

---

## Getting Help

**Need More Help?**
- 📖 Check the in-game tutorial
- 🔍 Search online Minesweeper guides
- 💬 Ask questions in project discussions
- 🐛 Report bugs in project repository

**Enjoy Playing Minesweeper! 🎮**

*Happy mining and may all your clicks be safe ones!* 