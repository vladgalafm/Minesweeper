import React from 'react';
import './Menu.css';
import {MenuBtn} from "../MenuBtn/MenuBtn";

export function Menu({
     switchBlockHandler,
     clickSoundHandler,
     openSoundHandler
}) {
    return (
        <section className="menu">
            <h1 className="menu__title">
                Minesweeper
            </h1>
            <div className="menu__btn-wrap">
                <MenuBtn
                    title="New game"
                    switchBlockHandler={() => {
                        clickSoundHandler();
                        switchBlockHandler('new-game');
                        openSoundHandler();
                    }} />
                <MenuBtn
                    title="Settings"
                    switchBlockHandler={() => {
                        clickSoundHandler();
                        switchBlockHandler('settings');
                    }} />
                <MenuBtn
                    title="Tutorial"
                    switchBlockHandler={() => {
                        clickSoundHandler();
                        switchBlockHandler('tutorial');
                    }} />
            </div>
        </section>
    );
}