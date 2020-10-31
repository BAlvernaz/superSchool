import { GET_SCHOOLS } from "../reducers/actions";

export const schoolReducer = (state = [], action) => {
  switch (action.type) {
    case GET_SCHOOLS:
      state = [...state, ...action.schools];
      break;
  }
  return state;
};
