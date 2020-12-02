import { CLEAR_QUERIES } from '../../types'
import { ADD_CIRCUITJOB, CHANGE_CIRCUITJOB_SELECTION, CircuitsJobsActionTypes, CircuitsJobsState, DELETE_CIRCUITJOB, EDIT_CIRCUITJOB } from './types'

const initialState : CircuitsJobsState = {
  circuitsJobsHistory: [],
  selected: NaN
}

export function circuitsJobsReducer( state : CircuitsJobsState = initialState
                                   , action: CircuitsJobsActionTypes
                                   ) : CircuitsJobsState {
    switch(action.type){
      case ADD_CIRCUITJOB:
        return { ...state
               , circuitsJobsHistory: [ ...state.circuitsJobsHistory
                                      , action.payload
                                      ]
               }
      case EDIT_CIRCUITJOB:
        return { ...state
               , circuitsJobsHistory: state.circuitsJobsHistory.filter(circuitJob => circuitJob.ID !== action.payload.ID)
                                                               .concat(action.payload)
                                                               .sort((a, b) => a.ID - b.ID)
               }

      case DELETE_CIRCUITJOB:
        return { ...state
               , circuitsJobsHistory: state.circuitsJobsHistory.filter(circuitJob => circuitJob.ID !== action.payload)
                                                               .map((c, index) => ({ ...c, ID: index })) 
               }

      case CHANGE_CIRCUITJOB_SELECTION:
        return { ...state, selected: action.payload}
      case CLEAR_QUERIES:
        return { ...state, circuitsJobsHistory: [] }
      default:
        return state;
    }
}