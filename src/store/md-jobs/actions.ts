import { Job, ADD_JOB, EDIT_JOB, DELETE_JOB, JobActionTypes, CHANGE_JOB_SELECTION } from './types'

export function addJob(job: Job) : JobActionTypes {
  return {
    type: ADD_JOB,
    payload: job
  }
}

export function editJob(job: Job) : JobActionTypes {
  return {
    type: EDIT_JOB,
    payload: job
  }
}

export function deleteJob(ID: number) : JobActionTypes {
  return {
    type: DELETE_JOB,
    payload: ID
  }
}

export function changeJobSelection(ID: number) : JobActionTypes {
  return {
    type: CHANGE_JOB_SELECTION,
    payload: ID
  }
}