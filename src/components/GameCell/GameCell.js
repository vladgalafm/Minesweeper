import React from 'react';
import './GameCell.css';

export function GameCell({
     started,
     colIndex,
     rowIndex,
     cell,
     clickOnCellHandler,
     toggleFlagOnCellHandler
}) {
    const {
        opened,
        mine,
        minesAround,
        flagged,
        defused,
        blownUp,
        rightFlagged,
        wrongFlagged
    } = cell;
    const maxIndex = Math.max(colIndex + 1, rowIndex + 1);
    const delay = maxIndex + Math.min(colIndex + 1, rowIndex + 1);
    const style = {
        animationDelay: `${delay * 0.008}s`,
    };

    return (
        <div className={`game-cell${opened ? ' game-cell--opened' : ''}
            ${flagged ? ' game-cell--flagged' : ''}
            ${defused ? ' game-cell--defused' : ''}
            ${blownUp ? ' game-cell--blown-up' : rightFlagged
                ? ' game-cell--right-flagged' : wrongFlagged
                ? ' game-cell--wrong-flagged' : ''}
            ${!started ? ` game-cell--flashlight` : ''}`}
             style={(!started && style) || {}}
             onContextMenu={(e) => {e.preventDefault()}} >
            <button className={`game-cell__btn ${(opened && mine)
                ? 'game-cell__btn--mine' : (opened && minesAround > 0)
                    ? `game-cell__btn--${minesAround}` : ''}`} disabled={opened}
                    onClick={clickOnCellHandler}
                    onContextMenu={toggleFlagOnCellHandler} />
        </div>
    );
}