import React from 'react';
import './DiffOption.css';

export function DiffOption({
       value,
       label,
       mines,
       selected
}) {
    return (
        <div className={`diff-option diff-option--${value}`}>
            <input className="diff-option__input"
                   type="radio"
                   value={value}
                   id={value}
                   name="difficulty"
                   defaultChecked={selected} />
            <label className="diff-option__label" htmlFor={value} >
                {label}<br/>
                {value} grid, {mines} mines
            </label>
        </div>
    );
}