import { AppDispatch } from "../../types/types";
import { request, setCookie, getCookie, deleteCookie } from "../../utils/utils";

//Восстановление пароля. Отправка email
export const EMAIL_REQUEST: 'EMAIL_REQUEST' = 'EMAIL_REQUEST';
export const EMAIL_SUCCESS: 'EMAIL_SUCCESS' = 'EMAIL_SUCCESS';
export const EMAIL_FAILED: 'EMAIL_FAILED' = 'EMAIL_FAILED';
//Авторизация
export const LOGIN_REQUEST: 'LOGIN_REQUEST' = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';
export const LOGIN_FAILED: 'LOGIN_FAILED' = 'LOGIN_FAILED';
//Регистрация
export const REG_REQUEST: 'REG_REQUEST' = 'REG_REQUEST';
export const REG_SUCCESS: 'REG_SUCCESS' = 'REG_SUCCESS';
export const REG_FAILED: 'REG_FAILED' = 'REG_FAILED';
//Выход
export const LOGOUT_REQUEST: 'LOGOUT_REQUEST' = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED: 'LOGOUT_FAILED' = 'LOGOUT_FAILED';
//Обновление токена
export const TOKEN_REQUEST: 'TOKEN_REQUEST' = 'TOKEN_REQUEST';
export const TOKEN_SUCCESS: 'TOKEN_SUCCESS' = 'TOKEN_SUCCESS';
export const TOKEN_FAILED: 'TOKEN_FAILED' = 'TOKEN_FAILED';
//Получение информации о пользователе
export const GET_USER_REQUEST: 'GET_USER_REQUEST' = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS';
export const GET_USER_FAILED: 'GET_USER_FAILED' = 'GET_USER_FAILED';
//Изменение информации о пользователе
export const CHANGE_USER_REQUEST: 'CHANGE_USER_REQUEST' = 'CHANGE_USER_REQUEST';
export const CHANGE_USER_SUCCESS: 'CHANGE_USER_SUCCESS' = 'CHANGE_USER_SUCCESS';
export const CHANGE_USER_FAILED: 'CHANGE_USER_FAILED' = 'CHANGE_USER_FAILED';
//Запись последнего адреса URL
export const SAVE_LAST_URL: 'SAVE_LAST_URL' = 'SAVE_LAST_URL';
//Запрос восстановления пароля
export const FORGOT_PASSWORD: 'FORGOT_PASSWORD' = 'FORGOT_PASSWORD';
//Восстановление пароля
export const RESET_PASSWORD_REQUEST: 'RESET_PASSWORD_REQUEST' = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED' = 'RESET_PASSWORD_FAILED';
//Изменение информации пользователя
export const CHANGE_USERINFO_REQUEST: 'CHANGE_USERINFO_REQUEST' = 'CHANGE_USERINFO_REQUEST';
export const CHANGE_USERINFO_SUCCESS: 'CHANGE_USERINFO_SUCCESS' = 'CHANGE_USERINFO_SUCCESS';
export const CHANGE_USERINFO_FAILED: 'CHANGE_USERINFO_FAILED' = 'CHANGE_USERINFO_FAILED';

export type TAuthActions =
  | ISaveLastUrlAction
  | IForgotPasswordAction
  | IEmailRequestAction
  | IEmailSuccessAction
  | IEmailErrorAction
  | ILoginRequestAction
  | ILoginSuccessAction
  | ILoginErrorAction
  | IRegRequestAction
  | IRegSuccessAction
  | IRegErrorAction
  | ILogoutRequestAction
  | ILogoutSuccessAction
  | ILogoutErrorAction
  | ITokenRequestAction
  | ITokenSuccessAction
  | ITokenErrorAction
  | IGetUserRequestAction
  | IGetUserSuccessAction
  | IGetUserErrorAction
  | IChangeUserRequestAction
  | IChangeUserSuccessAction
  | IChangeUserErrorAction
  | IChangeUserInfoRequestAction
  | IChangeUserInfoSuccessAction
  | IChangeUserInfoErrorAction
  | IResetPasswordRequestAction
  | IResetPasswordSuccessAction
  | IResetPasswordErrorAction

