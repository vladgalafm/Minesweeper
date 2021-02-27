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
                <b>New version notification:</b> from now, every time
                application gets new version update - you will see this
                notification with list of added features or fixed problems.<br/>
                <i>Caution: after update your unfinished game will be deleted.</i>
            </li>
        </ul>
    </div>
);