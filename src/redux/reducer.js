import {combineReducers} from 'redux'
import { connectRouter } from 'connected-react-router'
import history from '../history'
import { reducer as form } from 'redux-form'

const router = connectRouter(history)

export default combineReducers({
  router, 
  form
})