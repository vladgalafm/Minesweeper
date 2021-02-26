import React from 'react';

export const TutorialStatic = () => (
    <>
        <div>
            <p>
                Minesweeper - is a logic game where mines are hidden in a grid of squares.
                The objective is to open all safe squares in the quickest time possible.
            </p>
            <p>
                Sounds pretty simple, right?..
            </p>
        </div>
        <div>
            <h3>
                Game board
            </h3>
            <p>
                There are two levels of difficulty available in mobile version, and three - in desktop.
            </p>
            <div>
                <p>Mobile:</p>
                <ul>
                    <li>
                        <b>Beginner:</b> 81 cells, 10 mines
                    </li>
                    <li>
                        <b>Amateur:</b> 144 cells, 20 mines
                    </li>
                </ul>
            </div>
            <div>
                <p>Desktop:</p>
                <ul>
                    <li>
                        <b>Beginner:</b> 81 cells, 10 mines
                    </li>
                    <li>
                        <b>Intermediate:</b> 256 cells, 40 mines
                    </li>
                    <li>
                        <b>Expert:</b> 480 cells, 99 mines
                    </li>
                </ul>
            </div>
            <p>
                To start a new game with another level, switch <b>Settings</b> in application menu
                and select difficulty you want.
            </p>
        </div>
        <div>
            <h3>
                Game rules
            </h3>
            <p>
                So, rules in Minesweeper are very easy:
            </p>
            <ul>
                <li>
                    Cell with mine opened - game lost.
                </li>
                <li>
                    Empty cell opened - game continues.
                </li>
                <li>
                    If cell contains a number - it shows how many mines
                    are hidden in eight cells around. This number helps determine
                    where the safe cells are.
                </li>
            </ul>
        </div>
        <div>
            <h3>
                Tips and hints
            </h3>
            <ul>
                <li>
                    <b>Mark cells with mines.</b> If a cell is supposed to contain a mine -
                    click it with the right mouse button, or hold your touch on the cell
                    for a while, if you are a smartphone or a tablet user. The cell will be
                    marked with a flag.
                </li>
                <li>
                    <b>Explore and memorise possible combinations.</b> If three cells in a row
                    contain the numbers 2-3-2, you can assume that there are three mines
                    along those cells. If a cell contains the number 8,
                    then all cells around it contain mines.
                </li>
                <li>
                    <b>Try to open up unexplored grid areas.</b> Not sure which cell to open next?
                    Try to open another part of the field. It is better to open unexplored
                    areas than those where you have a 50/50 chance to stumble upon a mine.
                </li>
            </ul>
        </div>
    </>
);