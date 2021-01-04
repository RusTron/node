import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import store from './store/store';
import './index.scss';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
