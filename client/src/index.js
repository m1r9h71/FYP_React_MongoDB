import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
//React Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Routes from './routes';
const createStoreWithMiddleWare = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

ReactDOM.render(
    <Provider store={createStoreWithMiddleWare(reducers)}>
        <BrowserRouter>
            <Routes/>
        </BrowserRouter>




    </Provider>
    ,document.getElementById('root')
);