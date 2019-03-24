import {combineReducers} from 'redux'
import { connectRouter } from 'connected-react-router'
import history from '../history'
import { reducer as form } from 'redux-form'
import authReducer, {moduleName as authModule} from '../ducks/auth'
import peopleReducer, {moduleName as peopleModule} from '../ducks/people'

export default combineReducers({
  router: connectRouter(history),
  form,
  [authModule]: authReducer,
  [peopleModule]: peopleReducer
})