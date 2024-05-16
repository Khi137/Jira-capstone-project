import { SET_PROJECTDATA } from "../constant/project";

const initialState = {
  // projectDataRedux: false,
  projectDataRedux:[],
};

export let projectReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_PROJECTDATA:
      return { ...state, projectDataRedux: payload };
    default:
      return state;
  }
};
