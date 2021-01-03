import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { Dialog } from '../Dialog';
import './MessagesList.scss';

export const MessagesList = () => {
  const interlocutorId = useSelector(({ users }) => users.interlocutorId);
  console.log(interlocutorId);
  return (
    <div className="messages">
      <div className="messages__body">
        {interlocutorId && (
          <Route path={`/${interlocutorId}`}>
            <Dialog interlocutorId={interlocutorId} />
          </Route>
        )}
      </div>
    </div>
  );
};
