import { combineReducers } from 'redux'
import { circuitsReducer } from './md-circuits/reducer'

export const rootReducer = combineReducers({
  circuits: circuitsReducer
})

export type RootState = ReturnType<typeof rootReducer>;