import { QueryGenerator } from '../../types'
import { ClearQueriesAction } from '../../types'


export interface CircuitAttribute extends QueryGenerator {
  circuitShortname: string
  attributeName: string
}

export interface CircuitsAttributesState {
  circuitsAttributesHistory: QueryGenerator[]
  selected: number
}

export const ADD_CIRCUITATTRIBUTE = 'ADD_CIRCUITATTRIBUTE'
export const EDIT_CIRCUITATTRIBUTE = 'EDIT_CIRCUITATTRIBUTE'
export const DELETE_CIRCUITATTRIBUTE = 'DELETE_CIRCUITATTRIBUTE'
export const CHANGE_CIRCUITATTRIBUTE_SELECTION = 'CHANGE_CIRCUITATTRIBUTE_SELECTION'

interface AddCircuitAttributesAction {
  type: typeof ADD_CIRCUITATTRIBUTE
  payload: CircuitAttribute
}

interface EditCircuitAttributesAction {
  type: typeof EDIT_CIRCUITATTRIBUTE
  payload: CircuitAttribute
}

interface DeleteCircuitAttributesAction {
  type: typeof DELETE_CIRCUITATTRIBUTE
  payload: number
}

export interface ChangeCircuitAttributesSelection {
  type: typeof CHANGE_CIRCUITATTRIBUTE_SELECTION
  payload: number
}

export type CircuitsAttributesActionTypes = AddCircuitAttributesAction 
                                    | EditCircuitAttributesAction 
                                    | DeleteCircuitAttributesAction 
                                    | ChangeCircuitAttributesSelection 
                                    | ClearQueriesAction