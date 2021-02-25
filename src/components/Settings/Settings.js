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
            <DiffSelect
                selectedDifficulty={difficulty}
                changeDifficulty={changeDifficulty} />
            <DiffHistory {...history} />
        </div>
    </section>
);