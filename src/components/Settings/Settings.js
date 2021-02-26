import React from 'react';
import { DiffSelect } from "../DiffSelect/DiffSelect";
import { DiffHistory } from "../DiffHistory/DiffHistory";
import './Settings.css';

export const Settings = ({
     difficulty,
     history,
     changeDifficulty,
     returnHandler
}) => (
    <section className="settings">
        <div className="settings__content">
            <button
                className="settings__return"
                aria-label="Return to menu"
                onClick={returnHandler}>
                <span />
            </button>
            <h2 className="settings__title">Settings</h2>
            <p className="settings__warn">
                For more experience with other difficulty levels you can
                visit this application web page on PC.
            </p>
            <DiffSelect
                selectedDifficulty={difficulty}
                changeDifficulty={changeDifficulty} />
            <DiffHistory {...history} />
        </div>
    </section>
);