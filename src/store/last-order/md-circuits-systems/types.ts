import { QueryGenerator } from '../../types'
import { ClearQueriesAction } from '../../types'


export interface CircuitSystem extends QueryGenerator {
  circuitShortname: string
  systemShortname: string
}

export interface CircuitsSystemsState {
  circuitsSystemsHistory: QueryGenerator[]
  selected: number
}

export const ADD_CIRCUITSYSTEM = 'ADD_CIRCUITSYSTEM'
export const EDIT_CIRCUITSYSTEM = 'EDIT_CIRCUITSYSTEM'
export const DELETE_CIRCUITSYSTEM = 'DELETE_CIRCUITSYSTEM'
export const CHANGE_CIRCUITSYSTEM_SELECTION = 'CHANGE_CIRCUITSYSTEM_SELECTION'

interface AddCircuitSystemsAction {
  type: typeof ADD_CIRCUITSYSTEM
  payload: CircuitSystem
}

interface EditCircuitSystemsAction {
  type: typeof EDIT_CIRCUITSYSTEM
  payload: CircuitSystem
}

interface DeleteCircuitSystemsAction {
  type: typeof DELETE_CIRCUITSYSTEM
  payload: number
}

export interface ChangeCircuitSystemSelection {
  type: typeof CHANGE_CIRCUITSYSTEM_SELECTION
  payload: number
}

export type CircuitsSystemsActionTypes = AddCircuitSystemsAction 
                                       | EditCircuitSystemsAction 
                                       | DeleteCircuitSystemsAction 
                                       | ChangeCircuitSystemSelection 
                                       | ClearQueriesAction