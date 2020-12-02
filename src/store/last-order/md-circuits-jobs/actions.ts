import { CLEAR_QUERIES } from '../../types'
import { CircuitJob, ADD_CIRCUITJOB, EDIT_CIRCUITJOB, DELETE_CIRCUITJOB, CircuitsJobsActionTypes, CHANGE_CIRCUITJOB_SELECTION } from './types'

export function addCircuitJob(circuitJob: CircuitJob) : CircuitsJobsActionTypes {
  return {
    type: ADD_CIRCUITJOB,
    payload: circuitJob
  }
}

export function editCircuitJob(circuitJob: CircuitJob) : CircuitsJobsActionTypes {
  return {
    type: EDIT_CIRCUITJOB,
    payload: circuitJob
  }
}

export function deleteCircuitJob(ID: number) : CircuitsJobsActionTypes {
  return {
    type: DELETE_CIRCUITJOB,
    payload: ID
  }
}

export function changeCircuitJobSelection(ID: number) : CircuitsJobsActionTypes {
  return {
    type: CHANGE_CIRCUITJOB_SELECTION,
    payload: ID
  }
}

export function clearQueries() : CircuitsJobsActionTypes {
  return {
    type: CLEAR_QUERIES
  }
}