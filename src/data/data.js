export const minesAmount = {
    '9x9': 10,
    '9x16': 20,
    '16x16': 40,
    '30x16': 99,
};

export const historyTemplate = {
    bestTime: Infinity,
    gamesPlayed: 0,
    gamesWon: 0,
    longestWinStreak: 0,
    longestLoseStreak: 0,
    currentWinStreak: 0,
    currentLoseStreak: 0,
};

export const gameTemplate = cellsData => ({
    difficulty: '9x9',
    cols: 9,
    rows: 9,
    cells: cellsData,
    started: false,
    timeProceed: 0,
    flaggedAmount: 0,
    safeCellsRevealed: 0,
    result: null,
});