import React, { useEffect, useState, ChangeEvent } from 'react';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import {
  saveUsername as saveUsernameAction,
  saveUserMessage as saveUserMessageAction,
} from './store/user/UserActions';
import { Link } from 'react-router-dom';
import './App.css';
import { User } from './store/user/UserTypes';
import { AppState } from './store/RootReducer';

interface AppOwnProps {
  username: string | undefined;
  userType: 'admin' | 'moderator' | 'user' | 'guest';
}

interface AppDispatchToProps {
  saveUsername: (user: User) => void;
  saveUserMessage: (user: User) => void;
}

const AppUnconnected: React.FC<AppDispatchToProps & AppOwnProps> = 
({ 
  userType, 
  username,
  saveUsername,
  saveUserMessage
}): JSX.Element => {
  const [time, setTime] = useState<Date>(() => new Date(Date.now()));
  const [message, setMessage] = useState<string>('');

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date(Date.now()));
    }, 1000);

    if(username) {
      saveUsername({username, userMessage: message});
    }
    
    return () => {
      clearInterval(timer);
    }
  }, [username, saveUsername, message]);

  useEffect(() => {
    saveUserMessage({username, userMessage: message});
  }, [username, message, saveUserMessage]);

  return (
    <div className="App">
      <p>
        Hi, {username ? username : 'Mysterious Entity'}, your user type is {username ? userType : 'irrelevant because I do not know you'}.
      </p>
      <p>
        {time.toUTCString()}
      </p>
      <input
        type='text'
        placeholder='Enter your message here'
        value={message}
        onChange={handleTextChange}
      />
      <p>
        Your message: {message || ''}
      </p>
      <Link
        to='/userlist'
      >
        User List
      </Link>
    </div>
  );
}

const mapDispatchToProps: MapDispatchToProps<
  AppDispatchToProps,
  AppOwnProps
> = (dispatch: Dispatch, ownProps: AppOwnProps): AppDispatchToProps => ({
  saveUsername: (user: User) => {
    dispatch(saveUsernameAction(user));
  },

  saveUserMessage: (user: User) => {
    dispatch(saveUserMessageAction(user));
  },
});

export const App = connect<
  {},
  AppDispatchToProps,
  AppOwnProps,
  AppState
>(null, mapDispatchToProps)(AppUnconnected);