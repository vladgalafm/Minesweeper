import React from 'react';
import './UpdateStatic.css';

export function UpdateStatic( { version } ) {
    return (
        <div className='update-static'>
            <h2 className='update-static__title'>
                Application Update
            </h2>
            <h3>
                New version { version } is already there!<br />What&apos;s new?
            </h3>
            <ul>
                <li>
                    Internal improvements and code quality updates.
                </li>
            </ul>
        </div>
    );
}
