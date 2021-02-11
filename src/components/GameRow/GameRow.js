import React from 'react';
import { GameCell } from "../GameCell/GameCell";
import './GameRow.css';

export const GameRow = ({ cols, rowIndex }) => {
    const colsArray = Array.apply(null, {length: cols});

    return (
        <div className="game-row">
            {colsArray.map((item, index) => (
                <GameCell key={index} rowIndex={rowIndex} colIndex={index + 1} />
            ))}
        </div>
    );
};