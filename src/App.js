import React, { Component } from 'react';
import { Menu } from "./components/Menu/Menu";
import { Game } from "./components/Game/Game";
import { Settings } from "./components/Settings/Settings";
import { Tutorial } from "./components/Tutorial/Tutorial";
import { RotateBlocker } from "./components/RotateBlocker/RotateBlocker";
import { Modal } from "./components/Modal/Modal";
import { Loader } from "./components/Loader/Loader";
import { gameTemplate, historyTemplate, minesAmount, cellTemplate } from "./data/data";
import './App.css';

export class App extends Component {
    constructor(props) {
        super(props);
        this.version = 'v0.2';
        this.state = {
            loaderState: 'visible',
            displayedBlock: '',
            displayedModal: '',
            flagMode: false,
            game: (localStorage.getItem('_hv-m-v') !== this.version)
                ? gameTemplate(this.generateCellsEmptyData(9, 9))
                : JSON.parse(localStorage.getItem('_hv-m-g'))
                || gameTemplate(this.generateCellsEmptyData(9, 9)),
            history: JSON.parse(
                localStorage.getItem('_hv-m-h'),
                (key, value) => value === null ? Infinity : value
            ) || {
                '9x9': historyTemplate,
            },
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

        // if got unfinished game from storage
        if (this.state.game.inProgress) {
            this.switchBlockHandler('game');
            this.switchModalHandler('unfinished');
        }

        if (localStorage.getItem('_hv-m-v') !== this.version) {
            // todo notify user about new version features (switchModalHandler)
            localStorage.setItem('_hv-m-v', this.version);
        }

        this.resizeAppBlock();
        window.addEventListener('resize', this.resizeAppBlock);

        setTimeout(() => {
            this.setLoaderState('hidden');
        }, 500);
    }

    componentDidUpdate() {
        const {rows, cols, safeCellsRevealed, difficulty, inProgress} = this.state.game;

        // winning scenario - all safe cells revealed
        if (rows * cols - safeCellsRevealed === this.minesAmount[difficulty]
            && inProgress) {
            this.setWinState();
        }

        localStorage.setItem('_hv-m-g', JSON.stringify(this.state.game));
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

        if (force === true || this.state.game.inProgress) {
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
        this.pauseTimer();
        // 2. mark game as not ready for interact + as won
        this.setState(prevState => ({
            game: {
                ...prevState.game,
                inProgress: false,
                result: 'win',
            }
        }));
        // 3. save result to players history
        this.setHistoryState(true);
        // 4. trigger fancy mines-reveal animation
        this.defuseMines();
        // 5. after animation played - show results modal
        setTimeout(() => {
            this.switchModalHandler('result');
        }, 5000);
    };

    setLoseState = (x, y) => {
        // 1. stop timer
        this.pauseTimer();
        // 2. mark game as not ready for interact + as won
        this.setState(prevState => ({
            game: {
                ...prevState.game,
                inProgress: false,
                result: 'lose',
            }
        }));
        // 3. save result to players history
        this.setHistoryState(false);
        // 4. trigger mines-reveal process
        this.revealMinesWhenLost(x, y);
        // 5. after a while - show results modal
        setTimeout(() => {
            this.switchModalHandler('result');
        }, 5000);
    };

    setHistoryState = (gameWon) => {
        this.setState(prevState => {
            const levelData = prevState.history[prevState.game.difficulty] || historyTemplate;
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
        if (displayedBlock === 'new-game') {
            // reset data only if 'New Game' triggered
            this.resetGameData();
        }

        this.setState({
            displayedBlock,
        })
    };

    switchModalHandler = (displayedModal) => {
        this.setState({
            displayedModal,
        });
    };

    leaveGameHandler = () => {
        this.state.game.inProgress
            ? this.switchModalHandler('leave-confirm')
            : this.switchBlockHandler('menu');
    };

    leaveGameConfirm = () => {
        this.enterMenuWithoutModal();
        this.setHistoryState(false);
        this.setState(prevState => ({
            game: {
                ...prevState.game,
                inProgress: false,
            }
        }));
        clearInterval(this.timerInterval);
    };

    continueGameConfirm = () => {
        this.switchModalHandler('');
        this.runTimer();
    };

    enterMenuWithoutModal = () => {
        this.switchBlockHandler('menu');
        this.switchModalHandler('');
    };

    prepareNewGame = () => {
        this.resetGameData();
        this.switchModalHandler('');
    };

    resetGameData = () => {
        this.setState(prevState => ({
            game: {
                ...prevState.game,
                cells: this.generateCellsEmptyData(prevState.game.cols, prevState.game.rows),
                started: false,
                inProgress: false,
                timeProceed: 0,
                flaggedAmount: 0,
                safeCellsRevealed: 0,
                result: null,
            }
        }))
    };

    generateCellsEmptyData = (colsNum, rowsNum) => {
        const cellsArr = [];

        for (let i = 0; i < colsNum; i++) {
            const colArr = [];
            for (let j = 0; j < rowsNum; j++) {
                colArr.push(cellTemplate);
            }
            cellsArr.push(colArr);
        }

        return cellsArr;
    };

    changeDifficulty = (difficulty) => {
        const [, cols, rows] = /(\d+)x(\d+)/.exec(difficulty);

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
                inProgress: true,
            }
        }));
        this.runTimer(true);
        this.setRevealedCellsState(x, y);
    };

