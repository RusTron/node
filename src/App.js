import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actionCreators } from './store/reducers/usersReducer';
import { loadingActions } from './store/reducers/loadingReducer';
import socket from './socket';
import { Header } from './components/Header';
import { Users } from './components/Users';
import { MessagesList } from './components/MessagesList';
import { fetchData } from './api';
import './App.scss';

function App() {
  const dispatch = useDispatch();

  const dispatchMessage = (messageFromSocket) => {
    dispatch(actionCreators.addMessage(messageFromSocket));
  };

  useEffect(() => {
    dispatch(fetchData);
    socket.on('Receive message', (messageFromSocket) => {
      dispatchMessage(messageFromSocket);
    });
    dispatch(loadingActions.finishLoading());
  }, []);

  return (
    <>
      <Header />
      <main className="main">
        <Users />
        <MessagesList />
      </main>
    </>
  );
}

export default App;
