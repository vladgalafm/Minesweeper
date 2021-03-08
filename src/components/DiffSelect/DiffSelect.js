import React from 'react';
import { DiffOption } from "../DiffOption/DiffOption";
import { difficultyOptions } from "./../../data/data";
import './DiffSelect.css';

export const DiffSelect = ({
   selectedDifficulty,
   changeDifficulty
}) => {
    const onChangeHandler = (event) => {
        changeDifficulty(event.target.value);
    };

    return (
        <div className="diff-select" onChange={onChangeHandler}>
            {difficultyOptions.map(option => (
                <DiffOption
                    key={option.value}
                    {...option}
                    selected={selectedDifficulty === option.value} />
            ))}
        </div>
    );
};