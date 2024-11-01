// redux/reducer.js
import * as actionTypes from "./../actionTypes";

const initialState = {
  isLoading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
