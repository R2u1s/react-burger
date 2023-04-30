import {
  OPEN_MODAL,
  CLOSE_MODAL
} from "../actions/modal";

const initialState = {
  isModalOpen: false
}

export const modalReducer = (state = initialState, action) => {
  console.log('modalReducer');
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        ...state,
        isModalOpen: true
      };
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        isModalOpen: false
      };
    }
    default: {
      return state;
    }
  }
};