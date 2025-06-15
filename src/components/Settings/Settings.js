import React from 'react';
import { DiffSelect } from "../DiffSelect/DiffSelect";
import { DiffHistory } from "../DiffHistory/DiffHistory";
import './Settings.css';

export function Settings({
     sound,
     difficulty,
     history,
     toggleSoundHandler,
     changeDifficulty,
     returnHandler
}) {
    return (
        <section className="settings">
            <div className="settings__content">
                <button
                    className="settings__return"
                    aria-label="Return to menu"
                    onClick={returnHandler}
                    onMouseOver={() => {}} >
                    <span />
                </button>
                <h2 className="settings__title">Settings</h2>
                <button
                    className={`settings__sound${sound ? ' settings__sound--on' : ''}`}
                    onClick={toggleSoundHandler}
                    onMouseOver={() => {}} >
                    Sound {sound ? 'ON' : 'OFF'}
                </button>
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
}