import React from 'react';
import { GameHeader } from "../GameHeader/GameHeader";
import { GameField } from "../GameField/GameField";
import './Game.css';

export const Game = ({ cols, rows, timeProceed, flagMode, toggleFlagMode }) => {
    return (
        <div className="game">
            <GameHeader
                timeProceed={timeProceed}
                flagMode={flagMode}
                toggleFlagMode={toggleFlagMode} />
            <GameField
                cols={cols}
                rows={rows} />
        </div>
    );
};