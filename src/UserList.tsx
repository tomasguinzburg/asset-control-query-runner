import React from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { User } from './store/user/UserTypes';
import { Dispatch, AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { AppState } from './store/RootReducer';

const CenterContent = styled.div`
  text-align: center;
`;

interface UserListOwnProperties {}

interface UserListStateToProps {
  user: User
}

const mapStateToProps: MapStateToProps< UserListStateToProps
                                      , UserListOwnProperties
                                      , AppState
                                      > = (state: AppState, ownProps: UserListOwnProperties): UserListStateToProps => ({
                                        user: state.user,
                                        ...ownProps
                                      });

const UserListUnconnected: React.FC<UserListStateToProps & UserListOwnProperties> = ({
  user
}): JSX.Element => {
    return (
      <CenterContent>
        <p>
          Retrieved Username: {user.username ? user.username : "No username found"}
        </p>
        <p>
          Retrieved UserMessage: {user.userMessage ? user.userMessage: "No message found"}
        </p>
        
        <Link to='/'>
          Home
        </Link>
      </CenterContent>
    );
}

export const UserList = connect< UserListStateToProps
                       , {}
                       , UserListOwnProperties
                       , AppState
                       >(mapStateToProps)(UserListUnconnected);