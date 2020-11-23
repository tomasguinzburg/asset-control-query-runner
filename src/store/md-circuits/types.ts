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
  circuitsHistory: Circuit[]
}

export const ADD_CIRCUIT = 'ADD_CIRCUIT'
export const EDIT_CIRCUIT = 'EDIT_CIRCUIT'
export const DELETE_CIRCUIT = 'DELETE_CIRCUIT'

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

export type CircuitsActionTypes = AddCircuitAction | EditCircuitAction | DeleteCircuitAction
