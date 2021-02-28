import React from 'react';
import './UpdateStatic.css';

export const UpdateStatic = ({version}) => (
    <div className="update-static">
        <h2 className="update-static__title">
            Application Update
        </h2>
        <h3>
            New version {version} is already there!<br/>What's new?
        </h3>
        <ul>
            <li>
                <b>Improved caching procedure:</b> after receiving new version
                you'll need to confirm update installation. Page will reload
                and caches will be stored.
            </li>
        </ul>
    </div>
);