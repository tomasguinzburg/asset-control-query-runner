import { CircuitsState
       , CircuitsActionTypes
       , ADD_CIRCUIT
       , EDIT_CIRCUIT
       , DELETE_CIRCUIT
       , CLEAR_CIRCUITS,
       CHANGE_SELECTION
       } from './types'

const initialState : CircuitsState = {
  circuitsHistory: [],
  selected: NaN
}


//Aca no puede haber logica statefull, osea nada de push y eso todo ininmutable hermano
//Nada de tocar variables externas tampoco, lo que sale se calcula con lo que entra
export function circuitsReducer( state : CircuitsState = initialState
                               , action: CircuitsActionTypes
                               ) : CircuitsState {
  switch(action.type){
    case ADD_CIRCUIT:
      return { ...state 
             , circuitsHistory: [ ...state.circuitsHistory
                                , action.payload
                                ]
             }
    case EDIT_CIRCUIT:
      return { ...state
             , circuitsHistory: state.circuitsHistory.filter(circuit => circuit.ID !== action.payload.ID)
                                                     .concat(action.payload)
                                                     .sort((a, b) => a.ID - b.ID)
             }
    case DELETE_CIRCUIT:
      return { ...state
             , circuitsHistory: state.circuitsHistory.filter(circuit => circuit.ID !== action.payload)
                                                     .map((c, index) => ({ ...c, ID: index }))
             }
    case CLEAR_CIRCUITS:
      return { ...state, circuitsHistory: [] }

    case CHANGE_SELECTION:
      return { ...state, selected: action.payload}
    default:
      return state;
  }
}