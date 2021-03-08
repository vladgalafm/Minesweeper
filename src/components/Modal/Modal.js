import React from 'react';
import { Result } from "../Result/Result";
import { UpdateStatic } from "../UpdateStatic/UpdateStatic";
import './Modal.css';

export const Modal = ({
      content,
      updateVersion,
      result,
      timeProceed,
      history,
      hideModalHandler,
      btn1Name,
      btn1Action,
      btn2Name,
      btn2Action
}) => (
    <div className="modal">
        <div className={`modal__window${!hideModalHandler ? ' modal__window--no-close' : ''}`
            + `${updateVersion ? ' modal__window--update' : ''}`}>
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
                    : updateVersion
                    ? <UpdateStatic version={updateVersion} />
                    : <Result
                        result={result}
                        timeProceed={timeProceed}
                        history={history} />
            }
            {
                btn1Name && btn1Action
                    ? (<div className="modal__btn-wrap">
                        <button
                            className="modal__btn"
                            onClick={btn1Action} >
                            {btn1Name}
                        </button>
                        {
                            btn2Name && btn2Action
                                ? (<button
                                    className="modal__btn"
                                    onClick={btn2Action} >
                                    {btn2Name}
                                </button>)
                                : null
                        }
                    </div>)
                    : null
            }
        </div>
    </div>
);