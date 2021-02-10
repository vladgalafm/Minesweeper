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
        this.resizeAppBlock = this.resizeAppBlock.bind(this);
    }

    componentDidMount() {
        console.debug('App mount');
        window.addEventListener('resize', this.resizeAppBlock);
    }

    componentWillUnmount() {
        console.debug('App unmount');
        window.removeEventListener('resize', this.resizeAppBlock);
    }

    resizeAppBlock() {
        this.appRef.style.height = `${window.innerHeight}px`;
        console.debug('Window height: ', window.innerHeight);
    }

    switchBlockHandler = (displayedBlock) => {
        this.setState({
            displayedBlock,
        })
    };

    changeDifficulty = (difficulty) => {
        const [match, cols, rows] = /(\d+)x(\d+)/.exec(difficulty);

        this.setState({
            game: {
                cols: parseInt(cols),
                rows: parseInt(rows),
                difficulty,
            },
        })
    };

    toggleFlagMode = () => {
        this.setState(prevState => ({
            flagMode: !prevState.flagMode,
        }));
    };

    render() {
        const { displayedBlock, flagMode,
            game: {
                difficulty,
                timeProceed,
                cols,
                rows,
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
                                cols={cols}
                                rows={rows}
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
