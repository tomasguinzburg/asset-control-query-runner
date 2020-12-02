import { CLEAR_QUERIES } from '../../types'
import { ADD_CIRCUITSYSTEM, CHANGE_CIRCUITSYSTEM_SELECTION, CircuitsSystemsActionTypes, CircuitsSystemsState, DELETE_CIRCUITSYSTEM, EDIT_CIRCUITSYSTEM } from './types'

const initialState : CircuitsSystemsState = {
  circuitsSystemsHistory: [],
  selected: NaN
}

export function circuitsSystemsReducer( state: CircuitsSystemsState = initialState
                                      , action: CircuitsSystemsActionTypes
                                      ) : CircuitsSystemsState {
  switch(action.type){
    case ADD_CIRCUITSYSTEM:
      return { ...state
             , circuitsSystemsHistory: [ ...state.circuitsSystemsHistory
                               , action.payload
                               ]
             }
    case EDIT_CIRCUITSYSTEM:
      return { ...state
             , circuitsSystemsHistory: state.circuitsSystemsHistory.filter(circuitSystem => circuitSystem.ID !== action.payload.ID)
                                                                   .concat(action.payload)
                                                                   .sort((a, b) => a.ID - b.ID)
             }
    case DELETE_CIRCUITSYSTEM:
      return { ...state
             , circuitsSystemsHistory: state.circuitsSystemsHistory.filter(circuitSystem => circuitSystem.ID !== action.payload)
                                                                   .map((c, index) => ({ ...c, ID: index })) 
             }
    case CHANGE_CIRCUITSYSTEM_SELECTION:
      return { ...state, selected: action.payload}
    case CLEAR_QUERIES:
      return { ...state, circuitsSystemsHistory: [] }
    default:
      return state;
  }
}