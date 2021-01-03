import axios from 'axios';
import { actionCreators } from '../store/reducers/usersReducer';

export const api = process.env.REACT_APP_API_URL;

export const fetchData = async (dispatch) => {
  const res = await fetch(`${api}/api/messages`);
  const data = await res.json();
  dispatch(actionCreators.setUsers(data));
};

export const sendData = (query, interlocutorId) => (
  axios.post(`${api}/api/messages`, {
    query,
    id: interlocutorId,
  })
);
