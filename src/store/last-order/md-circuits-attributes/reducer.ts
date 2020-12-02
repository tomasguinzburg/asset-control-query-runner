import { CLEAR_QUERIES } from '../../types'
import { CircuitsAttributesState, CircuitsAttributesActionTypes, ADD_CIRCUITATTRIBUTE, EDIT_CIRCUITATTRIBUTE, CHANGE_CIRCUITATTRIBUTE_SELECTION, DELETE_CIRCUITATTRIBUTE } from './types'

const initialState : CircuitsAttributesState = {
  circuitsAttributesHistory: [],
  selected: NaN
}

export function circuitsAttributesReducer( state : CircuitsAttributesState = initialState
                                   , action: CircuitsAttributesActionTypes
                                   ) : CircuitsAttributesState {
    switch(action.type){
      case ADD_CIRCUITATTRIBUTE:
        return { ...state
               , circuitsAttributesHistory: [ ...state.circuitsAttributesHistory
                                      , action.payload
                                      ]
               }
      case EDIT_CIRCUITATTRIBUTE:
        return { ...state
               , circuitsAttributesHistory: state.circuitsAttributesHistory.filter(circuitAttribute => circuitAttribute.ID !== action.payload.ID)
                                                               .concat(action.payload)
                                                               .sort((a, b) => a.ID - b.ID)
               }

      case DELETE_CIRCUITATTRIBUTE:
        return { ...state
               , circuitsAttributesHistory: state.circuitsAttributesHistory.filter(circuitAttribute => circuitAttribute.ID !== action.payload)
                                                               .map((c, index) => ({ ...c, ID: index })) 
               }

      case CHANGE_CIRCUITATTRIBUTE_SELECTION:
        return { ...state, selected: action.payload}
      case CLEAR_QUERIES:
        return { ...state, circuitsAttributesHistory: [] }
      default:
        return state;
    }
}