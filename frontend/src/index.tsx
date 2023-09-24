import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import Router from "./Routes/Router";
import { Provider } from 'react-redux';
import store from "./Redux/Store";
import './Locale/i18n';


// Logging control
if (process.env.REACT_APP_WARNINGS_LOGGING == 'false') {
    console.warn = () => { };
}

if (process.env.REACT_APP_ERRORS_LOGGING == 'false') {
    console.error = () => { };
}

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router></Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// for measuring performance in app, or
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
