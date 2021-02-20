import React, { Component } from 'react';
import { Menu } from "./components/Menu/Menu";
import { Game } from "./components/Game/Game";
import { Settings } from "./components/Settings/Settings";
import { Tutorial } from "./components/Tutorial/Tutorial";
import { RotateBlocker } from "./components/RotateBlocker/RotateBlocker";
import { Modal } from "./components/Modal/Modal";
import { gameTemplate, historyTemplate, minesAmount } from "./data/data";
import './App.css';

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayedBlock: '',
            displayedModal: '',
            flagMode: false,
            game: JSON.parse(localStorage.getItem('_hv-m-g'))
                || gameTemplate(this.generateCellsEmptyData(9, 9)),
            history: JSON.parse(
                localStorage.getItem('_hv-m-h'),
                (key, value) => value === null ? Infinity : value
            ) || historyTemplate,
        };
        this.minesAmount = minesAmount;
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
        const {rows, cols, safeCellsRevealed, difficulty, started} = this.state.game;

        // winning scenario - all safe cells revealed
        if (rows * cols - safeCellsRevealed === this.minesAmount[difficulty]
            && started) {
            this.setWinState();
        }
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

    setWinState = () => {
        // 1. stop timer
        clearInterval(this.timerInterval);
        // 2. mark game as not ready for interact + as won
        this.setState(prevState => ({
            game: {
                ...prevState.game,
                started: false,
                result: 'win',
            }
        }));
        // 3. save result to players history
        this.setHistoryState(true);
        // 4. trigger fancy mines-reveal animation
        // 5. after animation played - set game state to finished: true
        //      in order to trigger one of result modals
    };

    setHistoryState = (gameWon) => {
        this.setState(prevState => {
            const levelData = prevState.history[prevState.game.difficulty];
            const newLevelData = {
                bestTime: (gameWon && prevState.game.timeProceed < levelData.bestTime)
                    ? prevState.game.timeProceed : levelData.bestTime,
                gamesPlayed: levelData.gamesPlayed + 1,
                gamesWon: gameWon ? levelData.gamesWon + 1 : levelData.gamesWon,
                longestWinStreak: (gameWon && levelData.longestWinStreak === levelData.currentWinStreak)
                    ? levelData.longestWinStreak + 1 : levelData.longestWinStreak,
                longestLoseStreak: (!gameWon && levelData.longestLoseStreak === levelData.currentLoseStreak)
                    ? levelData.longestLoseStreak + 1 : levelData.longestLoseStreak,
                currentWinStreak: gameWon ? levelData.currentWinStreak + 1 : 0,
                currentLoseStreak: !gameWon ? levelData.currentLoseStreak + 1 : 0,
            };
            const updatedHistory = {
                ...prevState.history,
                [prevState.game.difficulty]: newLevelData,
            };

            localStorage.setItem('_hv-m-h', JSON.stringify(updatedHistory));

            return {
                history: updatedHistory,
            }
        });
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
        const {flagMode, game: {started, cells, safeCellsRevealed}} = this.state;
        const cell = cells[col][row];

        if (!started && safeCellsRevealed === 0) {
            this.startGame(col, row);

        } else if (started && flagMode) {
            this.toggleFlagOnCellHandler(col, row);

        } else if (started && !cell.flagged && !cell.opened && cell.mine) {
            // todo end game
            console.warn('MINE');

        } else if (started) {
            this.revealCell(col, row);
        }
    };

    revealCell = (col, row) => {
        const cells = this.state.game.cells;

        if (cells[col] && cells[col][row] && !cells[col][row].opened && !cells[col][row].flagged) {
            this.setState(prevState => {
                let notMineIncrement = 1;
                const cells = prevState.game.cells.map((subArr, x) => {
                    return subArr.map((cell, y) => {
                        if (col === x && row === y) {
                            if (cell.mine) {
                                notMineIncrement = 0;
                            }

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
                        safeCellsRevealed: prevState.game.safeCellsRevealed + notMineIncrement,
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
