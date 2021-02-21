import React from 'react';
import './GameCell.css';

export const GameCell = ({
     started,
     cols,
     rows,
     colIndex,
     rowIndex,
     cell,
     clickOnCellHandler,
     toggleFlagOnCellHandler
}) => {
    const { opened, mine, minesAround, flagged, defused } = cell;
    const delay = Math.max(
        Math.abs((cols + 1) / 2 - (colIndex + 1)),
        Math.abs((rows + 1) / 2 - (rowIndex + 1))
    );

    return (
        <div className={`game-cell${opened
            ? ' game-cell--opened' : flagged
                ? ' game-cell--flagged' : ''}
            ${defused ? ' game-cell--defused' : ''}
            ${!started ? ` game-cell--flashlight game-cell--flashlight-d${delay}` : ''}`} >
            <button className={`game-cell__btn ${(opened && mine)
                ? 'game-cell__btn--mine' : (opened && minesAround > 0)
                    ? `game-cell__btn--${minesAround}` : ''}`} disabled={opened}
                    onClick={clickOnCellHandler}
                    onContextMenu={toggleFlagOnCellHandler} />
        </div>
    );
};