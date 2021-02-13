import React from 'react';
import { GameHeader } from "../GameHeader/GameHeader";
import { GameField } from "../GameField/GameField";
import './Game.css';

export const Game = ({
     layoutMode,
     started,
     cols,
     rows,
     cells,
     timeProceed,
     flagMode,
     toggleFlagMode
}) => {
    return (
        <div className={`game ${layoutMode}${cols > 9 ? ' game--wide' : ''}`}>
            <GameHeader
                started={started}
                timeProceed={timeProceed}
                flagMode={flagMode}
                toggleFlagMode={toggleFlagMode} />
            <GameField
                cols={cols}
                rows={rows}
                cells={cells} />
        </div>
    );
};