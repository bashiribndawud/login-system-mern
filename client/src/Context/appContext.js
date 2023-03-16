import React, { createContext, useContext, useReducer } from "react";

export const userContext = createContext(null);

const initialState = {
  user: null,
  active: false,
  username: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "DELETE_USER":
      return {
        ...state,
        user: null,
      };
    case "SET_USERNAME":
      return {
        ...state,
        username: action.username,
      };
    default:
      return state;
  }
}

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <userContext.Provider value={{ state, dispatch }}>
      {children}
    </userContext.Provider>
  );
};

export const useStateValue = () => useContext(userContext);
