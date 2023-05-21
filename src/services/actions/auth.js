import { request } from "../../utils/utils";

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
          console.log(res);
          dispatch({
            type: LOGIN_SUCCESS,
            data: res.data
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
          console.log(res);
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
          console.log(res);
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
export const refreshToken = (token) => {
  return function (dispatch) {
    dispatch({
      type: TOKEN_REQUEST
    });
    request("auth/token", {
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
          console.log(res);
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