import React from 'react';
import './GameCell.css';

export const GameCell = ({ colIndex, rowIndex, cell }) => {
    const { opened, mine, minesAround } = cell;

    return (
        <div className={`game-cell${opened ? ' game-cell--opened' : ''}`}>
            <button className="game-cell__btn" disabled={opened} />
        </div>
    );
};