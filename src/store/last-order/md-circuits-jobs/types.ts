import { QueryGenerator } from '../../types'
import { ClearQueriesAction } from '../../types'

export interface CircuitJob extends QueryGenerator {
  circuitShortname: string
  jobShortname: string
  order: number
}

export interface CircuitsJobsState {
  circuitsJobsHistory: QueryGenerator[]
  selected: number
}

export const ADD_CIRCUITJOB = 'ADD_CIRCUITJOB'
export const EDIT_CIRCUITJOB = 'EDIT_CIRCUITJOB'
export const DELETE_CIRCUITJOB = 'DELETE_CIRCUITJOB'
export const CHANGE_CIRCUITJOB_SELECTION = 'CHANGE_CIRCUITJOB_SELECTION'

interface AddCircuitJobAction {
  type: typeof ADD_CIRCUITJOB
  payload: CircuitJob
}

interface EditCircuitJobAction {
  type: typeof EDIT_CIRCUITJOB
  payload: CircuitJob
}

interface DeleteCircuitJobAction {
  type: typeof DELETE_CIRCUITJOB
  payload: number
}

export interface ChangeCircuitJobSelection {
  type: typeof CHANGE_CIRCUITJOB_SELECTION
  payload: number
}

export type CircuitsJobsActionTypes = AddCircuitJobAction 
                                    | EditCircuitJobAction 
                                    | DeleteCircuitJobAction 
                                    | ChangeCircuitJobSelection 
                                    | ClearQueriesAction