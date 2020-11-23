import { combineReducers } from 'redux'
import { circuitsReducer } from './md-circuits/reducer'

const rootReducer = combineReducers({
  circuits: circuitsReducer
})

export default rootReducer;