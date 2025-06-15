import React, { useState, useEffect, useRef } from 'react';
import { Menu } from "./components/Menu/Menu";
import { Game } from "./components/Game/Game";
import { Settings } from "./components/Settings/Settings";
import { Tutorial } from "./components/Tutorial/Tutorial";
import { RotateBlocker } from "./components/RotateBlocker/RotateBlocker";
import { Modal } from "./components/Modal/Modal";
import { Loader } from "./components/Loader/Loader";
import { gameTemplate, historyTemplate, minesAmount, cellTemplate } from "./data/data";
import soundClick from "./sound/click.mp3";
import soundBomb from "./sound/bomb2.mp3";
import soundReveal from "./sound/reveal.mp3";
import soundNotification from "./sound/update_notify.mp3";
import soundGameOpen from "./sound/game_open.mp3";
import soundGameStart from "./sound/game_start.mp3";
import './App.css';

/*
* Storage names explained:
* _hv-m-v: app version
* _hv-m-n: app update notification, if exists - user already seen it
* _hv-m-g: current game data
* _hv-m-h: user's history data
* _hv-m-s: sound effects on/off
* */

// Helper function defined outside the component to avoid initialization issues
function generateCellsEmptyData(colsNum, rowsNum) {
    const cellsArr = [];

    for (let i = 0; i < colsNum; i++) {
        const colArr = [];
        for (let j = 0; j < rowsNum; j++) {
            colArr.push(cellTemplate);
        }
        cellsArr.push(colArr);
    }

    return cellsArr;
}

