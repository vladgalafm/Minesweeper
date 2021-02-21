import React from 'react';
import { GameHeader } from "../GameHeader/GameHeader";
import { GameField } from "../GameField/GameField";
import './Game.css';

export const Game = ({
     layoutMode,
     started,
     inProgress,
     cols,
     rows,
     cells,
     timeProceed,
     flagMode,
     minesLeft,
     leaveGameHandler,
     toggleFlagMode,
     clickOnCellHandler,
     toggleFlagOnCellHandler
}) => {
    return (
        <div className={`game ${layoutMode}${cols > 9 ? ' game--wide' : ''}`}>
            <GameHeader
                inProgress={inProgress}
                timeProceed={timeProceed}
                flagMode={flagMode}
                minesLeft={minesLeft}
                leaveGameHandler={leaveGameHandler}
                toggleFlagMode={toggleFlagMode} />
            <GameField
                started={started}
                cols={cols}
                rows={rows}
                cells={cells}
                clickOnCellHandler={clickOnCellHandler}
                toggleFlagOnCellHandler={toggleFlagOnCellHandler} />
        </div>
    );
};