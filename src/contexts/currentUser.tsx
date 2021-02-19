import React, {createContext, Dispatch, useReducer} from "react";

interface IState {
  isLoading: boolean;
  isLoggedIn: null | boolean;
  currentUser: null | any;
}

interface IAction {
  type: string;
  payload?: any;
}

interface IContext {
  state: IState;
  dispatch: Dispatch<IAction>;
}

const initialsState: IState = {
  isLoading: false,
  isLoggedIn: null,
  currentUser: null,
};

const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case "LOADING":
      return { ...state, isLoading: true };
    case "SET_AUTHORIZED":
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        currentUser: action.payload,
      };
    case "SET_UNAUTHORIZED":
      return { ...state, isLoggedIn: false };
    case "LOGOUT":
      return { ...initialsState, isLoggedIn: false };
    default:
      return state;
  }
};

export const CurrentUserContext = createContext({} as IContext);

export const CurrentUserProvider = ({ children, className}) => {
  const [state, dispatch] = useReducer(reducer, initialsState);
  return (
    <CurrentUserContext.Provider value={{state, dispatch}}>
      {children}
    </CurrentUserContext.Provider>
  );
};
