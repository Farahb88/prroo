import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import classes from "./profile.module.css";
import Wrapper from "../../componants/navbar/wrapper";

const Profile = () => {
  const { user, token } = useContext(AuthContext);
  const [data, setUserData] = useState(user);
  const [mytweets, setmytweets] = useState([]);
  const [tws, settws] = useState ([]);
  
  console.log(data);
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
        'Authorization': `Bearer ${token}`,
        'Accept': `application/json`,
      },
    });
    const json = await response.json();
    console.log(json);
  }
  const deletemytweet = async (tws) => {
  const deletetweet = await fetch(`http://ferasjobeir.com/api/posts/${tws}`, {
    method: "DELETE",
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  const jsondelete = await deletetweet.json();
  console.log(jsondelete);
  if(jsondelete.success){
    const newtweet = [...mytweets]
    const i = newtweet.findIndex(tweet => tweet.id == tws)
    newtweet.splice(i, 1)
    setmytweets(newtweet)
}
}

  const profile = async(e) =>{
    const myres = await fetch("http://ferasjobeir.com/api/users/me", {
      method: "get",
      headers: { 'Authorization': `Bearer ${token}`},
    });
    const jsonmyres = await myres.json();
    setmytweets(jsonmyres.data.posts)

  }
  useEffect(()=>{profile()}, []);
  return (
    <Wrapper title="Profile">
  <div className={classes.propage}>
        <div className={classes.allprofile}>

          <div className={classes.info}>My Information</div>
          <div className={classes.pic}>
            <img src={data.avatar}></img>
            <input type="file" className={classes.photo} style={{ display: "none" }} />
          </div>
          <div className={classes.infobpx}>
            <form onSubmit={updateProfile} className={classes.myinfo}>
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
              <label htmlFor="newpasswordconf">
                {" "}
                New Password Confirmation
              </label>
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
              <button type="submit" className="btn btn-primary w-25" >
                {" "}
                update profile{" "}</button>
            </form>
            <div>
              <div className="info">My Posts</div>
              <div>
                {mytweets?.length > 0 &&
                  mytweets.map((mytweet, i) => {
                    return (
                      <div className={classes.tweetbtn}>
                        <h1>{mytweet.content}</h1>
                        <input type='button' className={classes.deletebtn} value='DELETE' onClick={()=>deletemytweet(mytweet.id)}/>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Profile;
