import React from 'react';
import { GameRow } from "../GameRow/GameRow";
import './GameField.css';

export const GameField = ({ cols, rows }) => {
    const rowsArray = Array.apply(null, {length: rows});

    return (
        <div className="game-field">
            {rowsArray.map((item, index) => (
                <GameRow key={index} rowIndex={index + 1} cols={cols} />
            ))}
        </div>
    );
};