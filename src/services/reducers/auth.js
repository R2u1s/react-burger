import {
  EMAIL_REQUEST,
  EMAIL_SUCCESS,
  EMAIL_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REG_REQUEST,
  REG_SUCCESS,
  REG_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  TOKEN_REQUEST,
  TOKEN_SUCCESS,
  TOKEN_FAILED
} from "../actions/auth";

const initialState = {
  email: '',
  password: '',
  name: '',
  accessToken: '',
  refreshToken: '',

  postEmailRequest: false,
  postEmailFailed: false,
  loginRequest: false,
  loginFailed: false,
  regRequest: false,
  regFailed: false,
  logoutRequest: false,
  logoutFailed: false,
  tokenRequest: false,
  tokenFailed: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {

    //Восстановление пароля
    case EMAIL_REQUEST: {
      return {
        ...state,
        postEmailRequest: true
      };
    }
    case EMAIL_SUCCESS: {
      return {
        ...state,
        postEmailFailed: false,
        postEmailRequest: false
      };
    }
    case EMAIL_FAILED: {
      return {
        ...state,
        postEmailFailed: true,
        postEmailRequest: false
      };
    }
    //Авторизация
    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
/*         email: action.data.user.email,
        name: action.data.user.name, */
        accessToken: action.data.accessToken,
        refreshToken: action.data.refreshToken,

        loginFailed: false,
        loginRequest: false
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        loginFailed: true,
        loginRequest: false
      };
    }
    //Регистрация
    case REG_REQUEST: {
      return {
        ...state,
        regRequest: true
      };
    }
    case REG_SUCCESS: {
      return {
        ...state,
        accessToken: action.data.accessToken,
        refreshToken: action.data.refreshToken,

        regFailed: false,
        regRequest: false
      };
    }
    case REG_FAILED: {
      return {
        ...state,
        regFailed: true,
        regRequest: false
      };
    }
    //Авторизация
    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutFailed: false,
        logoutRequest: false
      };
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        logoutFailed: true,
        logoutRequest: false
      };
    }
    //Обновление токена
    case TOKEN_REQUEST: {
      return {
        ...state,
        tokenRequest: true
      };
    }
    case TOKEN_SUCCESS: {
      return {
        ...state,
        accessToken: action.data.accessToken,
        refreshToken: action.data.refreshToken,
        tokenFailed: false,
        tokenRequest: false
      };
    }
    case TOKEN_FAILED: {
      return {
        ...state,
        tokenFailed: true,
        tokenRequest: false
      };
    }
    default: {
      return state;
    }
  }
};

