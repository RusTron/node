import { STARTLOADING, FINISHLOADING } from '../../variables';

export const loadingActions = {
  startLoading: () => ({ type: STARTLOADING }),
  finishLoading: () => ({ type: FINISHLOADING }),
};

const loadingReducer = (state = true, action) => {
  debugger;//eslint-disable-line
  switch (action.type) {
    case STARTLOADING:
      return true;
    case FINISHLOADING:
      return false;

    default:
      return state;
  }
};

export default loadingReducer;
