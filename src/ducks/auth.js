import firebase from 'firebase'
import {appName} from '../config'
import {Record} from 'immutable'
import {all, take, call, put, cps} from 'redux-saga/effects'

const ReducerRecord = Record({
  user: null,
  error: null,
  loading: false
})

export const moduleName = 'auth'
export const SIGN_UP_REQUEST = `${appName}/${moduleName}/SIGN_UP_REQUEST`
export const SIGN_UP_SUCCESS = `${appName}/${moduleName}/SIGN_UP_SUCCESS`
export const SIGN_UP_ERROR = `${appName}/${moduleName}/SIGN_UP_ERROR`
export const SIGN_IN_SUCCESS = `${appName}/${moduleName}/SIGN_IN_SUCCESS`

export default function reducer(state = new ReducerRecord(), action) {
  const {type, payload, error} = action;

  switch (type) {
    case SIGN_UP_REQUEST:
      return state.set('loading', true);

    case SIGN_IN_SUCCESS:
      return state
        .set('loading', false)
        .set('user', payload.user)
        .set('error', error)

    case SIGN_UP_ERROR:
      return state
        .set('loading', false)
        .set('error', error)

    default: 
      return state;
  }
}

export function signUp(email, password) {
  return {
      type: SIGN_UP_REQUEST,
      payload: {email, password}
    }
}

export const signUpSaga = function * () {
  const auth = firebase.auth();

  while(true) {
    const action = yield take(SIGN_UP_REQUEST);

    try{
      const user = yield call(
        [auth, auth.createUserWithEmailAndPassword],
        action.payload.email, action.payload.password
      )
      yield put({
        type: SIGN_UP_SUCCESS,
        payload: {user}
      })
    } catch (error) {
      yield put({
        type: SIGN_UP_ERROR,
        error
      })
    }
  }
}

export const watchStatusChange = function * () {
  const auth = firebase.auth();
  
  try {
    yield cps([auth, auth.onAuthStateChanged])
  } catch (user) {
    yield put({
      type: SIGN_IN_SUCCESS,
      payload: {user}
    })
  }
}

export const saga = function * () {
  yield all([
    signUpSaga(),
    watchStatusChange()
  ])
}