export interface ISaveLastUrlAction {
  readonly type: typeof SAVE_LAST_URL,
  readonly data: string
}
export interface IForgotPasswordAction {readonly type: typeof FORGOT_PASSWORD}
export interface IEmailRequestAction {readonly type: typeof EMAIL_REQUEST}
export interface IEmailSuccessAction {readonly type: typeof EMAIL_SUCCESS}
export interface IEmailErrorAction {readonly type: typeof EMAIL_FAILED}
export interface ILoginRequestAction {readonly type: typeof LOGIN_REQUEST}
export interface ILoginSuccessAction {readonly type: typeof LOGIN_SUCCESS, readonly data:{
  user:{
    email:string,
    name:string
  },
  accessToken:string,
  refreshToken:string
}}
export interface ILoginErrorAction {readonly type: typeof LOGIN_FAILED}
export interface IRegRequestAction {readonly type: typeof REG_REQUEST}
export interface IRegSuccessAction {readonly type: typeof REG_SUCCESS, readonly data:{
  accessToken:string,
  refreshToken:string
}}
export interface IRegErrorAction {readonly type: typeof REG_FAILED}
export interface ILogoutRequestAction {readonly type: typeof LOGOUT_REQUEST}
export interface ILogoutSuccessAction {readonly type: typeof LOGOUT_SUCCESS}
export interface ILogoutErrorAction {readonly type: typeof LOGOUT_FAILED}
export interface ITokenRequestAction {readonly type: typeof TOKEN_REQUEST}
export interface ITokenSuccessAction {readonly type: typeof TOKEN_SUCCESS, readonly data:{
  accessToken:string,
  refreshToken:string
}}
export interface ITokenErrorAction {readonly type: typeof TOKEN_FAILED}
export interface IGetUserRequestAction {readonly type: typeof GET_USER_REQUEST}
export interface IGetUserSuccessAction {readonly type: typeof GET_USER_SUCCESS, readonly data:{
  user:{
    email:string,
    name:string
  }
}}
export interface IGetUserErrorAction {readonly type: typeof GET_USER_FAILED}
export interface IChangeUserRequestAction {readonly type: typeof CHANGE_USER_REQUEST}
export interface IChangeUserSuccessAction {readonly type: typeof CHANGE_USER_SUCCESS}
export interface IChangeUserErrorAction {readonly type: typeof CHANGE_USER_FAILED}
export interface IChangeUserInfoRequestAction {readonly type: typeof CHANGE_USERINFO_REQUEST}
export interface IChangeUserInfoSuccessAction {readonly type: typeof CHANGE_USERINFO_SUCCESS, readonly data:{
  user:{
    email:string,
    name:string
  }
}}
export interface IChangeUserInfoErrorAction {readonly type: typeof CHANGE_USERINFO_FAILED}
export interface IResetPasswordRequestAction {readonly type: typeof RESET_PASSWORD_REQUEST}
export interface IResetPasswordSuccessAction {readonly type: typeof RESET_PASSWORD_SUCCESS}
export interface IResetPasswordErrorAction {readonly type: typeof RESET_PASSWORD_FAILED}

export const postEmail = (email:string) => {
  return function (dispatch:AppDispatch) {
    dispatch({
      type: EMAIL_REQUEST
    });
    request("password-reset", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": email
      })
    })
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: EMAIL_SUCCESS
          });
        } else {
          dispatch({
            type: EMAIL_FAILED
          });
        }
      })
      .catch(error => {
        dispatch({
          type: EMAIL_FAILED
        });
        console.log(error);
      });
  };
}

//Авторизация
export const login = (email:string,password:string) => {
  return function (dispatch:AppDispatch) {
    dispatch({
      type: LOGIN_REQUEST
    });
    request("auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": email,
        "password": password
      })
    })
      .then(res => {
        if (res && res.success) {
          if (res.accessToken) {
            deleteCookie('token');
            setCookie('token', res.refreshToken);
          }
          dispatch({
            type: LOGIN_SUCCESS,
            data: res
          });
        } else {
          dispatch({
            type: LOGIN_FAILED
          });
        }
      })
      .catch(error => {
        dispatch({
          type: LOGIN_FAILED
        });
        console.log(error);
      });
  };
}

