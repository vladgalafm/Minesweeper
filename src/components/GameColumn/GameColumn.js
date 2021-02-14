import React from 'react';
import { GameCell } from "../GameCell/GameCell";
import './GameColumn.css';

export const GameColumn = ({
       rows,
       colIndex,
       cellsCol,
       clickOnCellHandler,
       toggleFlagOnCellHandler
}) => {
    const rowsArray = Array.apply(null, {length: rows});

    return (
        <div className="game-column">
            {rowsArray.map((item, index) => (
                <GameCell
                    key={index}
                    colIndex={colIndex}
                    rowIndex={index}
                    cell={cellsCol[index]}
                    clickOnCellHandler={() => clickOnCellHandler(colIndex, index)}
                    toggleFlagOnCellHandler={(e) => {
                        e.preventDefault();
                        toggleFlagOnCellHandler(colIndex, index)
                    }} />
            ))}
        </div>
    );
};