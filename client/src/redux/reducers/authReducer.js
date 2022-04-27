import ACTIONS from "../actions";

const initialState = {
  teacher: [],
  isLogged: false,
  isAdmin: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return {
        ...state,
        isLogged: true,
      };
    case ACTIONS.GET_TEACHER:
      return {
        ...state,
        teacher: action.payload.teacher,
        isAdmin: action.payload.isAdmin,
      };
    default:
      return state;
  }
};

export default authReducer;
