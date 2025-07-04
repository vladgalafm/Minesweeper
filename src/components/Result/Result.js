import React from 'react';
import './Result.css';

export function Result({
   result,
   timeProceed,
   history
}) {
    const date = new Date();
    const day = date.getDate() > 9
        ? date.getDate()
        : `0${date.getDate()}`;
    const month = (date.getMonth() + 1) > 9
        ? date.getMonth() + 1
        : `0${date.getMonth() + 1}`;
    const {bestTime, gamesPlayed, gamesWon} = history;

    return (
        <div className="result">
            <p>
                {
                    result === 'win'
                        ? 'Congratulations, you won!'
                        : (<span>Sorry, you lost this game.<br/>
                            Better luck next time!</span>)
                }
            </p>
            {
                result === 'win' && timeProceed === bestTime
                    ? (<p>
                        You've showed your best time for this level of difficulty!
                    </p>)
                    : null
            }
            <div className="result__stats">
                <p>
                    Time: {timeProceed} seconds
                </p>
                <p>
                    Date: {`${day}.${month}.${date.getFullYear()}`}
                </p>
            </div>
            <div>
                {
                    bestTime && bestTime < Infinity
                        ? (<div className="result__stats result__stats--history">
                            <p>
                                Best time: {bestTime} seconds
                            </p>
                        </div>)
                        : null
                }
                <div className="result__stats result__stats--history">
                    <p>
                        Games played: {gamesPlayed}
                    </p>
                </div>
                <div className="result__stats result__stats--history">
                    <p>
                        Games won: {gamesWon}
                    </p>
                    <p>
                        Percentage: {Math.round((gamesWon / gamesPlayed) * 100)}%
                    </p>
                </div>
            </div>
        </div>
    );
}