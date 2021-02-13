import React, { Component } from 'react';
import { Menu } from "./components/Menu/Menu";
import { Game } from "./components/Game/Game";
import { Settings } from "./components/Settings/Settings";
import { Tutorial } from "./components/Tutorial/Tutorial";
import { RotateBlocker } from "./components/RotateBlocker/RotateBlocker";
import './App.css';

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayedBlock: '',
            flagMode: false,
            game: {
                difficulty: '9x9',
                cols: 9,
                rows: 9,
                cells: this.generateCellsEmptyData(9, 9),
                started: false,
                finished: false,
                timeProceed: 0,
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
        this.resizeAppBlock = this.resizeAppBlock.bind(this);
    }

    componentDidMount() {
        console.debug('App mount');
        this.resizeAppBlock();
        window.addEventListener('resize', this.resizeAppBlock);
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
        this.setState({
            game: {
                cols: parseInt(cols),
                rows: parseInt(rows),
                cells: this.generateCellsEmptyData(cols, rows),
                difficulty,
            },
        })
    };

    toggleFlagMode = () => {
        this.setState(prevState => ({
            flagMode: !prevState.flagMode,
        }))
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
        const { displayedBlock, flagMode, gameLayoutMode,
            game: {
                difficulty,
                timeProceed,
                cols,
                rows,
                cells,
                started,
            }
        } = this.state;

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
                                toggleFlagMode={this.toggleFlagMode} />
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
            </main>
        );
    }
}
