import ACTIONS from "../actions";

const teachers = [];

const teachersReducer = (state = teachers, action) => {
  switch (action.type) {
    case ACTIONS.GET_ALL_TEACHERS:
      return action.payload;
    default:
      return state;
  }
};

export default teachersReducer;
