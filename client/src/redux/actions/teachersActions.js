import ACTIONS from "./index";
import axios from "axios";

export const fetchAllTeachers = async (token) => {
  const res = await axios.get("/teacher/all_infor", {
    headers: { Authorization: token },
  });
  return res;
};

export const dispatchGetAllTeachers = (res) => {
  return {
    type: ACTIONS.GET_ALL_TEACHERS,
    payload: res.data,
  };
};
