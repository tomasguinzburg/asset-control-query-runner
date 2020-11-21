export interface User {
  username: string | undefined
  userMessage: string | undefined
}

export const UserActions = {
  SAVE_USERNAME: 'SAVE_USERNAME',
  SAVE_USER_MESSAGE: 'SAVE_USER_MESSAGE'
}

interface SaveUsernameAction {
  type: typeof UserActions.SAVE_USERNAME,
  payload: User
}

interface SaveUserMessageAction {
  type: typeof UserActions.SAVE_USER_MESSAGE,
  payload: User
}

export type UserActionTypes = SaveUsernameAction | SaveUserMessageAction