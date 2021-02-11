import React from 'react';
import './GameCell.css';

export const GameCell = ({ colIndex, rowIndex }) => {
    return (
        <div className="game-cell">
            <button className="game-cell__btn" />
        </div>
    );
};