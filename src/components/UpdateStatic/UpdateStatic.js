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
                <b>Sound:</b> several sound effects have been added. You can
                switch them on/off directly in <i>Settings</i> tab.<br/>
                <i>By default sound effects are enabled.</i>
            </li>
            <li>
                <b>Result modal issue:</b> player received result notification even
                when he immediately went to menu after game finished. Fixed this problem.
            </li>
        </ul>
    </div>
);