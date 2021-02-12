import React from 'react';
import { GameColumn } from "../GameColumn/GameColumn";
import './GameField.css';

export const GameField = ({ cols, rows, cells }) => {
    const colsArray = Array.apply(null, {length: cols});

    return (
        <div className="game-field">
            {colsArray.map((item, index) => (
                <GameColumn
                    key={index}
                    colIndex={index}
                    rows={rows}
                    cellsCol={cells[index]} />
            ))}
        </div>
    );
};