import React from 'react';
import './DiffOption.css';

export const DiffOption = ({value, label, mines, selected}) => (
    <div className={`diff-option diff-option--${value}`}>
        <input className="diff-option__input"
               type="radio"
               value={value}
               id={value}
               name="difficulty"
               defaultChecked={selected} />
        <label className="diff-option__label"
               htmlFor={value}>
            {label}<br/>
            {value} field, {mines} mines
        </label>
    </div>
);