import { CLEAR_QUERIES } from '../types'
import { JobState
  , JobActionTypes
  , ADD_JOB
  , EDIT_JOB
  , DELETE_JOB
  , CHANGE_JOB_SELECTION
  } from './types'

const initialState : JobState = {
jobsHistory: [],
selected: NaN
}


//Aca no puede haber logica statefull, osea nada de push y eso todo ininmutable hermano
//Nada de tocar variables externas tampoco, lo que sale se calcula con lo que entra
export function jobsReducer( state : JobState = initialState
                          , action: JobActionTypes
                          ) : JobState {
switch(action.type){
case ADD_JOB:
 return { ...state 
        , jobsHistory: [ ...state.jobsHistory
                           , action.payload
                           ]
        }
case EDIT_JOB:
 return { ...state
        , jobsHistory: state.jobsHistory.filter(job => job.ID !== action.payload.ID)
                                                .concat(action.payload)
                                                .sort((a, b) => a.ID - b.ID)
        }
case DELETE_JOB:
 return { ...state
        , jobsHistory: state.jobsHistory.filter(job => job.ID !== action.payload)
                                                .map((c, index) => ({ ...c, ID: index }))
        }
case CHANGE_JOB_SELECTION:
 return { ...state, selected: action.payload}
case CLEAR_QUERIES:
  return {...state, jobsHistory: []}
default:
 return state;
}
}