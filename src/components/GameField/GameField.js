import React from 'react';
import { GameColumn } from "../GameColumn/GameColumn";
import './GameField.css';

export const GameField = ({
      started,
      cols,
      rows,
      cells,
      clickOnCellHandler,
      toggleFlagOnCellHandler
}) => {
    const colsArray = Array.apply(null, {length: cols});

    return (
        <div className="game-field">
            <div className="game-field__content">
                {colsArray.map((item, index) => (
                    <GameColumn
                        key={index}
                        started={started}
                        colIndex={index}
                        cols={cols}
                        rows={rows}
                        cellsCol={cells[index]}
                        clickOnCellHandler={clickOnCellHandler}
                        toggleFlagOnCellHandler={toggleFlagOnCellHandler} />
                ))}
            </div>
        </div>
    );
};