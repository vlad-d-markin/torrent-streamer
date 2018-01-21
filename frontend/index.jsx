import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './reducers'
import App from 'Containers/App'

const store = createStore(reducer, applyMiddleware(thunk, createLogger()));

const mountroot = document.getElementById('mountroot');
ReactDOM.render(<Provider store={store}>
                    <App />
                </Provider>, mountroot);
