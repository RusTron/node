import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import chats from '../../images/chatting.svg';
import search from '../../images/search.svg';
import points from '../../images/points.svg';
import phone from '../../images/phone.svg';
import camera from '../../images/camera.svg';
import './Header.scss';

export const Header = () => {
  const [inputVisible, setInputVisible] = useState(false);
  const interlocutorId = useSelector(({ users }) => users.interlocutorId);

  const user = useSelector(({ users }) => (
    users.users.filter((person) => person.id.toString() === interlocutorId)[0]));

  return (
    <header className="header">
      <div className="header__tabs tabs">
        <div className="tabs__tab" />
        <div className="tabs__tab">
          <div className="tabs__tab--active">
            <img
              src={chats}
              alt="search"
              className="tabs__item"
            />
            <span className="tabs__text">Chats</span>
          </div>
        </div>
        <div className="tabs__tab tabs__tab--long" />
      </div>
      <div className="header__chat">
        <div className="header__item">
          <div className="header__search search">
            <input
              type="text"
              id="user-search"
              className={!inputVisible ? 'search__input' : 'search__input--active'}
              onClick={() => setInputVisible(true)}
            />
            <label
              htmlFor="user-search"
              className="search__label"
            >
              <img
                src={search}
                alt=""
                className="search__image"
              />
            </label>
            <img
              src={points}
              alt=""
              className="search__points"
            />
          </div>
          <div className="header__interlocutor interlocutor">
            <div className="interlocutor__info">
              {user && (
                <>
                  {user.image
                    ? (<img src={user.image} alt="" className="interlocutor__photo" />)
                    : (<div className="interlocutor__no-photo">{user.name[0]}</div>)}
                  <div className="interlocutor__contact">
                    <span>{user.name}</span>
                    <span>(532)256-35-25</span>
                  </div>
                </>
              )}
            </div>
            <div className="interlocutor__actions">
              <img src={search} alt="search" className="interlocutor__action" />
              <img src={phone} alt="phone" className="interlocutor__action" />
              <img src={camera} alt="camera" className="interlocutor__action" />
              <img src={points} alt="menu" className="interlocutor__action" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
