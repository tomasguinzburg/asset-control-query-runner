import { Circuit, ADD_CIRCUIT, EDIT_CIRCUIT, DELETE_CIRCUIT, CircuitsActionTypes } from './types'

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