import { User, UserActionTypes, UserActions } from './UserTypes'

export function saveUsername(user: User): UserActionTypes {
  return {
    type: UserActions.SAVE_USER_MESSAGE,
    payload: user
  };
}

export function saveUserMessage(user: User): UserActionTypes {
  return {
    type: UserActions.SAVE_USER_MESSAGE,
    payload: user
  };
}