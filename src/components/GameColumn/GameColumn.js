import React from 'react';
import { GameCell } from "../GameCell/GameCell";
import './GameColumn.css';

export const GameColumn = ({ rows, colIndex, cellsCol }) => {
    const rowsArray = Array.apply(null, {length: rows});

    return (
        <div className="game-column">
            {rowsArray.map((item, index) => (
                <GameCell
                    key={index}
                    colIndex={colIndex}
                    rowIndex={index}
                    cell={cellsCol[index]} />
            ))}
        </div>
    );
};