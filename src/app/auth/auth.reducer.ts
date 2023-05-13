
import { AuthActions, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from "./auth.actions";


export interface State{
  isAuthenticated: boolean;
}

const initialState: State ={
  isAuthenticated: false,
};

export function authReducer(state = initialState, action: AuthActions){
  switch(action.type){
    case SET_AUTHENTICATED:
      return {
        isAuthenticated: true
      };

    case SET_UNAUTHENTICATED:
      return {
        isAuthenticated: false
      };

    default:
      return state;
  }
};

export const getIsAuth = (state: State) => state.isAuthenticated;


/*
export interface State{
  isAuthenticated: boolean;
  // isUnauthenticated: boolean;
}

const initialState: State ={
  isAuthenticated: false,
  // isUnauthenticated: false
};

export function authReducer(state = initialState, action: AuthActions){
  switch(action.type){
    case SET_AUTHENTICATED:
      return {
        isAuthenticated: true,
        // isUnauthenticated: false
      };

    case SET_UNAUTHENTICATED:
      return {
        // isAuthenticated: true,
        isUnauthenticated: false
      };

    default:
      return state;
  }
}; */
