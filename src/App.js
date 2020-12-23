import React, { useEffect } from 'react';
import { Header } from './components/Header';
import './App.scss';

function App() {
  useEffect(() => {
    async function fetchData() {
      const res = await fetch('http://localhost:5000/api');
      const data = await res.json();
      console.log(data);
    }
    fetchData();
  }, []);

  return (
    <Header />
  );
}

export default App;
