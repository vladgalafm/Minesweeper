import React from 'react';
import './MenuBtn.css';

export const MenuBtn = ({
    title,
    switchBlockHandler
}) => (
    <button
        className="menu-btn"
        onClick={switchBlockHandler} >
        {title}
    </button>
);