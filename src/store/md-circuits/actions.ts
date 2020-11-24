import { Circuit, ADD_CIRCUIT, EDIT_CIRCUIT, DELETE_CIRCUIT, CircuitsActionTypes, CLEAR_QUERIES, CHANGE_SELECTION } from './types'

export function addCircuit(circuit: Circuit) : CircuitsActionTypes {
  return {
    type: ADD_CIRCUIT,
    payload: circuit
  }
}

export function editCircuit(circuit: Circuit) : CircuitsActionTypes {
  return {
    type: EDIT_CIRCUIT,
    payload: circuit
  }
}

export function deleteCircuit(ID: number) : CircuitsActionTypes {
  return {
    type: DELETE_CIRCUIT,
    payload: ID
  }
}

export function changeCircuitSelection(ID: number) : CircuitsActionTypes {
  return {
    type: CHANGE_SELECTION,
    payload: ID
  }
}

export function clearQueries() : CircuitsActionTypes {
  return {
    type: CLEAR_QUERIES
  }
}