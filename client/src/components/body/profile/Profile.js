import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { isLength, isMatch } from "../../utils/validation/Validation";
import "./profile.css";
import {
  showSuccessMsg,
  showErrMsg,
} from "../../utils/notifications/Notification";

import {
  fetchAllTeachers,
  dispatchGetAllTeachers,
} from "../../../redux/actions/teachersActions";
import Header from "../../header/Header";
import SideBar from "../../../Backoffice/SideBar";

const initialState = {
  name: "",
  password: "",
  cf_password: "",
  err: "",
  success: "",
};

function Profile() {
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const teachers = useSelector((state) => state.teachers);

  const { teacher, isAdmin } = auth;
  const [data, setData] = useState(initialState);
  const { name, password, cf_password, err, success } = data;
  const [avatar, setAvatar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    if (isAdmin) {
      fetchAllTeachers(token).then((res) => {
        dispatch(dispatchGetAllTeachers(res));
      });
    }
  }, [teacher, token, isAdmin, dispatch, callback]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };
  const changeAvatar = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      if (!file)
        return setData({ ...data, err: "No files were uploaded", success: "" });
      if (file.size > 2000 * 2000)
        return setData({ ...data, err: "Size too large", success: "" });
      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/png" &&
        file.type !== "image/gif"
      )
        return setData({
          ...data,
          err: "File format is incorrect",
          success: "",
        });
      var formData = new FormData();
      formData.append("file", file);
      setLoading(true);

      const res = await axios.post("/api/upload_avatar", formData, {
        headers: {
          Authorization: token,
        },
      });
      setLoading(false);
      setAvatar(res.data.url);
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const updateInfor = () => {
    try {
      axios.patch(
        "/teacher/update",
        {
          name: name ? name : teacher.name,
          avatar: avatar ? avatar : teacher.avatar,
        },
        {
          headers: { Authorization: token },
        }
      );
      setData({ ...data, err: "", success: "Updated Success" });
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };
  const updatePassword = () => {
    if (isLength(password))
      return setData({
        ...data,
        err: "password must be in last 6 caracters",
        success: "",
      });
    if (!isMatch(password, cf_password))
      return setData({ ...data, err: "Password did not match", success: "" });

    try {
      axios.post(
        "/teacher/reset",
        { password },
        {
          headers: { Authorization: token },
        }
      );
      setData({ ...data, err: "", success: "Updated Success" });
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };
  const handleUpdate = () => {
    if (name || avatar) updateInfor();
    if (password) updatePassword();
  };

  const handleDelete = async (id) => {
    try {
      if (teacher._id !== id) {
        if (window.confirm("Are you sure you want to delete this account?")) {
          setLoading(true);
          await axios.delete(`/teacher/delete/${id}`, {
            headers: { Authorization: token },
          });
          setLoading(false);
          setCallback(!callback);
        }
      }
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <>
      <Header></Header>
      <SideBar></SideBar>
      <div>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        {loading && <h3>Loading.....</h3>}
      </div>
      <div className="profile_page">
        <div className="col-left">
          <h2>{isAdmin ? "Admin Profile" : "Teacher Profile"}</h2>
          <div className="avatar">
            <img src={avatar ? avatar : teacher.avatar} alt="" />
            <span>
              <i className="fas fa-camera"></i>
              <p>Change</p>
              <input
                type="file"
                name="file"
                id="file_up"
                onChange={changeAvatar}
              />
            </span>
          </div>
          <div className="form-froup">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={teacher.name}
              placeholder="Your name "
              onChange={handleChange}
            />
          </div>
          <div className="form-froup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              defaultValue={teacher.email}
              placeholder="Your email address "
              disabled
            />
          </div>
          <div className="form-froup">
            <label htmlFor="password"> New Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Your password "
              value={password}
              onChange={handleChange}
            />
          </div>
          <div className="form-froup">
            <label htmlFor="cf_password"> Confirm New Password</label>
            <input
              type="password"
              name="cf_password"
              id="cf_password"
              placeholder="Confirm password "
              value={cf_password}
              onChange={handleChange}
            />
          </div>

          <button disabled={loading} onClick={handleUpdate}>
            Update
          </button>
        </div>
        <div className="col-right">
          <h2> {isAdmin ? "My Orders" : "Teachers"} </h2>
          <div style={{ overflowX: "auto" }}>
            <table className="customers">
              <thead>
                <tr>
                  <th>Avatar</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Admin</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher) => (
                  <tr>
                    <td>
                      {" "}
                      <img
                        src={teacher.avatar}
                        style={{ borderRadius: "40px", height: "80px" }}
                        alt=""
                      />{" "}
                    </td>
                    <td>{teacher.name}</td>
                    <td>{teacher.email}</td>
                    <td>
                      {teacher.role === 1 ? (
                        <i className="fas fa-check" title="admin"></i>
                      ) : (
                        <i className="fas fa-times" title="teacher"></i>
                      )}
                    </td>
                    <td>
                      <Link to={`/edit_teacher/${teacher._id}`}>
                        <i className="fas fa-edit" title="Edit"></i>
                      </Link>
                      <i
                        className="fas fa-trash-alt"
                        title="Remove"
                        onClick={() => handleDelete(teacher._id)}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
