import { QueryGenerator } from '../types'
import { ClearQueriesAction } from '../types'

export interface Circuit extends QueryGenerator {
  circuitShortname: string
  circuitLongname: string
  distributionTime: string
  treeID: string  
  calendar: string
  product: string
  groupID: string
  typeShortname: string
}

export interface CircuitsState {
  circuitsHistory: QueryGenerator[],
  selected: number
}

export const ADD_CIRCUIT = 'ADD_CIRCUIT'
export const EDIT_CIRCUIT = 'EDIT_CIRCUIT'
export const DELETE_CIRCUIT = 'DELETE_CIRCUIT'
export const CHANGE_CIRCUIT_SELECTION = 'CHANGE_CIRCUIT_SELECTION'

interface AddCircuitAction {
  type: typeof ADD_CIRCUIT
  payload: Circuit
}

interface EditCircuitAction {
  type: typeof EDIT_CIRCUIT
  payload: Circuit
}

interface DeleteCircuitAction {
  type: typeof DELETE_CIRCUIT
  payload: number
}

export interface ChangeCircuitSelection {
  type: typeof CHANGE_CIRCUIT_SELECTION
  payload: number
}

export type CircuitsActionTypes = AddCircuitAction | EditCircuitAction | DeleteCircuitAction | ClearQueriesAction | ChangeCircuitSelection
