import React from 'react';
import { Result } from "../Result/Result";
import './Modal.css';

export const Modal = ({
      content,
      result,
      timeProceed,
      history,
      btn1Name,
      btn1Action,
      btn2Name,
      btn2Action
}) => {
    return (
        <div className="modal">
            <div className="modal__window">
                {
                    content
                        ? (<p className="modal__txt">
                            {content}
                        </p>)
                        : <Result
                            result={result}
                            timeProceed={timeProceed}
                            history={history} />
                }
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