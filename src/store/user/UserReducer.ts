import { act } from 'react-dom/test-utils'
import { User, UserActions, UserActionTypes } from './UserTypes'

const INITIAL_STATE: User = {
  username: undefined,
  userMessage: undefined
}

export function userReducer(prevState: User = INITIAL_STATE, action: UserActionTypes){
  switch (action.type){
    case UserActions.SAVE_USERNAME:
      return {
        ...prevState,
        username: action.payload.username
      }
    
    case UserActions.SAVE_USER_MESSAGE:
      return {
        ...prevState,
        userMessage: action.payload.userMessage
      }

    default:
      return prevState
  }
}