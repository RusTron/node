import React, { useState } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../../store/reducers/usersReducer';
import { sendData } from '../../api';
import nonActiveLabel from '../../images/non-active.svg';
import halfLabel from '../../images/half-label.svg';
import './Form.scss';

export const Form = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const interlocutorId = useSelector(({ users }) => users.interlocutorId);

  const addData = (e) => {
    e.preventDefault();
    const time = Date.now();
    sendData(query, interlocutorId, time)
      .then((res) => res.data)
      .then((value) => dispatch(actionCreators.addMessage(value)));
    setQuery('');
  };

  return (
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
  );
};
