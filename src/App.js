import React, { Component } from 'react';
import { Menu } from "./components/Menu/Menu";
import { Game } from "./components/Game/Game";
import { Settings } from "./components/Settings/Settings";
import { Tutorial } from "./components/Tutorial/Tutorial";
import { RotateBlocker } from "./components/RotateBlocker/RotateBlocker";
import { Modal } from "./components/Modal/Modal";
import './App.css';

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayedBlock: '',
            displayedModal: '',
            flagMode: false,
            game: {
                difficulty: '9x9',
                cols: 9,
                rows: 9,
                cells: this.generateCellsEmptyData(9, 9),
                started: false,
                finished: false,
                timeProceed: 0,
                flaggedAmount: 0,
            },
            history: {
                '9x9': {
                    bestTime: 0,
                    gamesPlayed: 0,
                    gamesWon: 0,
                    longestWinStreak: 0,
                    longestLoseStreak: 0,
                    currentWinStreak: 0,
                    currentLoseStreak: 0,
                },
                '9x16': {
                    bestTime: 0,
                    gamesPlayed: 0,
                    gamesWon: 0,
                    longestWinStreak: 0,
                    longestLoseStreak: 0,
                    currentWinStreak: 0,
                    currentLoseStreak: 0,
                },
                '16x16': {
                    bestTime: 0,
                    gamesPlayed: 0,
                    gamesWon: 0,
                    longestWinStreak: 0,
                    longestLoseStreak: 0,
                    currentWinStreak: 0,
                    currentLoseStreak: 0,
                },
                '30x16': {
                    bestTime: 0,
                    gamesPlayed: 0,
                    gamesWon: 0,
                    longestWinStreak: 0,
                    longestLoseStreak: 0,
                    currentWinStreak: 0,
                    currentLoseStreak: 0,
                },
            },
        };
        this.minesAmount = {
            '9x9': 10,
            '9x16': 20,
            '16x16': 40,
            '30x16': 99,
        };
        this.gameLayoutMode = '';
        this.timerInterval = null;
        this.resizeAppBlock = this.resizeAppBlock.bind(this);
        this.runTimer = this.runTimer.bind(this);
        this.pauseTimer = this.pauseTimer.bind(this);
    }

    componentDidMount() {
        console.debug('App mount');
        this.resizeAppBlock();
        window.addEventListener('resize', this.resizeAppBlock);
    }

    componentDidUpdate() {

    }

    componentWillUnmount() {
        console.debug('App unmount');
        window.removeEventListener('resize', this.resizeAppBlock);
    }

    resizeAppBlock() {
        this.appRef.style.height = `${window.innerHeight}px`;
        this.setGameLayoutMode(
            window.innerHeight, window.innerWidth,
            this.state.game.cols, this.state.game.rows);
        console.debug('Window height: ', window.innerHeight);
    }

    runTimer(force) {
        window.removeEventListener('focus', this.runTimer);
        window.addEventListener('blur', this.pauseTimer);

        if (force || this.state.game.started) {
            this.initTimer();
        }
    }

    pauseTimer() {
        window.removeEventListener('blur', this.pauseTimer);
        window.addEventListener('focus', this.runTimer);

        clearInterval(this.timerInterval);
    }

    initTimer = () => {
        this.timerInterval = setInterval(() => {
            this.setState(prevState => ({
                game: {
                    ...prevState.game,
                    timeProceed: prevState.game.timeProceed + 1,
                }
            }));
        }, 1000);
    };

    switchBlockHandler = (displayedBlock) => {
        this.setState({
            displayedBlock,
        })
    };

    generateCellsEmptyData = (colsNum, rowsNum) => {
        const cellsArr = [];

        for (let i = 0; i < colsNum; i++) {
            const colArr = [];
            for (let j = 0; j < rowsNum; j++) {
                colArr.push({
                    opened: false,
                    mine: false,
                    minesAround: 0,
                    flagged: false,
                });
            }
            cellsArr.push(colArr);
        }

        return cellsArr;
    };

    changeDifficulty = (difficulty) => {
        const [match, cols, rows] = /(\d+)x(\d+)/.exec(difficulty);

        this.setGameLayoutMode(window.innerHeight, window.innerWidth, cols, rows);
        this.setState(prevState => ({
            game: {
                ...prevState.game,
                cols: parseInt(cols),
                rows: parseInt(rows),
                cells: this.generateCellsEmptyData(cols, rows),
                difficulty,
            },
        }))
    };

    toggleFlagMode = () => {
        this.setState(prevState => ({
            flagMode: !prevState.flagMode,
        }))
    };

    setMines = (x, y) => {
        this.setState(prevState => {
            const minesIdCollection = {};
            let minesCount = 0;

            while (minesCount < this.minesAmount[prevState.game.difficulty]) {
                const randCol = Math.floor(Math.random() * prevState.game.cols);
                const randRow = Math.floor(Math.random() * prevState.game.rows);
                const mineId = `${randCol}x${randRow}`;

                if (!(mineId in minesIdCollection) && !(x - 2 < randCol && x + 2 > randCol
                    && y - 2 < randRow && y + 2 > randRow)) {
                    minesIdCollection[mineId] = true;
                    minesCount += 1;
                }
            }

            console.debug(minesIdCollection);

            const cells = prevState.game.cells.map((subArr, x) => {
                return subArr.map((cell, y) => {
                    if (`${x}x${y}` in minesIdCollection) {
                        return {
                            ...cell,
                            mine: true,
                        }
                    }

                    return cell;
                });
            });

            return {
                game: {
                    ...prevState.game,
                    cells,
                }
            }
        });
    };

    startGame = (x, y) => {
        this.setMines(x, y);
        this.setState(prevState => ({
            game: {
                ...prevState.game,
                started: true,
            }
        }));
        this.runTimer(true);
        this.revealCell(x, y);
    };

    clickOnCellHandler = (col, row) => {
        const {flagMode, game: {started, cells}} = this.state;
        const cell = cells[col][row];

        if (!started) {
            this.startGame(col, row);

        } else if (flagMode) {
            this.toggleFlagOnCellHandler(col, row);

        } else if (!cell.flagged && !cell.opened && cell.mine) {
            // todo end game
            console.warn('MINE');

        } else {
            this.revealCell(col, row);
        }
    };

    revealCell = (col, row) => {
        const cells = this.state.game.cells;

        if (cells[col] && cells[col][row] && !cells[col][row].opened && !cells[col][row].flagged) {
            this.setState(prevState => {
                const cells = prevState.game.cells.map((subArr, x) => {
                    return subArr.map((cell, y) => {
                        if (col === x && row === y) {
                            return {
                                ...cell,
                                opened: true,
                            }
                        }

                        return cell;
                    });
                });

                return {
                    game: {
                        ...prevState.game,
                        cells,
                    }
                }
            });

            const minesAround = this.countMinesAround(col, row);

            if (minesAround === 0) {
                for (let i = -1; i < 2; i++) {
                    for (let j = -1; j < 2; j++) {
                        if (!(i === 0 && j === 0)) {
                            setTimeout(() => {
                                this.revealCell(col + i, row + j);
                            }, 10);
                        }
                    }
                }

            } else {
                this.setState(prevState => {
                    const cells = prevState.game.cells.map((subArr, x) => {
                        return subArr.map((cell, y) => {
                            if (col === x && row === y) {
                                return {
                                    ...cell,
                                    minesAround,
                                }
                            }

                            return cell;
                        });
                    });

                    return {
                        game: {
                            ...prevState.game,
                            cells,
                        }
                    }
                });
            }
        }
    };

    countMinesAround = (x, y) => {
        const cells = this.state.game.cells;
        let count = 0;

        for (let i = -1; i < 2; i++) {
            if (!cells[x + i]) continue;

            for (let j = -1; j < 2; j++) {
                if (cells[x + i][y + j] && cells[x + i][y + j].mine) {
                    count += 1;
                }
            }
        }

        return count;
    };

    toggleFlagOnCellHandler = (col, row) => {
        if (this.state.game.started) {
            this.setState(prevState => {
                let increment = 1;
                const cells = prevState.game.cells.map((subArr, x) => {
                    return subArr.map((cell, y) => {
                        if (col === x && row === y) {
                            if (cell.flagged) {
                                increment = -1;
                            }

                            return {
                                ...cell,
                                flagged: !cell.flagged,
                            }
                        }

                        return cell;
                    });
                });

                return {
                    game: {
                        ...prevState.game,
                        cells,
                        flaggedAmount: prevState.game.flaggedAmount + increment,
                    }
                }
            })
        }
    };

    setGameLayoutMode = (appHeight, appWidth, colsNum, rowsNum) => {
        this.setState({
            gameLayoutMode: (appHeight < 568 && rowsNum > 9)
                ? 'game--r16-568'
                : (appWidth < 768 && colsNum > 16)
                    ? 'game--c30-768'
                    : (appWidth < 992 && colsNum > 16)
                        ? 'game--c30-992' : '',
        })
    };

    render() {
        const { displayedBlock, flagMode, gameLayoutMode, displayedModal,
            game: {
                difficulty,
                timeProceed,
                cols,
                rows,
                cells,
                started,
                flaggedAmount,
            }
        } = this.state;
        const minesLeft = this.minesAmount[difficulty] - flaggedAmount;

        return (
            <main
                className="app"
                ref={(appRef) => this.appRef = appRef}>
                <div className="app__container">
                    {
                        displayedBlock === 'menu'
                            ? <Menu
                                switchBlockHandler={this.switchBlockHandler} />
                            : displayedBlock === 'game'
                            ? <Game
                                layoutMode={gameLayoutMode}
                                started={started}
                                cols={cols}
                                rows={rows}
                                cells={cells}
                                timeProceed={timeProceed}
                                flagMode={flagMode}
                                minesLeft={minesLeft}
                                toggleFlagMode={this.toggleFlagMode}
                                clickOnCellHandler={this.clickOnCellHandler}
                                toggleFlagOnCellHandler={this.toggleFlagOnCellHandler} />
                            : displayedBlock === 'settings'
                                ? <Settings
                                    difficulty={difficulty}
                                    changeDifficulty={this.changeDifficulty} />
                                : displayedBlock === 'tutorial'
                                    ? <Tutorial/>
                                    : <Menu
                                        switchBlockHandler={this.switchBlockHandler} />
                    }
                </div>
                <RotateBlocker />
                {
                    displayedModal === 'leave-confirm'
                    ? <Modal
                        text={'Are you sure you want to leave to menu? Game progress will be lost.'}
                        btn1Name={'Leave'}
                        btn2Name={'Stay'}
                        btn1Action={() => {}}
                        btn2Action={() => {}} />
                    : displayedModal === 'unfinished'
                    ? <Modal
                        text={'You have an unfinished game. Would you like to continue?'}
                        btn1Name={'To Menu'}
                        btn2Name={'Continue'}
                        btn1Action={() => {}}
                        btn2Action={() => {}} />
                    : displayedModal === 'win'
                    ? <Modal
                        text={''}
                        btn1Name={'To Menu'}
                        btn2Name={'New Game'}
                        btn1Action={() => {}}
                        btn2Action={() => {}} />
                    : displayedModal === 'lost'
                    ? <Modal
                        text={''}
                        btn1Name={'To Menu'}
                        btn2Name={'New Game'}
                        btn1Action={() => {}}
                        btn2Action={() => {}} />
                    : null
                }

            </main>
        );
    }
}
