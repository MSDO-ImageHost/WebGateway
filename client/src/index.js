import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App.js';

render((
    <BrowserRouter>
    {/* <React.StrictMode> */}
        <App/>
    {/* </React.StrictMode> */}
    </BrowserRouter>
), document.getElementById('root'));
