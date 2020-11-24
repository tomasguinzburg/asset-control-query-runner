import { combineReducers } from 'redux'
import { circuitsReducer } from './md-circuits/reducer'
import { jobsReducer } from './md-jobs/reducer';

export const rootReducer = combineReducers({
  circuits: circuitsReducer,
  jobs: jobsReducer
})

export type RootState = ReturnType<typeof rootReducer>;