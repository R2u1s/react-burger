export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const openModal = () => {
  return function (dispatch) {
    dispatch({
      type: OPEN_MODAL
    });
  }
}

export const closeModal = () => {
  return function (dispatch) {
    dispatch({
      type: CLOSE_MODAL
    });
  }
}