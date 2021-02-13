import React from 'react';
import './GameCell.css';

export const GameCell = ({ colIndex, rowIndex, cell }) => {
    const { opened, mine, minesAround, flagged } = cell;

    return (
        <div className={`game-cell${opened
            ? ' game-cell--opened' : flagged
                ? ' game-cell--flagged' : ''}`}>
            <button className={`game-cell__btn ${(opened && mine)
                ? 'game-cell__btn--mine' : (opened && minesAround > 0)
                    ? `game-cell__btn--${minesAround}` : ''}`} disabled={opened} />
        </div>
    );
};