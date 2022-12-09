import { useContext, useState, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./profile.css";
import Nav from "../../componants/navbar/Nav";

const Profile = () => {
  const { user, token } = useContext(AuthContext);
  const [data, setUserData] = useState(user);
  const picRef = useRef();
  const updateProfile = async (e) => {
    e.preventDefault();
    const form = e.target;
    const newData = new FormData(form);
    for (var key of newData.keys()) {
      console.log(key, newData.get(key));
    }

    const response = await fetch("http://ferasjobeir.com/api/users/me", {
      method: "post",
      body: newData,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: `application/json`,
      },
    });
    const json = await response.json();
    console.log(json);
  };
  return (
    <div className="profilebox">
      <Nav />
      <div>
        <h1>Profile</h1>

        <div className="info">My Information</div>

        <input type="file" className="photo" style={{ display: "none" }} />

        <div>
          <form onSubmit={updateProfile}>
            <label htmlFor="name">
              Name <span style={{ color: "red" }}>*</span>
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={data.name}
              onChange={(e) => {
                setUserData({
                  ...data,
                  name: e.target.value,
                });
              }}
            ></input>
            <label htmlFor="email">
              Email <span style={{ color: "red" }}>*</span>
            </label>
            <input
              id="email"
              type="text"
              name="email"
              value={data.email}
              onChange={(e) => {
                setUserData({
                  ...data,
                  email: e.target.value,
                });
              }}
            ></input>
            <label htmlFor="password">Password</label>
            <input
              required="required"
              id="password"
              type="password"
              name="password"
              value={data.password}
              onChange={(e) => {
                setUserData({
                  ...data,
                  password: e.target.value,
                });
              }}
            ></input>
            <label htmlFor="newpassword"> New Password</label>
            <input
              id="newpassword"
              type="password"
              name="new_password"
              onChange={(e) => {
                setUserData({
                  ...data,
                  newpassword: e.target.value,
                });
              }}
            ></input>
            <label htmlFor="newpasswordconf"> New Password Confirmation</label>
            <input
              id="newpasswordconf"
              type="password"
              name="new_password_confirmation"
              onChange={(e) => {
                setUserData({
                  ...data,
                  newpasswordconf: e.target.value,
                });
              }}
            ></input>
            <input type="hidden" name="_method" value="put" />
            <button type="submit"> update profile </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
