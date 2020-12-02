import { combineReducers } from 'redux'
import { circuitsJobsReducer } from './last-order/md-circuits-jobs/reducer';
import { circuitsReducer } from './md-circuits/reducer'
import { jobsReducer } from './md-jobs/reducer';

export const rootReducer = combineReducers({
  circuits: circuitsReducer,
  jobs: jobsReducer,
  circuitsJobs: circuitsJobsReducer
})

export type RootState = ReturnType<typeof rootReducer>;