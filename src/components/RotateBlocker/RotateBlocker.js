import React from 'react';
import './RotateBlocker.css';
import rotateImg from "./../../img/rotate.png";

export const RotateBlocker = () => {
    return (
        <div className="rotate-blocker">
            <img src={rotateImg} alt=""/>
            <p className="rotate-blocker__alert">
                To allow application work properly,<br/>
                please, rotate your screen<br/>
                to a portrait orientation
            </p>
        </div>
    );
};