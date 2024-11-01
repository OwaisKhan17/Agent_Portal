// lib/store.js
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { thunk } from "redux-thunk";
import rootReducer from "./reducers"; // Adjust the import based on your file structure

const store = createStore(rootReducer, applyMiddleware(thunk));

export const ReduxProvider = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);
