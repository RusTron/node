import axios from 'axios';
import { actionCreators } from '../store/reducers/usersReducer';

export const api = process.env.REACT_APP_API_URL;

export const fetchData = async (dispatch) => {
  try {
    const res = await fetch(`${api}/api/messages`);
    const data = await res.json();
    dispatch(actionCreators.setUsers(data));
  } catch (e) {
    window.alert('Try again');
  }
};

export const sendData = (query, interlocutorId, time) => (
  axios.post(`${api}/api/messages`, {
    time,
    query,
    id: interlocutorId,
  })
);
