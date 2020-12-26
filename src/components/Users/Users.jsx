import React from 'react';
import './Users.scss';

export const Users = () => (
  <div className="users">
    <div className="users__item">
      <img
        src=""
        alt=""
        className="users__item-image"
      />
      <div className="users__item-text">
        <span className="users__item-name">Gregor Webb</span>
        <span className="users__item-text">I have done it already</span>
      </div>
      <span className="users__item-time">11:00</span>
    </div>
  </div>
);
