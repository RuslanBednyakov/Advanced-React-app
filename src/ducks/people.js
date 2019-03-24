import {appName} from '../config'
import {Record, List} from 'immutable'
import {put, call, takeEvery} from 'redux-saga/effects'
import {generateId} from './utils'

const ReducerRecord = Record({
  entities: new List([])
})

const PersonRecord = Record({
  id: null,
  firstName: null,
  lastName: null,
  email: null
})

export const moduleName = 'people'
export const ADD_PERSON_REQUEST = `${appName}/${moduleName}/ADD_PERSON_REQUEST`
export const ADD_PERSON = `${appName}/${moduleName}/ADD_PERSON`

export default function reducer(state = new ReducerRecord(), action) {
  const {type, payload} = action;

  switch (type) {
    case ADD_PERSON:
      return state.set('entities', entities => entities.push(new PersonRecord(payload)));

    default: 
      return state;
  }
}

export function addPerson(person) {
  return {
    type: ADD_PERSON_REQUEST,
    payload: person
  }
}

export const addPersonSaga = function * (action) {
  const id = yield call(generateId);
  yield put({
    type: ADD_PERSON,
    payload: {...action.payload, id}
  })
}

export const saga = function * () {
  yield takeEvery(ADD_PERSON_REQUEST, addPersonSaga)
}