import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { Dialog } from '../Dialog';
import './MessagesList.scss';

export const MessagesList = () => {
  const interlocutorId = useSelector(({ users }) => users.interlocutorId);

  return (
    <div className="messages">
      <div className="messages__body">
        {interlocutorId && (
          <Route
            path="/:interlocutorId?"
            component={Dialog}
          />
        )}
      </div>
    </div>
  );
};