//Регистрация
export const registration = (name:string,email:string,password:string) => {
  return function (dispatch:AppDispatch) {
    dispatch({
      type: TOKEN_REQUEST
    });
    request("auth/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": email,
        "password": password,
        "name": name
      })
    })
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: TOKEN_SUCCESS,
            data: res.data
          });
        } else {
          dispatch({
            type: TOKEN_FAILED
          });
        }
      })
      .catch(error => {
        dispatch({
          type: TOKEN_FAILED
        });
        console.log(error);
      });
  };
}

//Выход
export const logout = (token:string) => {
  return function (dispatch:AppDispatch) {
    dispatch({
      type: LOGOUT_REQUEST
    });
    request("auth/logout", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "token": token,
      })
    })
      .then(res => {
        if (res && res.success) {
          deleteCookie('token');
          dispatch({
            type: LOGOUT_SUCCESS,
          });
        } else {
          dispatch({
            type: LOGOUT_FAILED
          });
        }
      })
      .catch(error => {
        dispatch({
          type: LOGOUT_FAILED
        });
        console.log(error);
      });
  };
}

//Обновление токена
export const refreshToken = () => {
  return async function (dispatch:AppDispatch) {
    dispatch({
      type: TOKEN_REQUEST
    });
    try {
      return await request("auth/token", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "token": getCookie('token'),
        })
      })
        .then(res => {
          if (res && res.success) {
            dispatch({
              type: TOKEN_SUCCESS,
              data: res
            });
            deleteCookie('token');
            setCookie('token', res.refreshToken);
          } else {
            dispatch({
              type: TOKEN_FAILED
            });
          }
        })
    }
    catch (error) {
      dispatch({
        type: TOKEN_FAILED
      });
      return console.log(error);
    };
  };
}

//Получение информации о пользователе
export const getUserRequest = (token:string) => {
  return function (dispatch:AppDispatch) {
    dispatch({
      type: GET_USER_REQUEST
    });
    request("auth/user", {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        /*         Authorization: 'Bearer ' + getCookie('token') */
        Authorization: token
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer'
    })
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            data: res
          });
        }
      })
      .catch(error => {
        dispatch({
          type: GET_USER_FAILED
        });
        console.log(error);
      });
  };
}

//Запись последнего адреса страницы
export const saveLastUrl = (path: string): ISaveLastUrlAction => ({
  type: SAVE_LAST_URL,
  data: path
})

//Запрос восстановления пароля
export const forgotPassword = (): IForgotPasswordAction => ({
  type: FORGOT_PASSWORD,
})

//Авторизация
export const resetPassword = (password:string,code:string) => {
  return function (dispatch:AppDispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST
    });
    request("password-reset/reset", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "password": password,
        "token": code
      })
    })
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: RESET_PASSWORD_SUCCESS,
            data: res
          });
        } else {
          dispatch({
            type: RESET_PASSWORD_FAILED
          });
        }
      })
      .catch(error => {
        dispatch({
          type: RESET_PASSWORD_FAILED
        });
        console.log(error);
      });
  };
}

//Изменение информации пользователя
export const changeUserInfo = (name:string,email:string,valuePassword:string, token:string) => {
  const password = valuePassword === '******' ? null : valuePassword;
  return function (dispatch:AppDispatch) {
    dispatch({
      type: CHANGE_USERINFO_REQUEST
    });
    request("auth/user", {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify({
        "name": name,
        "email": email,
        "password": password
      })
    })
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: CHANGE_USERINFO_SUCCESS,
            data: res
          });
        } else {
          dispatch({
            type: CHANGE_USERINFO_FAILED
          });
        }
      })
      .catch(error => {
        dispatch({
          type: CHANGE_USERINFO_FAILED
        });
        console.log(error);
      });
  };
}
