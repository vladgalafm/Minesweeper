import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const root = createRoot( document.getElementById( 'root' ) );

root.render( <PageContent /> );
registerServiceWorker();

function PageContent() {
    return (
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}
