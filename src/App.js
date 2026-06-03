import React, { useState, useEffect, useRef } from 'react';

import { Menu } from './components/Menu/Menu';
import { Game } from './components/Game/Game';
import { Settings } from './components/Settings/Settings';
import { Tutorial } from './components/Tutorial/Tutorial';
import { RotateBlocker } from './components/RotateBlocker/RotateBlocker';
import { Modal } from './components/Modal/Modal';
import { Loader } from './components/Loader/Loader';

import { gameTemplate, historyTemplate, minesAmount, cellTemplate } from './data/data';
import {
    APP_VERSION,
    STORAGE_KEY_SOUND,
    STORAGE_KEY_VERSION,
    STORAGE_KEY_GAME,
    STORAGE_KEY_HISTORY,
    STORAGE_KEY_NOTIFICATION,
    DEFAULT_GRID_SIZE,
    MINE_EXCLUSION_ZONE,
    LAYOUT_HEIGHT_SM,
    LAYOUT_WIDTH_MD,
    LAYOUT_WIDTH_LG,
    LAYOUT_COLS_THRESHOLD,
    TIMER_INTERVAL_MS,
    SOUND_REVEAL_DELAY_MS,
    WIN_RESULT_DELAY_MS,
    LOSE_RESULT_DELAY_MS,
    LOADER_HIDE_DELAY_MS,
} from './constants';

import soundClick from './sound/click.mp3';
import soundBomb from './sound/bomb2.mp3';
import soundReveal from './sound/reveal.mp3';
import soundNotification from './sound/update_notify.mp3';
import soundGameOpen from './sound/game_open.mp3';
import soundGameStart from './sound/game_start.mp3';

import './App.css';

// Helper function defined outside the component to avoid initialization issues
function generateCellsEmptyData( colsNum, rowsNum ) {
    const cellsArr = [];

    for ( let i = 0; i < colsNum; i++ ) {
        const colArr = [];

        for ( let j = 0; j < rowsNum; j++ ) {
            colArr.push( cellTemplate );
        }

        cellsArr.push( colArr );
    }

    return cellsArr;
}

