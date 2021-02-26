import React from 'react';
import { TutorialStatic } from "../TutorialStatic/TutorialStatic";
import './Tutorial.css';

export const Tutorial = ({exitHandler}) => (
    <section className="tutorial">
        <button
            className="tutorial__exit"
            aria-label="Exit tutorial"
            onClick={exitHandler} />
        <h2 className="tutorial__title">
            Tutorial
        </h2>
        <div className="tutorial__content">
            <TutorialStatic />
        </div>
    </section>
);