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
                <b>Update notification:</b> prevent showing notifications for new users.
            </li>
            <li>
                <b>SEO improvement:</b> added prefix attribute has been for updating graph cache.
            </li>
        </ul>
    </div>
);