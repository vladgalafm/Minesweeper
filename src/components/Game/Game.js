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
     minesLeft,
     toggleFlagMode,
     clickOnCellHandler,
     toggleFlagOnCellHandler
}) => {
    return (
        <div className={`game ${layoutMode}${cols > 9 ? ' game--wide' : ''}`}>
            <GameHeader
                started={started}
                timeProceed={timeProceed}
                flagMode={flagMode}
                minesLeft={minesLeft}
                toggleFlagMode={toggleFlagMode} />
            <GameField
                cols={cols}
                rows={rows}
                cells={cells}
                clickOnCellHandler={clickOnCellHandler}
                toggleFlagOnCellHandler={toggleFlagOnCellHandler} />
        </div>
    );
};