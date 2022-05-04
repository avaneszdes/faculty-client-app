import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import Main from "./Components/Main/Main";
import {I18nextProvider} from "react-i18next";
import i18n from "i18next";
import history from './Components/History/history'
import {Provider} from "react-redux";
import configureStore from "./Redux/configureStore";
import {CustomRouter} from "./Components/History/CustomHistory";


const store = configureStore()

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <CustomRouter history={history}>
            <I18nextProvider i18n={i18n}>
                <Main/>
            </I18nextProvider>
        </CustomRouter>
    </Provider>
);
