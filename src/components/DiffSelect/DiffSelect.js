import React from 'react';
import './DiffSelect.css';

export const DiffSelect = ({selectedDifficulty, changeDifficulty}) => {
    const options = [
        { value: '9x9', label: 'Beginner' },
        { value: '9x16', label: 'Intermediate' },
        { value: '16x16', label: 'Advanced' },
        { value: '30x16', label: 'Expert' },
    ];

    const onChangeHandler = (event) => {
        changeDifficulty(event.target.value);
    };

    return (
        <select
            className="diff-select" value={selectedDifficulty}
            onChange={onChangeHandler}>
            {options.map(option => (
                <option
                    className={`diff-select__option diff-select__option--${option.value}`}
                    key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};