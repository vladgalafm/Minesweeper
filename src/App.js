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

/*
* Storage names explained:
* _hv-m-v: app version
* _hv-m-n: app update notification, if exists - user already seen it
* _hv-m-g: current game data
* _hv-m-h: user's history data
* */

export class App extends Component {
    constructor(props) {
        super(props);
        this.version = '0.5.9.6';
        this.state = {
            loaderState: 'visible',
            updateNotifyEnabled: true,
            modalHidden: false,
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
        // 1. Check if new sw.js installed. If not - then:
        // 2. Check if got unfinished game from storage. If not - then:
        // 3. Check if new version has been installed
        this.checkIfWorkerUpdated() || this.checkIfGameInProgress() || this.checkIfNewVersionInstalled();

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

        // looking for updates
        this.checkIfWorkerUpdated();

        localStorage.setItem('_hv-m-g', JSON.stringify(this.state.game));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeAppBlock);
    }

    resizeAppBlock() {
        this.appRef.style.height = `${window.innerHeight}px`;
        this.setGameLayoutMode(
            window.innerHeight, window.innerWidth,
            this.state.game.cols, this.state.game.rows);
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

    checkIfWorkerUpdated = () => {
        if (window.installingWorker && this.state.updateNotifyEnabled
            && !this.state.game.inProgress && !this.state.game.started) {
            this.setState({
                updateNotifyEnabled: false,
            });
            this.switchModalHandler('confirm-update');
            return true;
        }
        return false;
    };

    checkIfGameInProgress = () => {
        if (this.state.game.inProgress) {
            this.switchBlockHandler('game');
            this.switchModalHandler('unfinished');
            return true;
        }
        return false;
    };

    checkIfNewVersionInstalled = () => {
        if (localStorage.getItem('_hv-m-v') !== this.version
            || !localStorage.getItem('_hv-m-n')) {
            this.switchModalHandler('update');
            localStorage.removeItem('_hv-m-n');
            localStorage.setItem('_hv-m-v', this.version);
            return true;
        }
        return false;
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
        }, 4000);
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

    toggleModalVisibilityHandler = (hide) => {
        this.setState({
            modalHidden: hide,
        })
    };

    leaveGameHandler = () => {
        this.state.game.inProgress
            ? this.switchModalHandler('leave-confirm')
            : this.enterMenuWithoutModal();
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

    hideUpdateNotification = () => {
        this.switchModalHandler('');
        localStorage.setItem('_hv-m-n', 'seen');
    };

    enterMenuWithoutModal = () => {
        this.switchBlockHandler('menu');
        this.switchModalHandler('');
        this.toggleModalVisibilityHandler(false);
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
            displayedModal, loaderState, modalHidden,
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
                className={`app${modalHidden ? ' app--modal-hidden' : ''}`}
                ref={(appRef) => this.appRef = appRef}>
                <div className="app__container">
                    {
                        displayedBlock.includes('game', 'new-game')
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
                                    history={history}
                                    changeDifficulty={this.changeDifficulty}
                                    returnHandler={() => {this.switchBlockHandler('menu')}} />
                                : displayedBlock === 'tutorial'
                                    ? <Tutorial
                                        exitHandler={() => {this.switchBlockHandler('menu')}}  />
                                    : <Menu
                                        switchBlockHandler={this.switchBlockHandler} />
                    }
                </div>
                <RotateBlocker />
                {
                    displayedModal === 'leave-confirm'
                    ? <Modal
                        content={'Are you sure you want to leave to menu? Game progress will be lost.'}
                        btn1Name={'Stay'}
                        btn2Name={'Leave'}
                        btn1Action={() => {this.switchModalHandler('')}}
                        btn2Action={this.leaveGameConfirm.bind(this)}
                        hideModalHandler={() => {this.switchModalHandler('')}} />
                    : displayedModal === 'unfinished'
                    ? <Modal
                        content={'You have an unfinished game. Would you like to continue?'}
                        btn1Name={'Continue'}
                        btn2Name={'To Menu'}
                        btn1Action={this.continueGameConfirm.bind(this)}
                        btn2Action={this.leaveGameConfirm.bind(this)} />
                    : displayedModal === 'result'
                    ? <Modal
                        result={result}
                        timeProceed={timeProceed}
                        history={history}
                        btn1Name={'New Game'}
                        btn2Name={'To Menu'}
                        btn1Action={this.prepareNewGame.bind(this)}
                        btn2Action={this.enterMenuWithoutModal.bind(this)}
                        hideModalHandler={() => {this.toggleModalVisibilityHandler(true)}} />
                    : displayedModal === 'update'
                    ? <Modal
                        updateVersion={this.version}
                        btn1Name={'Confirm'}
                        btn1Action={this.hideUpdateNotification.bind(this)}
                        hideModalHandler={this.hideUpdateNotification.bind(this)} />
                    : displayedModal === 'confirm-update'
                    ? <Modal
                        content={'Good news! We have just updated the application! '
                            + 'To install the latest version click the button below '
                            + '(the page will reload).'}
                        btn1Name={'Update'}
                        btn2Name={'Later'}
                        btn1Action={() => {window.location.reload()}}
                        btn2Action={() => {this.switchModalHandler('')}}
                        hideModalHandler={() => {this.switchModalHandler('')}} />
                    : null
                }
                <Loader loaderState={loaderState} />
                <button
                    className="app__modal-btn"
                    aria-label="Show modal window again"
                    onClick={() => {this.toggleModalVisibilityHandler(false)}} />
            </main>
        );
    }
}
