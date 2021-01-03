import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Loader from 'react-loader-spinner';
import socket from '../../socket';
import { actionCreators } from '../../store/reducers/usersReducer';
import { millisecondsInDay } from '../../variables';
import './Users.scss';

export const Users = () => {
  const dispatch = useDispatch();
  const usersFromServer = useSelector(({ users }) => users.users);
  const loadingState = useSelector(({ loading }) => loading);
  const currentInterlocutorId = useSelector(({ users }) => users.interlocutorId);

  const getDialog = (e) => {
    const { id } = e.currentTarget.dataset;
    if (id === currentInterlocutorId) return;
    socket.emit('Open dialog', id);
    dispatch(actionCreators.setInterlocutorId(id));
  };

  const chooseLastMessage = (message) => {
    const messageText = Object.values(message)[0];
    return messageText.length > 30 ? `${messageText.slice(1, 30)}...` : messageText;
  };

  const getTime = (time) => {
    const currentTime = Date.now();
    const date = new Date(+time);
    const minutes = date.getMinutes().toString();
    if (currentTime - time > millisecondsInDay) return date.toDateString().split(' ')[0];
    if (currentTime - time > millisecondsInDay * 7) return `${date.toLocaleDateString()}`;
    return `${date.getHours()}:${minutes.length === 2 ? minutes : (`0${minutes}`)}`;
  };

  return (
    <div className={classNames('users', { 'data-loading': loadingState })}>
      {loadingState ? (
        <Loader
          type="Grid"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000}
        />
      ) : (
        <div className="users__body">
          {usersFromServer.map((user) => (
            <Link to={`/${user.id}`}>
              <div
                aria-hidden="true"
                className="users__item user"
                onClick={getDialog}
                data-id={user.id}
                key={console.log(user)}
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt=""
                    className="user__photo"
                  />
                ) : (
                  <div className="user__no-photo">{user.name[0]}</div>
                )}
                <div className="user__info">
                  <span className="user__name">{user.name}</span>
                  <span className="user__text">{chooseLastMessage(user.messages[user.messages.length - 1])}</span>
                </div>
                <span className="user__time">{getTime(user.time)}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