// eslint-disable-next-line max-lines-per-function
export function App() {
    // Convert class state to useState hooks
    const [
        sound,
        setSound,
    ] = useState( localStorage.getItem( STORAGE_KEY_SOUND ) ?
        Boolean( parseInt( localStorage.getItem( STORAGE_KEY_SOUND ) ) ) :
        true );
    const [
        loaderState,
        setLoaderState,
    ] = useState( 'visible' );
    const [
        updateNotifyEnabled,
        setUpdateNotifyEnabled,
    ] = useState( true );
    const [
        modalHidden,
        setModalHidden,
    ] = useState( false );
    const [
        displayedBlock,
        setDisplayedBlock,
    ] = useState( '' );
    const [
        displayedModal,
        setDisplayedModal,
    ] = useState( '' );
    const [
        flagMode,
        setFlagMode,
    ] = useState( false );

    // Use a lazy initializer function for game state to avoid timing issues
    const [
        game,
        setGame,
    ] = useState( () => ( ( localStorage.getItem( STORAGE_KEY_VERSION ) === APP_VERSION ) ?
        ( JSON.parse( localStorage.getItem( STORAGE_KEY_GAME ) ) || gameTemplate( generateCellsEmptyData( DEFAULT_GRID_SIZE, DEFAULT_GRID_SIZE ) ) ) :
        gameTemplate( generateCellsEmptyData( DEFAULT_GRID_SIZE, DEFAULT_GRID_SIZE ) ) ) );

    const [
        history,
        setHistory,
    ] = useState( JSON.parse(
        localStorage.getItem( STORAGE_KEY_HISTORY ),
        ( key, value ) => ( value === null ?
            Infinity :
            value ),
    ) || {
        '9x9': historyTemplate,
    } );

    // Convert class instance variables to refs
    const gameLayoutModeRef = useRef( '' );
    const timerIntervalRef = useRef( null );
    const resultTimeoutRef = useRef( null );
    const appRef = useRef( null );

    // Helper functions - converted from useCallback to regular functions
    function playSound( file, force ) {
        if ( ( typeof force === 'undefined' && sound ) || force ) {
            const audio = new Audio( file );

            audio.play();
        }
    }

    function switchModalHandler( newDisplayedModal ) {
        setDisplayedModal( newDisplayedModal );
    }

    function toggleModalVisibilityHandler( hide ) {
        setModalHidden( hide );
    }

    function switchBlockHandler( newDisplayedBlock ) {
        if ( newDisplayedBlock === 'new-game' ) {
            // reset data only if 'New Game' triggered
            resetGameData();
        }

        setDisplayedBlock( newDisplayedBlock );
    }

    function resetGameData() {
        setGame( ( prevGame ) => ( {
            ...prevGame,
            cells: generateCellsEmptyData( prevGame.cols, prevGame.rows ),
            started: false,
            inProgress: false,
            timeProceed: 0,
            flaggedAmount: 0,
            safeCellsRevealed: 0,
            result: null,
        } ) );
    }

    function enterMenuWithoutModal() {
        playSound( soundClick );
        switchBlockHandler( 'menu' );
        switchModalHandler( '' );
        toggleModalVisibilityHandler( false );
    }

    function setHistoryState( gameWon ) {
        setHistory( ( prevHistory ) => {
            const levelData = prevHistory[ game.difficulty ] || historyTemplate;
            const newLevelData = {
                bestTime: ( gameWon && game.timeProceed < levelData.bestTime ) ?
                    game.timeProceed :
                    levelData.bestTime,
                gamesPlayed: levelData.gamesPlayed + 1,
                gamesWon: gameWon ?
                    levelData.gamesWon + 1 :
                    levelData.gamesWon,
                longestWinStreak: ( gameWon && levelData.longestWinStreak === levelData.currentWinStreak ) ?
                    levelData.longestWinStreak + 1 :
                    levelData.longestWinStreak,
                longestLoseStreak: ( ! gameWon && levelData.longestLoseStreak === levelData.currentLoseStreak ) ?
                    levelData.longestLoseStreak + 1 :
                    levelData.longestLoseStreak,
                currentWinStreak: gameWon ?
                    levelData.currentWinStreak + 1 :
                    0,
                currentLoseStreak: gameWon ?
                    0 :
                    levelData.currentLoseStreak + 1,
            };
            const updatedHistory = {
                ...prevHistory,
                [ game.difficulty ]: newLevelData,
            };

            localStorage.setItem( STORAGE_KEY_HISTORY, JSON.stringify( updatedHistory ) );

            return updatedHistory;
        } );
    }

    function hideUpdateNotification() {
        playSound( soundClick );
        switchModalHandler( '' );
        localStorage.setItem( STORAGE_KEY_NOTIFICATION, 'seen' );
    }

    function leaveGameConfirm() {
        enterMenuWithoutModal();
        setHistoryState( false );
        setGame( ( prevGame ) => ( {
            ...prevGame,
            inProgress: false,
        } ) );
        clearInterval( timerIntervalRef.current );
        clearTimeout( resultTimeoutRef.current );
    }

    function initTimer() {
        timerIntervalRef.current = setInterval( () => {
            setGame( ( prevGame ) => ( {
                ...prevGame,
                timeProceed: prevGame.timeProceed + 1,
            } ) );
        }, TIMER_INTERVAL_MS );
    }

    function pauseTimer() {
        window.removeEventListener( 'blur', pauseTimer );
        window.addEventListener( 'focus', runTimer );

        clearInterval( timerIntervalRef.current );
    }

    function runTimer( force ) {
        window.removeEventListener( 'focus', runTimer );
        window.addEventListener( 'blur', pauseTimer );

        if ( force === true || game.inProgress ) {
            initTimer();
        }
    }

    function continueGameConfirm() {
        playSound( soundClick );
        switchModalHandler( '' );
        runTimer();
    }

    function prepareNewGame() {
        resetGameData();
        switchModalHandler( '' );
        playSound( soundGameOpen );
    }

    function countMinesAround( cells, x, y ) {
        let count = 0;

        for ( let i = -1; i < MINE_EXCLUSION_ZONE; i++ ) {
            if ( cells[ x + i ] ) {
                for ( let j = -1; j < MINE_EXCLUSION_ZONE; j++ ) {
                    if ( cells[ x + i ][ y + j ] && cells[ x + i ][ y + j ].mine ) {
                        count += 1;
                    }
                }
            }
        }

        return count;
    }

    function revealCell( gameState, x, y ) {
        let updatedGameState = {
            ...gameState,
        };
        let cells = [ ...updatedGameState.cells ];

        if ( cells[ x ] && cells[ x ][ y ] && ! cells[ x ][ y ].opened && ! cells[ x ][ y ].flagged ) {
            cells[ x ][ y ] = {
                ...cells[ x ][ y ],
                opened: true,
            };

            updatedGameState = {
                ...updatedGameState,
                cells,
            };

            const minesAround = countMinesAround( cells, x, y );

            if ( minesAround === 0 ) {
                return {
                    ...revealCell( updatedGameState, x - 1, y - 1 ),
                    ...revealCell( updatedGameState, x, y - 1 ),
                    ...revealCell( updatedGameState, x + 1, y - 1 ),
                    ...revealCell( updatedGameState, x - 1, y ),
                    ...revealCell( updatedGameState, x + 1, y ),
                    ...revealCell( updatedGameState, x - 1, y + 1 ),
                    ...revealCell( updatedGameState, x, y + 1 ),
                    ...revealCell( updatedGameState, x + 1, y + 1 ),
                };
            }

            cells = [ ...updatedGameState.cells ];
            cells[ x ][ y ] = {
                ...cells[ x ][ y ],
                minesAround,
            };

            return {
                ...updatedGameState,
                cells,
            };
        }

        return gameState;
    }

    function setRevealedCellsState( col, row ) {
        setGame( ( prevGame ) => {
            const updatedGame = revealCell( {
                ...prevGame,
            }, col, row );
            const safeCellsRevealed = updatedGame.cells
                .flat()
                .filter( ( cell ) => cell.opened && ! cell.mine )
                .length;

            return {
                ...updatedGame,
                safeCellsRevealed,
            };
        } );
    }

    function defuseMines() {
        function transformDefusedCell( cell ) {
            if ( cell.mine ) {
                return {
                    ...cell,
                    opened: true,
                    defused: true,
                };
            }

            return cell;
        }

        setGame( ( prevGame ) => {
            const cells = prevGame.cells.map( ( subArr ) => subArr.map( transformDefusedCell ) );

            return {
                ...prevGame,
                cells,
            };
        } );
    }

    function revealMinesWhenLost( col, row ) {
        function transformRevealedRow( subArr, x ) {
            return subArr.map( ( cell, y ) => {
                if ( col === x && row === y ) {
                    return {
                        ...cell,
                        opened: true,
                        blownUp: true,
                    };
                }
                else if ( cell.mine ) {
                    return {
                        ...cell,
                        opened: true,
                        rightFlagged: true,
                    };
                }
                else if ( cell.flagged && ! cell.mine ) {
                    return {
                        ...cell,
                        opened: true,
                        wrongFlagged: true,
                    };
                }

                return cell;
            } );
        }

        setGame( ( prevGame ) => {
            const cells = prevGame.cells.map( transformRevealedRow );

            return {
                ...prevGame,
                cells,
            };
        } );
    }

    function setWinState() {
        // 1. stop timer
        pauseTimer();
        // 2. mark game as not ready for interact + as won
        setGame( ( prevGame ) => ( {
            ...prevGame,
            inProgress: false,
            result: 'win',
        } ) );
        // 3. save result to players history
        setHistoryState( true );
        // 4. init sound effect
        setTimeout( () => {
            playSound( soundReveal );
        }, SOUND_REVEAL_DELAY_MS );
        // 5. trigger fancy mines-reveal animation
        defuseMines();
        // 6. after animation played - show results modal
        resultTimeoutRef.current = setTimeout( () => {
            switchModalHandler( 'result' );
        }, WIN_RESULT_DELAY_MS );
    }

    function setLoseState( x, y ) {
        // 1. stop timer
        pauseTimer();
        // 2. mark game as not ready for interact + as won
        setGame( ( prevGame ) => ( {
            ...prevGame,
            inProgress: false,
            result: 'lose',
        } ) );
        // 3. save result to players history
        setHistoryState( false );
        // 4. init sound effect
        playSound( soundBomb );
        // 5. trigger mines-reveal process
        revealMinesWhenLost( x, y );
        // 6. after a while - show results modal
        resultTimeoutRef.current = setTimeout( () => {
            switchModalHandler( 'result' );
        }, LOSE_RESULT_DELAY_MS );
    }

    function toggleFlagOnCellHandler( col, row ) {
        if ( game.inProgress ) {
            setGame( ( prevGame ) => {
                const increment = prevGame.cells[ col ][ row ].flagged ?
                    -1 :
                    1;

                function transformFlaggedRow( subArr, x ) {
                    return subArr.map( ( cell, y ) => {
                        if ( col === x && row === y ) {
                            return {
                                ...cell,
                                flagged: ! cell.flagged,
                            };
                        }

                        return cell;
                    } );
                }

                const cells = prevGame.cells.map( transformFlaggedRow );

                return {
                    ...prevGame,
                    cells,
                    flaggedAmount: prevGame.flaggedAmount + increment,
                };
            } );
        }
    }

    function setMines( x, y ) {
        playSound( soundGameStart );
        setGame( ( prevGame ) => {
            const minesIdCollection = {};
            let minesCount = 0;

            while ( minesCount < minesAmount[ prevGame.difficulty ] ) {
                const randCol = Math.floor( Math.random() * prevGame.cols );
                const randRow = Math.floor( Math.random() * prevGame.rows );
                const mineId = `${ randCol }x${ randRow }`;

                if ( ! ( mineId in minesIdCollection ) && ! ( x - MINE_EXCLUSION_ZONE < randCol && x + MINE_EXCLUSION_ZONE > randCol &&
                    y - MINE_EXCLUSION_ZONE < randRow && y + MINE_EXCLUSION_ZONE > randRow ) ) {
                    minesIdCollection[ mineId ] = true;
                    minesCount += 1;
                }
            }

            function transformMineRow( subArr, colIdx ) {
                return subArr.map( ( cell, rowIdx ) => {
                    if ( `${ colIdx }x${ rowIdx }` in minesIdCollection ) {
                        return {
                            ...cell,
                            mine: true,
                        };
                    }

                    return cell;
                } );
            }

            const cells = prevGame.cells.map( transformMineRow );

            return {
                ...prevGame,
                cells,
            };
        } );
    }

    function startGame( x, y ) {
        setMines( x, y );
        setGame( ( prevGame ) => ( {
            ...prevGame,
            started: true,
            inProgress: true,
        } ) );
        runTimer( true );
        setRevealedCellsState( x, y );
    }

    function clickOnCellHandler( col, row ) {
        const cell = game.cells[ col ][ row ];

        if ( ! game.inProgress && game.safeCellsRevealed === 0 ) {
            startGame( col, row );
        }
        else if ( game.inProgress && flagMode ) {
            toggleFlagOnCellHandler( col, row );
        }
        else if ( game.inProgress && ! cell.flagged && ! cell.opened && cell.mine ) {
            setLoseState( col, row );
        }
        else if ( game.inProgress ) {
            setRevealedCellsState( col, row );
        }
    }

    function toggleFlagMode() {
        playSound( soundClick );
        setFlagMode( ( prevFlagMode ) => ! prevFlagMode );
    }

    function changeDifficulty( difficulty ) {
        const [
            , cols,
            rows,
        ] = /(\d+)x(\d+)/u.exec( difficulty );

        playSound( soundClick );
        setGameLayoutMode( window.innerHeight, window.innerWidth, cols, rows );
        setGame( ( prevGame ) => ( {
            ...prevGame,
            cols: parseInt( cols ),
            rows: parseInt( rows ),
            cells: generateCellsEmptyData( cols, rows ),
            difficulty,
        } ) );
    }

    function setGameLayoutMode( appHeight, appWidth, colsNum, rowsNum ) {
        let layoutMode = '';

        if ( appHeight < LAYOUT_HEIGHT_SM && rowsNum > DEFAULT_GRID_SIZE ) {
            layoutMode = 'game--r16-568';
        }
        else if ( appWidth < LAYOUT_WIDTH_MD && colsNum > LAYOUT_COLS_THRESHOLD ) {
            layoutMode = 'game--c30-768';
        }
        else if ( appWidth < LAYOUT_WIDTH_LG && colsNum > LAYOUT_COLS_THRESHOLD ) {
            layoutMode = 'game--c30-992';
        }

        gameLayoutModeRef.current = layoutMode;
        setGame( ( prevGame ) => ( {
            ...prevGame,
        } ) ); // Trigger re-render
    }

    function leaveGameHandler() {
        if ( game.inProgress ) {
            playSound( soundClick );
            switchModalHandler( 'leave-confirm' );
        }
        else {
            enterMenuWithoutModal();
            clearTimeout( resultTimeoutRef.current );
        }
    }

    function checkIfWorkerUpdated() {
        if ( window.installingWorker && updateNotifyEnabled &&
            ! game.inProgress && ! game.started ) {
            setUpdateNotifyEnabled( false );
            playSound( soundNotification );
            switchModalHandler( 'confirm-update' );

            return true;
        }

        return false;
    }

    function checkIfGameInProgress() {
        if ( game.inProgress ) {
            switchBlockHandler( 'game' );
            switchModalHandler( 'unfinished' );

            return true;
        }

        return false;
    }

    function checkIfNewVersionInstalled() {
        if ( localStorage.getItem( STORAGE_KEY_VERSION ) !== APP_VERSION ||
            ! localStorage.getItem( STORAGE_KEY_NOTIFICATION ) ) {
            switchModalHandler( 'update' );
            localStorage.removeItem( STORAGE_KEY_NOTIFICATION );
            localStorage.setItem( STORAGE_KEY_VERSION, APP_VERSION );

            return true;
        }

        return false;
    }

    // Convert resize handler
    function resizeAppBlock() {
        if ( appRef.current ) {
            appRef.current.style.height = `${ window.innerHeight }px`;
            setGameLayoutMode(
                window.innerHeight, window.innerWidth,
                game.cols, game.rows,
            );
        }
    }

    // Lifecycle effects
    useEffect( () => {
        // ComponentDidMount equivalent
        if ( ! checkIfWorkerUpdated() && ! checkIfGameInProgress() ) {
            checkIfNewVersionInstalled();
        }

        resizeAppBlock();
        window.addEventListener( 'resize', resizeAppBlock );

        setTimeout( () => {
            setLoaderState( 'hidden' );
        }, LOADER_HIDE_DELAY_MS );

        // ComponentWillUnmount equivalent
        return () => {
            window.removeEventListener( 'resize', resizeAppBlock );
            clearInterval( timerIntervalRef.current );
            clearTimeout( resultTimeoutRef.current );
        };
    }, [] );

    // ComponentDidUpdate equivalent for game state
    useEffect( () => {
        const { rows, cols, safeCellsRevealed, difficulty, inProgress } = game;

        // winning scenario - all safe cells revealed
        if ( ( rows * cols ) - safeCellsRevealed === minesAmount[ difficulty ] && inProgress ) {
            setWinState();
        }

        // looking for updates
        checkIfWorkerUpdated();

        localStorage.setItem( STORAGE_KEY_GAME, JSON.stringify( game ) );
    }, [ game ] );

    // Render
    const minesLeft = minesAmount[ game.difficulty ] - game.flaggedAmount;
    const currentHistory = history[ game.difficulty ];

    function renderContentBlock() {
        if ( displayedBlock.includes( 'game', 'new-game' ) ) {
            return (
                <Game
                    layoutMode={ gameLayoutModeRef.current }
                    started={ game.started }
                    inProgress={ game.inProgress }
                    cols={ game.cols }
                    rows={ game.rows }
                    cells={ game.cells }
                    timeProceed={ game.timeProceed }
                    flagMode={ flagMode }
                    minesLeft={ minesLeft }
                    leaveGameHandler={ leaveGameHandler }
                    toggleFlagMode={ toggleFlagMode }
                    clickOnCellHandler={ clickOnCellHandler }
                    toggleFlagOnCellHandler={ toggleFlagOnCellHandler }
                />
            );
        }

        if ( displayedBlock === 'settings' ) {
            return (
                <Settings
                    sound={ sound }
                    difficulty={ game.difficulty }
                    history={ currentHistory }
                    toggleSoundHandler={ () => {
                        playSound( soundClick );
                        setSound( ( prevSound ) => {
                            localStorage.setItem( STORAGE_KEY_SOUND, prevSound ?
                                '0' :
                                '1' );

                            return ! prevSound;
                        } );
                    } }
                    changeDifficulty={ changeDifficulty }
                    returnHandler={ () => {
                        playSound( soundClick );
                        switchBlockHandler( 'menu' );
                    } }
                />
            );
        }

        if ( displayedBlock === 'tutorial' ) {
            return (
                <Tutorial
                    exitHandler={ () => {
                        playSound( soundClick );
                        switchBlockHandler( 'menu' );
                    } }
                />
            );
        }

        return (
            <Menu
                switchBlockHandler={ switchBlockHandler }
                clickSoundHandler={ () => {
                    playSound( soundClick );
                } }
                openSoundHandler={ () => {
                    playSound( soundGameOpen );
                } }
            />
        );
    }

    function renderModal() {
        if ( displayedModal === 'leave-confirm' ) {
            return (
                <Modal
                    content={ 'Are you sure you want to leave to menu? Game progress will be lost.' }
                    btn1Name={ 'Stay' }
                    btn2Name={ 'Leave' }
                    btn1Action={ () => {
                        playSound( soundClick );
                        switchModalHandler( '' );
                    } }
                    btn2Action={ leaveGameConfirm }
                    hideModalHandler={ () => {
                        playSound( soundClick );
                        switchModalHandler( '' );
                    } }
                />
            );
        }

        if ( displayedModal === 'unfinished' ) {
            return (
                <Modal
                    content={ 'You have an unfinished game. Would you like to continue?' }
                    btn1Name={ 'Continue' }
                    btn2Name={ 'To Menu' }
                    btn1Action={ continueGameConfirm }
                    btn2Action={ leaveGameConfirm }
                />
            );
        }

        if ( displayedModal === 'result' ) {
            return (
                <Modal
                    result={ game.result }
                    timeProceed={ game.timeProceed }
                    history={ currentHistory }
                    btn1Name={ 'New Game' }
                    btn2Name={ 'To Menu' }
                    btn1Action={ prepareNewGame }
                    btn2Action={ enterMenuWithoutModal }
                    hideModalHandler={ () => {
                        playSound( soundClick );
                        toggleModalVisibilityHandler( true );
                    } }
                />
            );
        }

        if ( displayedModal === 'update' ) {
            return (
                <Modal
                    updateVersion={ APP_VERSION }
                    btn1Name={ 'Confirm' }
                    btn1Action={ hideUpdateNotification }
                    hideModalHandler={ hideUpdateNotification }
                />
            );
        }

        if ( displayedModal === 'confirm-update' ) {
            return (
                <Modal
                    content={ 'Good news! We have just updated the application! ' +
                        'To install the latest version click the button below ' +
                        '(the page will reload).' }
                    btn1Name={ 'Update' }
                    btn2Name={ 'Later' }
                    btn1Action={ () => {
                        playSound( soundClick );
                        window.location.reload();
                    } }
                    btn2Action={ () => {
                        playSound( soundClick );
                        switchModalHandler( '' );
                    } }
                    hideModalHandler={ () => {
                        playSound( soundClick );
                        switchModalHandler( '' );
                    } }
                />
            );
        }

        return null;
    }

    return (
        <main
            className={ `app${ modalHidden ?
                ' app--modal-hidden' :
                '' }` }
            ref={ appRef }
        >
            <div className='app__container'>
                { renderContentBlock() }
            </div>
            <RotateBlocker />
            { renderModal() }
            <Loader loaderState={ loaderState } />
            <button
                className='app__modal-btn'
                aria-label='Show modal window again'
                onClick={ () => {
                    playSound( soundClick );
                    toggleModalVisibilityHandler( false );
                } }
            />
        </main>
    );
}
