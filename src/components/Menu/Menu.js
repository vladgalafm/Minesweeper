import React from 'react';
import './Menu.css';
import {MenuBtn} from "../MenuBtn/MenuBtn";

export const Menu = ({switchBlockHandler}) => {
    return (
        <section className="menu">
            <h1 className="menu__title">
                Minesweeper
            </h1>
            <div className="menu__btn-wrap">
                <MenuBtn
                  title="New game"
                  switchBlockHandler={() => {switchBlockHandler('new-game')}} />
                <MenuBtn
                  title="Settings"
                  switchBlockHandler={() => {switchBlockHandler('settings')}} />
                <MenuBtn
                  title="Tutorial"
                  switchBlockHandler={() => {switchBlockHandler('tutorial')}} />
            </div>
        </section>
    );
};