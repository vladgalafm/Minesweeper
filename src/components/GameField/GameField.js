import React from 'react';
import './GameField.css';

export const GameField = ({ cols, rows }) => {
    const colsArray = Array.apply(null, {length: cols});
    const rowsArray = Array.apply(null, {length: rows});

    return (
        <div className="game-field">

        </div>
    );
};