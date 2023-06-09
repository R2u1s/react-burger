// путь для cookie
import { PATH_MAIN } from "../components/App/App";

// 1 раз объявляем базовый урл
const BASE_URL = "https://norma.nomoreparties.space/api/";

// создаем функцию проверки ответа на `ok`
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  // не забываем выкидывать ошибку, чтобы она попала в `catch`
  return Promise.reject(`Ошибка ${res.status}`);
};

// создаем функцию проверки на `success`
const checkSuccess = (res) => {
  if (res && res.success) {
    return res;
  }
  // не забываем выкидывать ошибку, чтобы она попала в `catch`
  return Promise.reject(`Ответ не success: ${res}`);
};

// создаем универсальную фукнцию запроса с проверкой ответа и `success`
// В вызов приходит `endpoint`(часть урла, которая идет после базового) и опции
export const request = (endpoint, options) => {
  // а также в ней базовый урл сразу прописывается, чтобы не дублировать в каждом запросе
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
};

export function arrayToObject(array) {
  let object = {};
  array.forEach((item) => {
    object[item._id] = item;
  });
  return object;
}

export function moveIngredient(array, dragIndex, hoverIndex) {
  const dragCard = array[dragIndex];
  array.splice(dragIndex, 1);
  array.splice(hoverIndex, 0, dragCard)
  return array;
}

export function setCookie(name, value, props={}) {
  props = {
    path: PATH_MAIN,  //задаем корневой адрес для cookies
    ...props
  };
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name) {
  // Находим куку по ключу token, удаляем её значение, 
  // устанавливаем отрицательное время жизни, чтобы удалить сам ключ token
  setCookie(name, null, { expires: -1 });
}

export const sum = (arr) => {
  return arr.reduce(function (previousValue, item) {
    return previousValue + item;
  });
}

export function uniqueItem(arr) {
  return arr.reduce(function (prevVal, item) {
    if (!prevVal[item]) {
      // если ключа ещё нет в объекте, значит это первое повторение
      prevVal[item] = 1;
    } else {
      // иначе увеличим количество повторений на 1
      prevVal[item] += 1;
    }
  
    // и вернём изменённый объект
    return prevVal;
  }, {}); // Начальное значение — пустой объект.
  
}

export const getCurrentTimestamp = () => new Date().getTime() / 1000;

export function convertDate(date) {
  let orderDate = new Date(date);
  const now = new Date();

  let result ='';

  function day() {
    const difference = now.getUTCDate()-orderDate.getUTCDate();
    if(difference===0) {
      return 'Сегодня'
    } else {
      if (difference===1) {
        return 'Вчера'
      } else {
        if (difference>1) {
          return `${difference} дня назад`
        } else {
          return 'ошибка'
        }
      }
    }
  }

  result = day();
  const offset = () => {
    const temp = orderDate.getTimezoneOffset()/(-60);
    if (temp >= 0) {
      return `+${temp}`;
    } else {return `-${temp}`}
  }
  result = result + ', ' + orderDate.toLocaleTimeString().slice(0,5) + ' ' + 'i-GMT' + offset();


  return (result);
}