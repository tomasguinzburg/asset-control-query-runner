import { combineReducers } from 'redux'
import { circuitsJobsReducer } from './last-order/md-circuits-jobs/reducer';
import { circuitsReducer } from './md-circuits/reducer'
import { jobsReducer } from './md-jobs/reducer';
import { circuitsAttributesReducer } from './last-order/md-circuits-attributes/reducer';
import { circuitsSystemsReducer } from './last-order/md-circuits-systems/reducer'

export const rootReducer = combineReducers({
  circuits: circuitsReducer,
  jobs: jobsReducer,
  circuitsJobs: circuitsJobsReducer,
  circuitsAttributes: circuitsAttributesReducer,
  circuitsSystems: circuitsSystemsReducer
})

export type RootState = ReturnType<typeof rootReducer>;