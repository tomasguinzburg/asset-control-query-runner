export interface Job {
  ID: number
  jobShortname: string
  jobLongname: string
  jobHandling: string
  configADO: string 
  listID: string  
  templateID: string  
  sourceShortname: string
  uproc: string  
  calendar: string
}

export interface JobState {
  jobsHistory: Job[],
  selected: number
}

export const ADD_JOB = 'ADD_JOB'
export const EDIT_JOB = 'EDIT_JOB'
export const DELETE_JOB = 'DELETE_JOB'
export const CHANGE_JOB_SELECTION = 'CHANGE_JOB_SELECTION'

interface AddJobAction {
  type: typeof ADD_JOB
  payload: Job
}

interface EditJobAction {
  type: typeof EDIT_JOB
  payload: Job
}

interface DeleteJobAction {
  type: typeof DELETE_JOB
  payload: number
}

interface ChangeJobSelection {
  type: typeof CHANGE_JOB_SELECTION
  payload: number
}

export type JobActionTypes = AddJobAction | EditJobAction | DeleteJobAction | ChangeJobSelection