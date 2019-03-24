import {appName} from '../config'
import {Record, List} from 'immutable'

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
export const ADD_PERSON = `${appName}/${moduleName}/ADD_PERSON`

export default function reducer(state = new ReducerRecord(), action) {
  const {type, payload} = action;

  switch (type) {
    case ADD_PERSON:
      return state.set('entities', entities => entities.push(new PersonRecord(payload.person)));

    default: 
      return state;
  }
}

export function addPerson(person) {
  return (dispatch) => {
    dispatch({
      type: ADD_PERSON,
      payload: {
        person: {id: Date.now(), ...person}
      }
    })
  }
}