import React from 'react';
import { Result } from "../Result/Result";
import './Modal.css';

export const Modal = ({
      content,
      result,
      timeProceed,
      history,
      hideModalHandler,
      btn1Name,
      btn1Action,
      btn2Name,
      btn2Action
}) => {
    return (
        <div className="modal">
            <div className={`modal__window${!hideModalHandler ? ' modal__window--no-close' : ''}`}>
                {
                    hideModalHandler
                        ? (<button
                            className="modal__close"
                            aria-label="Close modal window"
                            onClick={hideModalHandler} />)
                        : null
                }
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