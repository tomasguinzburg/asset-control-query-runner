export interface Circuit {
  ID: number
  circuitShortname: string
  circuitLongname: string
  distributionTime: string
  treeID: string  
  calendar: string
  product: string
  groupID: string
}

export interface CircuitsState {
  circuitsHistory: Circuit[],
  selected: number
}

export const ADD_CIRCUIT = 'ADD_CIRCUIT'
export const EDIT_CIRCUIT = 'EDIT_CIRCUIT'
export const DELETE_CIRCUIT = 'DELETE_CIRCUIT'
export const CHANGE_SELECTION = 'CHANGE_SELECTION'
export const CLEAR_QUERIES = 'CLEAR_QUERIES'

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

interface ClearQueriesAction {
  type: typeof CLEAR_QUERIES
}

interface ChangeCircuitSelection {
  type: typeof CHANGE_SELECTION
  payload: number
}

export type CircuitsActionTypes = AddCircuitAction | EditCircuitAction | DeleteCircuitAction | ClearQueriesAction | ChangeCircuitSelection
