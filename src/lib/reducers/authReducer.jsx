// redux/reducer.js
import * as actionTypes from "./../actionTypes";

const initialState = {
  isLoading: false,
  UserInfoData: null,
  ResponseMessage: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case actionTypes.GET_USER_INFO_SUCCESS:
      return {
        ...state,
        UserInfoData: action.payload,
        ResponseMessage: action.message,
      };

    case actionTypes.GET_USER_INFO_FAIL:
      return {
        ...state,
        UserInfoData: action.payload,
        ResponseMessage: action.message,
      };

    default:
      return state;
  }
};

export default authReducer;
