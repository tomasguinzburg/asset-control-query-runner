import { CLEAR_QUERIES } from '../../types'
import { CircuitsSystemsActionTypes, CircuitSystem, ADD_CIRCUITSYSTEM, EDIT_CIRCUITSYSTEM, CHANGE_CIRCUITSYSTEM_SELECTION, DELETE_CIRCUITSYSTEM } from './types'

export function addCircuitSystem(circuitAttribute: CircuitSystem) : CircuitsSystemsActionTypes {
  return {
    type: ADD_CIRCUITSYSTEM,
    payload: circuitAttribute
  }
}

export function editCircuitSystem(circuitAttribute: CircuitSystem) : CircuitsSystemsActionTypes {
  return {
    type: EDIT_CIRCUITSYSTEM,
    payload: circuitAttribute
  }
}

export function deleteCircuitSystem(ID: number) : CircuitsSystemsActionTypes {
  return {
    type: DELETE_CIRCUITSYSTEM,
    payload: ID
  }
}

export function changeCircuitSystemSelection(ID: number) : CircuitsSystemsActionTypes {
  return {
    type: CHANGE_CIRCUITSYSTEM_SELECTION,
    payload: ID
  }
}

export function clearQueries() : CircuitsSystemsActionTypes {
  return {
    type: CLEAR_QUERIES
  }
}