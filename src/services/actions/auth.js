import { request, setCookie, getCookie } from "../../utils/utils";

//Восстановление пароля. Отправка email
export const EMAIL_REQUEST = 'EMAIL_REQUEST';
export const EMAIL_SUCCESS = 'EMAIL_SUCCESS';
export const EMAIL_FAILED = 'EMAIL_FAILED';
//Авторизация
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
//Регистрация
export const REG_REQUEST = 'REG_REQUEST';
export const REG_SUCCESS = 'REG_SUCCESS';
export const REG_FAILED = 'REG_FAILED';
//Выход
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';
//Обновление токена
export const TOKEN_REQUEST = 'TOKEN_REQUEST';
export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
export const TOKEN_FAILED = 'TOKEN_FAILED';
//Получение информации о пользователе
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';
//Изменение информации о пользователе
export const CHANGE_USER_REQUEST = 'CHANGE_USER_REQUEST';
export const CHANGE_USER_SUCCESS = 'CHANGE_USER_SUCCESS';
export const CHANGE_USER_FAILED = 'CHANGE_USER_FAILED';
//Запись последнего адреса URL
export const SAVE_LAST_URL = 'SAVE_LAST_URL';
//Запрос восстановления пароля
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
//Восстановление пароля
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';
//Изменение информации пользователя
export const CHANGE_USERINFO_REQUEST = 'CHANGE_USERINFO_REQUEST';
export const CHANGE_USERINFO_SUCCESS = 'CHANGE_USERINFO_SUCCESS';
export const CHANGE_USERINFO_FAILED = 'CHANGE_USERINFO_FAILED';
//Запись refreshToken из Cookie
export const SAVE_TOKEN_FROM_COOKIE = 'SAVE_TOKEN_FROM_COOKIE';


export const postEmail = (email) => {
  return function (dispatch) {
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
          console.log(res);
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
export const login = (data) => {
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST
    });
    request("auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": data.valueEmail,
        "password": data.valuePassword
      })
    })
      .then(res => {
        if (res && res.success) {
          if (res.accessToken) {
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
export const registration = (data) => {
  return function (dispatch) {
    dispatch({
      type: TOKEN_REQUEST
    });
    request("auth/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": data.valueEmail,
        "password": data.valuePassword,
        "name": data.valueName
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
export const logout = (token) => {
  return function (dispatch) {
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
  return async function (dispatch) {
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
export const getUserRequest = (token) => {
  return function (dispatch) {
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
export const saveLastUrl = (path) => ({
  type: SAVE_LAST_URL,
  data: path
})

//Запрос восстановления пароля
export const forgotPassword = () => ({
  type: FORGOT_PASSWORD,
})

//Авторизация
export const resetPassword = (data) => {
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST
    });
    request("password-reset/reset", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "password": data.valuePassword,
        "token": data.valueCode
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
export const changeUserInfo = (data, token) => {
  const password = data.valuePassword === '******' ? null : data.valuePassword;
  return function (dispatch) {
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
        "name": data.valueName,
        "email": data.valueEmail,
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

export const saveTokenFromCookie = () => ({
  type: SAVE_TOKEN_FROM_COOKIE,
  data: getCookie('token')
});