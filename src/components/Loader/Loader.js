import React from 'react';
import './Loader.css';

export const Loader = ({loaderState}) => (
    <div className={`loader${loaderState === 'hidden'
            ? ' loader--hidden' : ''}`}>
        <div className="loader__spinner">
            <div className="loader__spinner-inner">
                <div />
            </div>
        </div>
    </div>
);