import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators } from '../../store/reducers/usersReducer';
// import socket from '../../socket';
import { sendData } from '../../api';
import nonActiveLabel from '../../images/non-active.svg';
import halfLabel from '../../images/half-label.svg';
import './Dialog.scss';

export const Dialog = ({ interlocutorId }) => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const updatedUsers = useSelector(({ users }) => users.users);
  const updatedUser = updatedUsers.filter((person) => person.id.toString() === interlocutorId)[0];

  const addData = (e) => {
    e.preventDefault();
    sendData(query, interlocutorId)
      .then((res) => res.data)
      .then((value) => dispatch(actionCreators.addMessage(value)));
    setQuery('');
  };

  const getTime = (time) => {
    const minutes = new Date(+time).getMinutes().toString();
    return `${new Date(+time).getHours()}:${minutes.length === 2 ? minutes : (`0${minutes}`)}`;
  };

  return (
    <>
      {updatedUser.messages.map((message) => (
        <div
          className="messages__item message"
          style={message.sent && { justifyContent: 'flex-end' }}
          key={message.id}
        >
          <div className={`message__content message__content--${message.sent ? 'sent' : 'received'}`}>
            <span className="message__text">
              {message.received || message.sent}
            </span>
            <p className="message__info">
              <span className="message__time">{Number.isNaN(+message.time) ? message.time : getTime(+message.time)}</span>
              {message.sent && (
                <img
                  src={`./images/${message.read}.svg`}
                  alt=""
                  className="message__status"
                />
              )}
            </p>
          </div>
        </div>
      ))}
      <form
        className="messages__input input"
        onSubmit={addData}
      >
        <input
          type="text"
          id="message-input"
          className="input__item"
          placeholder="Write a message"
          value={query}
          onChange={({ target }) => setQuery(target.value.trimLeft())}
        />
        <button
          type="submit"
          className={classNames('input__send', { 'input__send--active': query })}
        >
          <label htmlFor="message-input" className="input__label">
            {!query
              ? (
                <img src={nonActiveLabel} alt="non-active-label" />
              ) : (
                <>
                  <img src={halfLabel} alt="active-label" />
                  <img src={halfLabel} alt="active-label" className="input__label--second" />
                </>
              )}
          </label>
        </button>
      </form>
    </>
  );
};

Dialog.propTypes = {
  interlocutorId: PropTypes.string.isRequired,
};
