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
                <b>Application update procedure:</b> after receiving new update,
                you'll be redirected to a static page, where you'll need to
                confirm new version installation.<br/>
                <i>Or you can just reload application web page ;)</i>
            </li>
        </ul>
    </div>
);