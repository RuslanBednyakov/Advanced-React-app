import {createStore, applyMiddleware} from 'redux'
import reducer from './reducer'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import {routerMiddleware} from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import history from '../history'
import rootSaga from './saga'

const sagaMiddleware = createSagaMiddleware();
const enchancer = applyMiddleware(sagaMiddleware, routerMiddleware(history), thunk, logger);

const store = createStore(reducer, enchancer);

// For development only
window.store = store;

sagaMiddleware.run(rootSaga);

export default store