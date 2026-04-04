import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './app.tsx';
import "./css/index.scss";
import "./css/app.scss";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App/>
    </StrictMode>,
);
