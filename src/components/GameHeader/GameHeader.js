import React from 'react';
import './GameHeader.css';

export const GameHeader = ({ timeProceed, flagMode, toggleFlagMode }) => {
    return (
        <div className="game-header">
            <button className="game-header__leave">X</button>
            <div className="game-header__time">
                {timeProceed}
            </div>
            <button
                className={`game-header__flag${flagMode ? ' game-header__flag--active' : ''}`}
                onClick={toggleFlagMode}>
                P
            </button>
        </div>
    );
};