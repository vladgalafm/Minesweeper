import React from 'react';
import './DiffHistory.css';

export function DiffHistory({
    bestTime,
    gamesPlayed,
    gamesWon,
    longestWinStreak,
    longestLoseStreak,
    currentWinStreak
}) {
    return (
        <div className="diff-history">
            <p>
                <span>
                    Best time:
                </span>
                <span>
                    {bestTime && bestTime < Infinity ? bestTime : '-'}
                </span>
            </p>
            <p>
                <span>
                    Games played:
                </span>
                <span>
                    {gamesPlayed || 0}
                </span>
            </p>
            <p>
                <span>
                    Games won:
                </span>
                <span>
                    {gamesWon || 0}
                </span>
            </p>
            <p>
                <span>
                    Percentage:
                </span>
                <span>
                    {gamesWon && gamesPlayed
                        ? `${Math.round((gamesWon / gamesPlayed) * 100)}%`
                        : '0%'}
                </span>
            </p>
            <p>
                <span>
                    Longest winning streak:
                </span>
                <span>
                    {longestWinStreak || 0}
                </span>
            </p>
            <p>
                <span>
                    Longest loosing streak:
                </span>
                <span>
                    {longestLoseStreak || 0}
                </span>
            </p>
            <p>
                <span>
                    Current winning streak:
                </span>
                <span>
                    {currentWinStreak || 0}
                </span>
            </p>
        </div>
    );
}