import {
  SETINTERLOCUTOR,
  SETUSERS,
  ADDMESSAGE,
} from '../../variables';

export const actionCreators = {
  setUsers: (users) => ({
    type: SETUSERS,
    users,
  }),
  setInterlocutorId: (id) => ({
    type: SETINTERLOCUTOR,
    interlocutorId: id,
  }),
  addMessage: (newMessage) => ({
    type: ADDMESSAGE,
    newMessage,
  }),
};

const updateUser = (user, newMessage) => {
  user.messages.push(newMessage.message);
  return { ...user, time: newMessage.message.time };
};

const updateUsers = (users, newMessage) => {
  const updatedUsers = [...users];
  const updatedUser = updateUser(users.find((user) => user.id === +newMessage.userId), newMessage);
  updatedUsers[users.findIndex((user) => user.id === +newMessage.userId)] = { ...updatedUser };
  return updatedUsers.sort((a, b) => b.time - a.time);
};

const initialState = {
  interlocutorId: '',
  users: [],
  newMessage: {},
};

const usersReducer = (state = initialState, action) => {
  let users = [];
  switch (action.type) {
    case SETINTERLOCUTOR:
      return {
        ...state,
        interlocutorId: action.interlocutorId,
      };
    case SETUSERS:
      return {
        ...state,
        users: [...action.users.users],
      };
    case ADDMESSAGE:
      users = [...updateUsers(state.users, action.newMessage)];

      return {
        ...state,
        users: [...users],
        interlocuterId: action.newMessage.userId,
      };
    default:
      return state;
  }
};

export default usersReducer;
