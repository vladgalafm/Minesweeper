import React from 'react';
import './GameHeader.css';

export function GameHeader({
   inProgress,
   timeProceed,
   flagMode,
   minesLeft,
   leaveGameHandler,
   toggleFlagMode
}) {
    return (
        <div className="game-header">
            <div className="game-header__content">
                <button
                    className="game-header__leave"
                    onClick={() => {leaveGameHandler()}} />
                <div className="game-header__info">
                    <div className="game-header__icon" />
                    <div className="game-header__count">
                        {timeProceed}
                    </div>
                </div>
                <div className="game-header__info">
                    <div className="game-header__count">
                        {minesLeft}
                    </div>
                    <div className="game-header__icon game-header__icon--bomb" />
                </div>
                <button
                    className={`game-header__flag${flagMode ? ' game-header__flag--active' : ''}`}
                    onClick={toggleFlagMode}
                    onMouseOver={() => {}}
                    disabled={!inProgress} />
            </div>
        </div>
    );
}