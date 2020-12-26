import React, { useState } from 'react';
import chats from '../../images/chatting.svg';
import search from '../../images/search.svg';
import points from '../../images/points.svg';
import './Header.scss';

export const Header = () => {
  const [inputVisible, setInputVisible] = useState(false);

  return (
    <header className="header">
      <div className="header__tabs">
        <div className="header__tabs-tab" />
        <div className="header__tabs-tab header__tabs-active">
          <img
            src={chats}
            alt=""
            className="header__tabs-chart"
          />
          <span className="header__tabs-text">Chats</span>
        </div>
        <div className="header__search">
          <input
            type="text"
            id="user-search"
            className={!inputVisible ? 'header__search-input' : 'header__search-active'}
            onClick={() => setInputVisible(true)}
          />
          <label
            htmlFor="user-search"
            className="header__search-lable"
          >
            <img
              src={search}
              alt=""
              className="header__search-image"
            />
          </label>
          <img
            src={points}
            alt=""
            className="header__search-points"
          />
        </div>
      </div>
    </header>
  );
}
