import { SET_INFO} from "../constant/user";
const initialState = {
  user:false,
};
export let userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_INFO:
      return { ...state, user: payload };

    default:
      return state;
  }
};


