import React from 'react';
import './UpdateStatic.css';

export function UpdateStatic({version}) {
    return (
        <div className="update-static">
            <h2 className="update-static__title">
                Application Update
            </h2>
            <h3>
                New version {version} is already there!<br/>What's new?
            </h3>
            <ul>
                <li>
                    <b>Breaking changes:</b> upgraded project dependencies to latest versions.
                </li>
            </ul>
        </div>
    );
}