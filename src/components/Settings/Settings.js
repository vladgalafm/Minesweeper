import React from 'react';
import { DiffSelect } from "../DiffSelect/DiffSelect";
import './Settings.css';

export const Settings = ({difficulty, changeDifficulty}) => {
    return (
        <section className="settings">
            <h2 className="settings__title">Settings</h2>
            <DiffSelect
                selectedDifficulty={difficulty}
                changeDifficulty={changeDifficulty} />
        </section>
    );
};