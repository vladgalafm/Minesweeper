import React from 'react';
import './UpdateStatic.css';

export const UpdateStatic = ({version}) => (
    <div className="update-static">
        <h2 className="update-static__title">
            Application Update
        </h2>
        <h3>
            Version {version}: what's new?
        </h3>
        <ul>
            <li>
                <b>New version notification:</b> from now, every time
                application gets new version update - you will see this
                notification with list of added features or fixed problems.<br/>
                <i>Caution: after update your unfinished game will be deleted.</i>
            </li>
            <li>
                <b>Updating cache fix</b>: no need to reload page to clear old
                caches after updates - application will do it by itself.
            </li>
        </ul>
    </div>
);