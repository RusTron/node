import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import usersReducer from './reducers/usersReducer';
import loadingReducer from './reducers/loadingReducer';

const rootReducer = combineReducers({
  users: usersReducer,
  loading: loadingReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
