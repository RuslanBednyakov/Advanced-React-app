import {appName} from '../config'
import {Record, OrderedMap, OrderedSet} from 'immutable'
import {all, put, call, take} from 'redux-saga/effects'
import firebase from 'firebase'
import {createSelector} from 'reselect'
import {fbDataToEntities} from './utils'

// Constants
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`

export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`
export const SELECT_EVENT = `${prefix}/SELECT_EVENT`


//Reducer
export const ReducerRecord = Record({
  entities: new OrderedMap({}),
  selected: new OrderedSet([]),
  loading: false,
  loaded: false
})

export const EventRecord = Record({
  uid: null,
  title: null,
  url: null,
  where: null,
  when: null,
  month: null,
  submissionDeadline: null
})

export default function reducer(state = new ReducerRecord(), action) {
  const {type, payload} = action;

  switch (type) {
    case FETCH_ALL_REQUEST:
      return state.set('loading', true)

    case FETCH_ALL_SUCCESS:
      return state
        .set('loading', false)
        .set('loaded', true)
        .set('entities', fbDataToEntities(payload, EventRecord))

    case SELECT_EVENT:
    return state.selected.contains(payload.uid)
      ? state.update('selected', selected => selected.remove(payload.uid))
      : state.update('selected', selected => selected.add(payload.uid))

    default: 
      return state;
  }
}

//Selectors
export const stateSelector = state => state[moduleName]
export const entitiesSelector = createSelector(stateSelector, state => state.entities)
export const eventListSelector = createSelector(entitiesSelector, entities => (
  entities.valueSeq().toArray()
))

//Action Creators
export function fetchAll() {
  return {
    type: FETCH_ALL_REQUEST
  }
}

export function selectEvent(uid) {
  return {
    type: SELECT_EVENT,
    payload: {uid}
  }
}

//Sagas
export const fetchAllSaga = function * (action) {
  while(true) {
    yield take(FETCH_ALL_REQUEST)

    const ref = firebase.database().ref('events')

    const data = yield call([ref, ref.once], 'value')

    yield put({
      type: FETCH_ALL_SUCCESS,
      payload: data.val()
    })
  }
}

export const saga = function * () {
  yield all([
    fetchAllSaga()
  ])
}