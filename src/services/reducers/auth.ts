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
  TOKEN_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  SAVE_LAST_URL,
  FORGOT_PASSWORD,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  CHANGE_USERINFO_REQUEST,
  CHANGE_USERINFO_SUCCESS,
  CHANGE_USERINFO_FAILED,
  TAuthActions
} from "../actions/auth";

type TAuthState = {
  email: string | null,
  password: string,
  name: string | null,
  accessToken: string,
  refreshToken: string,

  authRequest: boolean,
  authFailed: boolean,

  lastURL: string,
  forgotPassword: boolean
};

const initialState: TAuthState = {
  email: null,
  password: '******',
  name: null,
  accessToken: '',
  refreshToken: '',

  authRequest: false,
  authFailed: false,

  lastURL: '',
  forgotPassword: false
};

export const authReducer = (state = initialState, action:TAuthActions):TAuthState => {
  switch (action.type) {

    //Восстановление пароля
    case EMAIL_REQUEST: {
      return {
        ...state,
        authRequest: true
      };
    }
    case EMAIL_SUCCESS: {
      return {
        ...state,
        authFailed: false,
        authRequest: false
      };
    }
    case EMAIL_FAILED: {
      return {
        ...state,
        authFailed: true,
        authRequest: false
      };
    }
    //Авторизация
    case LOGIN_REQUEST: {
      return {
        ...state,
        authRequest: true
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        email: action.data.user.email,
        name: action.data.user.name,
        accessToken: action.data.accessToken,
        refreshToken: action.data.refreshToken,

        authFailed: false,
        authRequest: false
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        authFailed: true,
        authRequest: false
      };
    }
    //Регистрация
    case REG_REQUEST: {
      return {
        ...state,
        authRequest: true
      };
    }
    case REG_SUCCESS: {
      return {
        ...state,
        accessToken: action.data.accessToken,
        refreshToken: action.data.refreshToken,

        authFailed: false,
        authRequest: false
      };
    }
    case REG_FAILED: {
      return {
        ...state,
        authFailed: true,
        authRequest: false
      };
    }
    //Авторизация
    case LOGOUT_REQUEST: {
      return {
        ...state,
        authRequest: true
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        name: '',
        email: '',
        password: '******',
        accessToken:'',
        refreshToken:'',
        authFailed: false,
        authRequest: false
      };
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        authFailed: true,
        authRequest: false
      };
    }
    //Обновление токена
    case TOKEN_REQUEST: {
      return {
        ...state,
        authRequest: true
      };
    }
    case TOKEN_SUCCESS: {
      return {
        ...state,
        accessToken: action.data.accessToken,
        refreshToken: action.data.refreshToken,
        authFailed: false,
        authRequest: false
      };
    }
    case TOKEN_FAILED: {
      return {
        ...state,
        authFailed: true,
        authRequest: false
      };
    }
    //Запрос информации пользователя
    case GET_USER_REQUEST: {
      return {
        ...state,
        authRequest: true
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        email: action.data.user.email,
        name: action.data.user.name,

        authFailed: false,
        authRequest: false
      };
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        authFailed: true,
        authRequest: false
      };
    }
    case SAVE_LAST_URL: {
      return {
        ...state,
        lastURL: action.data
      };
    }
    case FORGOT_PASSWORD: {
      return {
        ...state,
        forgotPassword: !state.forgotPassword
      };
    }
    //Авторизация
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        authRequest: true
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotPassword: !state.forgotPassword,

        authFailed: false,
        authRequest: false
      };
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        authFailed: true,
        authRequest: false
      };
    }
    //Изменение информации пользователя
    case CHANGE_USERINFO_REQUEST: {
      return {
        ...state,
        authRequest: true
      };
    }
    case CHANGE_USERINFO_SUCCESS: {
      return {
        ...state,
        email: action.data.user.email,
        name: action.data.user.name,

        authFailed: false,
        authRequest: false
      };
    }
    case CHANGE_USERINFO_FAILED: {
      return {
        ...state,
        authFailed: true,
        authRequest: false
      };
    }
    default: {
      return state;
    }
  }
};

