export const minesAmount = {
    '9x9': 10,
    '9x16': 20,
    '16x16': 40,
    '30x16': 99,
};

export const difficultyOptions = [
    { value: '9x9', label: 'Beginner' },
    { value: '9x16', label: 'Amateur' },
    { value: '16x16', label: 'Amateur' },
    { value: '30x16', label: 'Expert' },
].map(option => ({
    ...option,
    mines: minesAmount[option.value],
}));



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
    inProgress: false,
    timeProceed: 0,
    flaggedAmount: 0,
    safeCellsRevealed: 0,
    result: null,
});

export const cellTemplate = {
    opened: false,
    mine: false,
    minesAround: 0,
    flagged: false,
    defused: false,
    blownUp: false,
    rightFlagged: false,
    wrongFlagged: false,
};