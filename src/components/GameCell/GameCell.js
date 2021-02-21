import React from 'react';
import './GameCell.css';

export const GameCell = ({
     colIndex,
     rowIndex,
     cell,
     clickOnCellHandler,
     toggleFlagOnCellHandler
}) => {
    const { opened, mine, minesAround, flagged, defused } = cell;

    return (
        <div className={`game-cell${opened
            ? ' game-cell--opened' : flagged
                ? ' game-cell--flagged' : ''}${defused ? ' game-cell--defused' : ''}`}>
            <button className={`game-cell__btn ${(opened && mine)
                ? 'game-cell__btn--mine' : (opened && minesAround > 0)
                    ? `game-cell__btn--${minesAround}` : ''}`} disabled={opened}
                    onClick={clickOnCellHandler}
                    onContextMenu={toggleFlagOnCellHandler} />
        </div>
    );
};