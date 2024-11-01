import * as actionTypes from "./../actionTypes.jsx";

const loaderStatus = (isLoading) => ({
  type: actionTypes.SET_LOADING,
  payload: isLoading,
});

export { loaderStatus };
