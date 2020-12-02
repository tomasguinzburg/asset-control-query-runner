import { CLEAR_QUERIES } from '../../types'
import { CircuitsAttributesActionTypes, CircuitAttribute, ADD_CIRCUITATTRIBUTE, EDIT_CIRCUITATTRIBUTE, CHANGE_CIRCUITATTRIBUTE_SELECTION, DELETE_CIRCUITATTRIBUTE } from './types'

export function addCircuitAttribute(circuitAttribute: CircuitAttribute) : CircuitsAttributesActionTypes {
  return {
    type: ADD_CIRCUITATTRIBUTE,
    payload: circuitAttribute
  }
}

export function editCircuitAttribute(circuitAttribute: CircuitAttribute) : CircuitsAttributesActionTypes {
  return {
    type: EDIT_CIRCUITATTRIBUTE,
    payload: circuitAttribute
  }
}

export function deleteCircuitAttribute(ID: number) : CircuitsAttributesActionTypes {
  return {
    type: DELETE_CIRCUITATTRIBUTE,
    payload: ID
  }
}

export function changeCircuitAttributeSelection(ID: number) : CircuitsAttributesActionTypes {
  return {
    type: CHANGE_CIRCUITATTRIBUTE_SELECTION,
    payload: ID
  }
}

export function clearQueries() : CircuitsAttributesActionTypes {
  return {
    type: CLEAR_QUERIES
  }
}