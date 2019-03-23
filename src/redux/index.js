import {createStore, applyMiddleware} from 'redux'
import reducer from './reducer'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import {routerMiddleware} from 'react-router-redux'
import history from '../history'

const enchancer = applyMiddleware(routerMiddleware(history), thunk, logger)

const store = createStore(reducer, enchancer)

export default store