import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { Header } from './components/Header';
import { Users } from './components/Users';
import './App.scss';

// const socket = io('http://localhost:5000/api');
// console.log(socket);

function App() {
  useEffect(() => {
    async function fetchData() {
      const res = await fetch('http://localhost:5000/api');
      const data = await res.json();
      console.log(data);
    }
    fetchData();
  }, []);

  const connectSocket = () => {
    console.log(process.env.NODE_TASK_API_URL);
    io(process.env.NODE_TASK_API_URL);
  };
  return (
    <>
      <Header />
      <main className="main">
        <Users />
        <button
          type="button"
          onClick={connectSocket}
        >
          kjkjkjkj
        </button>
      </main>
    </>
  );
}

export default App;
