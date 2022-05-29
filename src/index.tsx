import React from 'react';
import './index.css';
import Main from "./Components/Main/Main";
import {I18nextProvider} from "react-i18next";
import i18n from "i18next";
import history from './Components/History/history'
import {Provider} from "react-redux";
import configureStore from "./Redux/configureStore";
import {Router} from 'react-router-dom';
import ReactDOM from 'react-dom';
const store = configureStore()

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <I18nextProvider i18n={i18n}>
                <Main/>
            </I18nextProvider>
        </Router>
    </Provider>,
    document.getElementById('root')
);
