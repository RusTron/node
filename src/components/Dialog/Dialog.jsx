import React from 'react';
import { useSelector } from 'react-redux';
import { Form } from '../Form';
import './Dialog.scss';

export const Dialog = () => {
  const interlocutorId = useSelector(({ users }) => users.interlocutorId);
  const updatedUsers = useSelector(({ users }) => users.users);
  const updatedUser = updatedUsers.filter((person) => person.id.toString() === interlocutorId)[0];

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
      <Form />
    </>
  );
};
