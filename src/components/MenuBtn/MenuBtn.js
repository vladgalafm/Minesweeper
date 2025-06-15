import React from 'react';
import './MenuBtn.css';

export function MenuBtn({
    title,
    switchBlockHandler
}) {
    return (
        <button
            className="menu-btn"
            onClick={switchBlockHandler} >
            {title}
        </button>
    );
}