export function App() {
    const version = '0.7.0';
    
    // Convert class state to useState hooks
    const [sound, setSound] = useState(
        localStorage.getItem('_hv-m-s') ? !!parseInt(localStorage.getItem('_hv-m-s')) : true
    );
    const [loaderState, setLoaderState] = useState('visible');
    const [updateNotifyEnabled, setUpdateNotifyEnabled] = useState(true);
    const [modalHidden, setModalHidden] = useState(false);
    const [displayedBlock, setDisplayedBlock] = useState('');
    const [displayedModal, setDisplayedModal] = useState('');
    const [flagMode, setFlagMode] = useState(false);
    
    // Use a lazy initializer function for game state to avoid timing issues
    const [game, setGame] = useState(() => {
        return (localStorage.getItem('_hv-m-v') !== version)
            ? gameTemplate(generateCellsEmptyData(9, 9))
            : JSON.parse(localStorage.getItem('_hv-m-g'))
            || gameTemplate(generateCellsEmptyData(9, 9));
    });
    
    const [history, setHistory] = useState(
        JSON.parse(
            localStorage.getItem('_hv-m-h'),
            (key, value) => value === null ? Infinity : value
        ) || {
            '9x9': historyTemplate,
        }
    );
    
    // Convert class instance variables to refs
    const gameLayoutModeRef = useRef('');
    const timerIntervalRef = useRef(null);
    const resultTimeoutRef = useRef(null);
    const appRef = useRef(null);

    // Helper functions - converted from useCallback to regular functions
    function playSound(file, force) {
        if ((typeof force === 'undefined' && sound) || force) {
            const audio = new Audio(file);
            audio.play();
        }
    }

    function switchModalHandler(newDisplayedModal) {
        setDisplayedModal(newDisplayedModal);
    }

    function toggleModalVisibilityHandler(hide) {
        setModalHidden(hide);
    }

    function switchBlockHandler(newDisplayedBlock) {
        if (newDisplayedBlock === 'new-game') {
            // reset data only if 'New Game' triggered
            resetGameData();
        }

        setDisplayedBlock(newDisplayedBlock);
    }

    function resetGameData() {
        setGame(prevGame => ({
            ...prevGame,
            cells: generateCellsEmptyData(prevGame.cols, prevGame.rows),
            started: false,
            inProgress: false,
            timeProceed: 0,
            flaggedAmount: 0,
            safeCellsRevealed: 0,
            result: null,
        }));
    }

    function enterMenuWithoutModal() {
        playSound(soundClick);
        switchBlockHandler('menu');
        switchModalHandler('');
        toggleModalVisibilityHandler(false);
    }

    function setHistoryState(gameWon) {
        setHistory(prevHistory => {
            const levelData = prevHistory[game.difficulty] || historyTemplate;
            const newLevelData = {
                bestTime: (gameWon && game.timeProceed < levelData.bestTime)
                    ? game.timeProceed : levelData.bestTime,
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
                ...prevHistory,
                [game.difficulty]: newLevelData,
            };

            localStorage.setItem('_hv-m-h', JSON.stringify(updatedHistory));

            return updatedHistory;
        });
    }

    function hideUpdateNotification() {
        playSound(soundClick);
        switchModalHandler('');
        localStorage.setItem('_hv-m-n', 'seen');
    }

    function leaveGameConfirm() {
        enterMenuWithoutModal();
        setHistoryState(false);
        setGame(prevGame => ({
            ...prevGame,
            inProgress: false,
        }));
        clearInterval(timerIntervalRef.current);
        clearTimeout(resultTimeoutRef.current);
    }

    function initTimer() {
        timerIntervalRef.current = setInterval(() => {
            setGame(prevGame => ({
                ...prevGame,
                timeProceed: prevGame.timeProceed + 1,
            }));
        }, 1000);
    }

    function pauseTimer() {
        window.removeEventListener('blur', pauseTimer);
        window.addEventListener('focus', runTimer);

        clearInterval(timerIntervalRef.current);
    }

    function runTimer(force) {
        window.removeEventListener('focus', runTimer);
        window.addEventListener('blur', pauseTimer);

        if (force === true || game.inProgress) {
            initTimer();
        }
    }

    function continueGameConfirm() {
        playSound(soundClick);
        switchModalHandler('');
        runTimer();
    }

    function prepareNewGame() {
        resetGameData();
        switchModalHandler('');
        playSound(soundGameOpen);
    }

    function countMinesAround(cells, x, y) {
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
    }

    function revealCell(gameState, x, y) {
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

            const minesAround = countMinesAround(cells, x, y);

            if (minesAround === 0) {
                return {
                    ...revealCell(updatedGameState, x - 1, y - 1),
                    ...revealCell(updatedGameState, x, y - 1),
                    ...revealCell(updatedGameState, x + 1, y - 1),
                    ...revealCell(updatedGameState, x - 1, y),
                    ...revealCell(updatedGameState, x + 1, y),
                    ...revealCell(updatedGameState, x - 1, y + 1),
                    ...revealCell(updatedGameState, x, y + 1),
                    ...revealCell(updatedGameState, x + 1, y + 1),
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
    }

    function setRevealedCellsState(col, row) {
        setGame(prevGame => {
            const updatedGame = revealCell({...prevGame}, col, row);
            let safeCellsRevealed = 0;

            updatedGame.cells.forEach(subArr => {
                subArr.forEach(cell => {
                    if (cell.opened && !cell.mine) {
                        safeCellsRevealed += 1;
                    }
                });
            });

            return {
                ...updatedGame,
                safeCellsRevealed,
            };
        });
    }

    function defuseMines() {
        setGame(prevGame => {
            const cells = prevGame.cells.map(subArr => {
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
                ...prevGame,
                cells,
            };
        });
    }

    function revealMinesWhenLost(col, row) {
        setGame(prevGame => {
            const cells = prevGame.cells.map((subArr, x) => {
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
                ...prevGame,
                cells,
            };
        });
    }

    function setWinState() {
        // 1. stop timer
        pauseTimer();
        // 2. mark game as not ready for interact + as won
        setGame(prevGame => ({
            ...prevGame,
            inProgress: false,
            result: 'win',
        }));
        // 3. save result to players history
        setHistoryState(true);
        // 4. init sound effect
        setTimeout(() => {
            playSound(soundReveal);
        }, 250);
        // 5. trigger fancy mines-reveal animation
        defuseMines();
        // 6. after animation played - show results modal
        resultTimeoutRef.current = setTimeout(() => {
            switchModalHandler('result');
        }, 5000);
    }

    function setLoseState(x, y) {
        // 1. stop timer
        pauseTimer();
        // 2. mark game as not ready for interact + as won
        setGame(prevGame => ({
            ...prevGame,
            inProgress: false,
            result: 'lose',
        }));
        // 3. save result to players history
        setHistoryState(false);
        // 4. init sound effect
        playSound(soundBomb);
        // 5. trigger mines-reveal process
        revealMinesWhenLost(x, y);
        // 6. after a while - show results modal
        resultTimeoutRef.current = setTimeout(() => {
            switchModalHandler('result');
        }, 4000);
    }

    function toggleFlagOnCellHandler(col, row) {
        if (game.inProgress) {
            setGame(prevGame => {
                let increment = 1;
                const cells = prevGame.cells.map((subArr, x) => {
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
                    ...prevGame,
                    cells,
                    flaggedAmount: prevGame.flaggedAmount + increment,
                };
            });
        }
    }

    function setMines(x, y) {
        playSound(soundGameStart);
        setGame(prevGame => {
            const minesIdCollection = {};
            let minesCount = 0;

            while (minesCount < minesAmount[prevGame.difficulty]) {
                const randCol = Math.floor(Math.random() * prevGame.cols);
                const randRow = Math.floor(Math.random() * prevGame.rows);
                const mineId = `${randCol}x${randRow}`;

                if (!(mineId in minesIdCollection) && !(x - 2 < randCol && x + 2 > randCol
                    && y - 2 < randRow && y + 2 > randRow)) {
                    minesIdCollection[mineId] = true;
                    minesCount += 1;
                }
            }

            const cells = prevGame.cells.map((subArr, x) => {
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
                ...prevGame,
                cells,
            };
        });
    }

    function startGame(x, y) {
        setMines(x, y);
        setGame(prevGame => ({
            ...prevGame,
            started: true,
            inProgress: true,
        }));
        runTimer(true);
        setRevealedCellsState(x, y);
    }

    function clickOnCellHandler(col, row) {
        const cell = game.cells[col][row];

        if (!game.inProgress && game.safeCellsRevealed === 0) {
            startGame(col, row);
        } else if (game.inProgress && flagMode) {
            toggleFlagOnCellHandler(col, row);
        } else if (game.inProgress && !cell.flagged && !cell.opened && cell.mine) {
            setLoseState(col, row);
        } else if (game.inProgress) {
            setRevealedCellsState(col, row);
        }
    }

    function toggleFlagMode() {
        playSound(soundClick);
        setFlagMode(prevFlagMode => !prevFlagMode);
    }

    function changeDifficulty(difficulty) {
        const [, cols, rows] = /(\d+)x(\d+)/.exec(difficulty);

        playSound(soundClick);
        setGameLayoutMode(window.innerHeight, window.innerWidth, cols, rows);
        setGame(prevGame => ({
            ...prevGame,
            cols: parseInt(cols),
            rows: parseInt(rows),
            cells: generateCellsEmptyData(cols, rows),
            difficulty,
        }));
    }

    function setGameLayoutMode(appHeight, appWidth, colsNum, rowsNum) {
        gameLayoutModeRef.current = (appHeight < 568 && rowsNum > 9)
            ? 'game--r16-568'
            : (appWidth < 768 && colsNum > 16)
                ? 'game--c30-768'
                : (appWidth < 992 && colsNum > 16)
                    ? 'game--c30-992' : '';
        
        setGame(prevGame => ({...prevGame})); // Trigger re-render
    }

    function leaveGameHandler() {
        if (game.inProgress) {
            playSound(soundClick);
            switchModalHandler('leave-confirm');
        } else {
            enterMenuWithoutModal();
            clearTimeout(resultTimeoutRef.current);
        }
    }

    function checkIfWorkerUpdated() {
        if (window.installingWorker && updateNotifyEnabled
            && !game.inProgress && !game.started) {
            setUpdateNotifyEnabled(false);
            playSound(soundNotification);
            switchModalHandler('confirm-update');
            return true;
        }
        return false;
    }

    function checkIfGameInProgress() {
        if (game.inProgress) {
            switchBlockHandler('game');
            switchModalHandler('unfinished');
            return true;
        }
        return false;
    }

    function checkIfNewVersionInstalled() {
        if (localStorage.getItem('_hv-m-v') !== version
            || !localStorage.getItem('_hv-m-n')) {
            switchModalHandler('update');
            localStorage.removeItem('_hv-m-n');
            localStorage.setItem('_hv-m-v', version);
            return true;
        }
        return false;
    }

    // Convert resize handler
    function resizeAppBlock() {
        if (appRef.current) {
            appRef.current.style.height = `${window.innerHeight}px`;
            setGameLayoutMode(
                window.innerHeight, window.innerWidth,
                game.cols, game.rows
            );
        }
    }

    // Lifecycle effects
    useEffect(() => {
        // ComponentDidMount equivalent
        checkIfWorkerUpdated() || checkIfGameInProgress() || checkIfNewVersionInstalled();

        resizeAppBlock();
        window.addEventListener('resize', resizeAppBlock);

        setTimeout(() => {
            setLoaderState('hidden');
        }, 500);

        // ComponentWillUnmount equivalent
        return () => {
            window.removeEventListener('resize', resizeAppBlock);
            clearInterval(timerIntervalRef.current);
            clearTimeout(resultTimeoutRef.current);
        };
    }, []);

    // ComponentDidUpdate equivalent for game state
    useEffect(() => {
        const {rows, cols, safeCellsRevealed, difficulty, inProgress} = game;

        // winning scenario - all safe cells revealed
        if (rows * cols - safeCellsRevealed === minesAmount[difficulty] && inProgress) {
            setWinState();
        }

        // looking for updates
        checkIfWorkerUpdated();

        localStorage.setItem('_hv-m-g', JSON.stringify(game));
    }, [game]);

    // Render
    const minesLeft = minesAmount[game.difficulty] - game.flaggedAmount;
    const currentHistory = history[game.difficulty];

    return (
        <main
            className={`app${modalHidden ? ' app--modal-hidden' : ''}`}
            ref={appRef}>
            <div className="app__container">
                {
                    displayedBlock.includes('game', 'new-game')
                        ? <Game
                            layoutMode={gameLayoutModeRef.current}
                            started={game.started}
                            inProgress={game.inProgress}
                            cols={game.cols}
                            rows={game.rows}
                            cells={game.cells}
                            timeProceed={game.timeProceed}
                            flagMode={flagMode}
                            minesLeft={minesLeft}
                            leaveGameHandler={leaveGameHandler}
                            toggleFlagMode={toggleFlagMode}
                            clickOnCellHandler={clickOnCellHandler}
                            toggleFlagOnCellHandler={toggleFlagOnCellHandler} />
                        : displayedBlock === 'settings'
                            ? <Settings
                                sound={sound}
                                difficulty={game.difficulty}
                                history={currentHistory}
                                toggleSoundHandler={() => {
                                    playSound(soundClick);
                                    setSound(prevSound => {
                                        localStorage.setItem('_hv-m-s', prevSound ? '0' : '1');
                                        return !prevSound;
                                    });
                                }}
                                changeDifficulty={changeDifficulty}
                                returnHandler={() => {
                                    playSound(soundClick);
                                    switchBlockHandler('menu');
                                }} />
                            : displayedBlock === 'tutorial'
                                ? <Tutorial
                                    exitHandler={() => {
                                        playSound(soundClick);
                                        switchBlockHandler('menu');
                                    }} />
                                : <Menu
                                    switchBlockHandler={switchBlockHandler}
                                    clickSoundHandler={() => {playSound(soundClick)}}
                                    openSoundHandler={() => {playSound(soundGameOpen)}} />
                }
            </div>
            <RotateBlocker />
            {
                displayedModal === 'leave-confirm'
                ? <Modal
                    content={'Are you sure you want to leave to menu? Game progress will be lost.'}
                    btn1Name={'Stay'}
                    btn2Name={'Leave'}
                    btn1Action={() => {
                        playSound(soundClick);
                        switchModalHandler('');
                    }}
                    btn2Action={leaveGameConfirm}
                    hideModalHandler={() => {
                        playSound(soundClick);
                        switchModalHandler('');
                    }} />
                : displayedModal === 'unfinished'
                ? <Modal
                    content={'You have an unfinished game. Would you like to continue?'}
                    btn1Name={'Continue'}
                    btn2Name={'To Menu'}
                    btn1Action={continueGameConfirm}
                    btn2Action={leaveGameConfirm} />
                : displayedModal === 'result'
                ? <Modal
                    result={game.result}
                    timeProceed={game.timeProceed}
                    history={currentHistory}
                    btn1Name={'New Game'}
                    btn2Name={'To Menu'}
                    btn1Action={prepareNewGame}
                    btn2Action={enterMenuWithoutModal}
                    hideModalHandler={() => {
                        playSound(soundClick);
                        toggleModalVisibilityHandler(true);
                    }} />
                : displayedModal === 'update'
                ? <Modal
                    updateVersion={version}
                    btn1Name={'Confirm'}
                    btn1Action={hideUpdateNotification}
                    hideModalHandler={hideUpdateNotification} />
                : displayedModal === 'confirm-update'
                ? <Modal
                    content={'Good news! We have just updated the application! '
                        + 'To install the latest version click the button below '
                        + '(the page will reload).'}
                    btn1Name={'Update'}
                    btn2Name={'Later'}
                    btn1Action={() => {
                        playSound(soundClick);
                        window.location.reload();
                    }}
                    btn2Action={() => {
                        playSound(soundClick);
                        switchModalHandler('');
                    }}
                    hideModalHandler={() => {
                        playSound(soundClick);
                        switchModalHandler('');
                    }} />
                : null
            }
            <Loader loaderState={loaderState} />
            <button
                className="app__modal-btn"
                aria-label="Show modal window again"
                onClick={() => {
                    playSound(soundClick);
                    toggleModalVisibilityHandler(false);
                }} />
        </main>
    );
}
