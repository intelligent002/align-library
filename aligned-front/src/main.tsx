import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import './index.css';
import {loadConfig} from './config/config';

// Function to initialize and render the app
const initApp = async () => {
    const rootElement = document.getElementById('root');
    const root = ReactDOM.createRoot(rootElement!);

    // Render the app
    const renderApp = () => {
        root.render(
            <React.StrictMode>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </React.StrictMode>
        );
    };

    // Render error message with retry option
    const renderError = (error: Error) => {
        console.error('Error during app initialization:', error);
        root.render(
            <div>
                <p>Error loading configuration. Please try again later.</p>
                <button onClick={initApp}>Retry</button>
            </div>
        );
    };

    try {
        // Display loading state while the config is being loaded
        root.render(<div>Loading...</div>);

        // load the config json
        await loadConfig();

        // Render the app after config is loaded
        renderApp();
    } catch (error) {
        // Render error message if config loading fails
        renderError(error as Error);
    }
};


// Start the app initialization process
initApp().catch(error => {
    console.error('App initialization failed:', error);
});
