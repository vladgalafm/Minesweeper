import React from 'react';
import './Modal.css';

export const Modal = ({
      text,
      btn1Name,
      btn1Action,
      btn2Name,
      btn2Action
}) => {
    return (
        <div className="modal">
            <div className="modal__window">
                <p className="modal__txt">
                    {text}
                </p>
                <div className="modal__btn-wrap">
                    <button className="modal__btn" onClick={btn1Action}>
                        {btn1Name}
                    </button>
                    <button className="modal__btn" onClick={btn2Action}>
                        {btn2Name}
                    </button>
                </div>
            </div>
        </div>
    );
};