    clickOnCellHandler = (col, row) => {
        const {flagMode, game: {inProgress, cells, safeCellsRevealed}} = this.state;
        const cell = cells[col][row];

        if (!inProgress && safeCellsRevealed === 0) {
            this.startGame(col, row);

        } else if (inProgress && flagMode) {
            this.toggleFlagOnCellHandler(col, row);

        } else if (inProgress && !cell.flagged && !cell.opened && cell.mine) {
            this.setLoseState(col, row);

        } else if (inProgress) {
            this.setRevealedCellsState(col, row);
        }
    };

    revealCell = (gameState, x, y) => {
        let updatedGameState = {...gameState};
        let cells = [...updatedGameState.cells];

        if (cells[x] && cells[x][y] && !cells[x][y].opened && !cells[x][y].flagged) {
            cells[x][y] = {
                ...cells[x][y],
                opened: true,
            };

            updatedGameState = {
                ...updatedGameState,
                cells,
            };

            const minesAround = this.countMinesAround(cells, x, y);

            if (minesAround === 0) {
                return {
                    ...this.revealCell(updatedGameState,x - 1, y - 1),
                    ...this.revealCell(updatedGameState, x, y - 1),
                    ...this.revealCell(updatedGameState,x + 1, y - 1),
                    ...this.revealCell(updatedGameState,x - 1, y),
                    ...this.revealCell(updatedGameState,x + 1, y),
                    ...this.revealCell(updatedGameState,x - 1, y + 1),
                    ...this.revealCell(updatedGameState, x, y + 1),
                    ...this.revealCell(updatedGameState,x + 1, y + 1),
                }

            } else {
                cells = [...updatedGameState.cells];
                cells[x][y] = {
                    ...cells[x][y],
                    minesAround,
                };

                return {
                    ...updatedGameState,
                    cells,
                };
            }
        }

        return gameState;
    };

    setRevealedCellsState = (col, row) => {
        this.setState(prevState => {
            const updatedGame = this.revealCell({...prevState.game}, col, row);
            let safeCellsRevealed = 0;

            updatedGame.cells.forEach(subArr => {
                subArr.forEach(cell => {
                    if (cell.opened && !cell.mine) {
                        safeCellsRevealed += 1;
                    }
                });
            });

            return {
                game: {
                    ...updatedGame,
                    safeCellsRevealed,
                }
            }
        });
    };

    defuseMines = () => {
        this.setState(prevState => {
            const cells = prevState.game.cells.map(subArr => {
                return subArr.map(cell => {
                    if (cell.mine) {
                        return {
                            ...cell,
                            opened: true,
                            flagged: false,
                            defused: true,
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

    revealMinesWhenLost = (col, row) => {
        this.setState(prevState => {
            const cells = prevState.game.cells.map((subArr, x) => {
                return subArr.map((cell, y) => {
                    if (col === x && row === y) {
                        return {
                            ...cell,
                            opened: true,
                            blownUp: true,
                        }

                    } else if (cell.mine) {
                        return {
                            ...cell,
                            opened: true,
                            rightFlagged: true,
                        }

                    } else if (cell.flagged && !cell.mine) {
                        return {
                            ...cell,
                            opened: true,
                            wrongFlagged: true,
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

    countMinesAround = (cells, x, y) => {
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
        if (this.state.game.inProgress) {
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

                // todo why code below not working?
                // const cells = [...prevState.game.cells];
                // cells[col][row] = {
                //     ...cells[col][row],
                //     flagged: !cells[col][row].flagged,
                // };
                //
                // let increment = cells[col][row].flagged ? 1 : -1;

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

    setLoaderState = (loaderState) => {
        this.setState({
            loaderState,
        })
    };

    render() {
        const { displayedBlock, flagMode, gameLayoutMode,
            displayedModal, loaderState,
            game: {
                difficulty,
                timeProceed,
                cols,
                rows,
                cells,
                started,
                inProgress,
                flaggedAmount,
                result,
            },
        } = this.state;
        const minesLeft = this.minesAmount[difficulty] - flaggedAmount;
        const history = this.state.history[difficulty];

        return (
            <main
                className="app"
                ref={(appRef) => this.appRef = appRef}>
                <div className="app__container">
                    {
                        displayedBlock === 'menu'
                            ? <Menu
                                switchBlockHandler={this.switchBlockHandler} />
                            : displayedBlock.includes('game', 'new-game')
                            ? <Game
                                layoutMode={gameLayoutMode}
                                started={started}
                                inProgress={inProgress}
                                cols={cols}
                                rows={rows}
                                cells={cells}
                                timeProceed={timeProceed}
                                flagMode={flagMode}
                                minesLeft={minesLeft}
                                leaveGameHandler={this.leaveGameHandler}
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
                        content={'Are you sure you want to leave to menu? Game progress will be lost.'}
                        btn1Name={'Leave'}
                        btn2Name={'Stay'}
                        btn1Action={this.leaveGameConfirm.bind(this)}
                        btn2Action={() => {this.switchModalHandler('')}}
                        hideModalHandler={() => {this.switchModalHandler('')}} />
                    : displayedModal === 'unfinished'
                    ? <Modal
                        content={'You have an unfinished game. Would you like to continue?'}
                        btn1Name={'To Menu'}
                        btn2Name={'Continue'}
                        btn1Action={this.leaveGameConfirm.bind(this)}
                        btn2Action={this.continueGameConfirm.bind(this)} />
                    : displayedModal === 'result'
                    ? <Modal
                        result={result}
                        timeProceed={timeProceed}
                        history={history}
                        btn1Name={'To Menu'}
                        btn2Name={'New Game'}
                        btn1Action={this.enterMenuWithoutModal.bind(this)}
                        btn2Action={this.prepareNewGame.bind(this)}
                        hideModalHandler={() => {this.switchModalHandler('')}} />
                    : null
                }
                <Loader loaderState={loaderState} />

            </main>
        );
    }
}
