import ACTIONS from "./index";
import axios from "axios";

export const dispatchLogin = () => {
  return {
    type: ACTIONS.LOGIN,
  };
};

export const fetchTeacher = async (token) => {
  const res = await axios.get("/teacher/infor", {
    headers: { Authorization: token },
  });
  return res;
};

export const dispatchGetTeacher = (res) => {
  return {
    type: ACTIONS.GET_TEACHER,
    payload: {
      teacher: res.data,
      isAdmin: res.data.role === 1 ? true : false,
    },
  };
};
