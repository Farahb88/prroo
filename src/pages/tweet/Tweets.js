import classes from "./Tweet.module.css";
import {
  ChatBubbleOutline,
  FavoriteBorder,
  Favorite,
} from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import moment from "moment/moment";
import {useNavigate } from "react-router-dom";
import Farah from "./Comments";
import "bootstrap/dist/css/bootstrap.css";
import Loading from "../../componants/loading/Loading";

const Tweets = () => {
  const { token, user } = useContext(AuthContext);
  const [data, setUserData] = useState(user);
  const [tweets, setTweets] = useState([]);
  let [count, setCount] = useState(1);
  const navigate = useNavigate();

  const [post, setPosts] = useState({ content: "" });
  const filltext = (e) => {
    post[e.target.name] = e.target.value;
  };
  const tweetRef = useRef();
  // const handleScroll = (tweetRef) => {
  //   window.scrollTo({
  //     top: tweetRef.offsetTop,
  //     left: 0,
  //     behavior: "smooth",
  //   });
  // };
  

  const [show, setOpen] = useState({
    open: false,
    id: 0,
  });

  const createPost = async () => {
    const respo = await fetch(`http://ferasjobeir.com/api/posts`, {
      method: "post",
      headers: {
        "Content-Type": `application/json`,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    });

    const json11 = await respo.json();
    if (json11.success) {
      const postData = [json11.data, ...tweets];
      tweetRef.current.value = "";
      setTweets(postData);
    }
  };
  const addonetweet = async (e) => {
    await createPost(post);
  };

  // } else {
  //   alert(json.messages);
  // }

  useEffect(() => {
    const getTweets = async (count) => {
      const response = await fetch(
        `http://ferasjobeir.com/api/posts?page=${count}`,
        {
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const json = await response.json();
      setTweets([...tweets, ...json.data.data]);
    };
    getTweets(count);
  }, [count]);
  const tweetload = () => {
    if (count <= 100) {
      setCount(count + 1);
    }
  };
  console.log(tweets);

  const gotohome = () => {
    navigate("/");
  };
  const gotopro = () => {
    navigate("/Profile");
  };
  const goto = () => {
    navigate("/Signin");
  };
  const [likes, setLikes] = useState({post_id: tweets.id});
  const likeUnlike = async (post) => {
    const respon = await fetch(`http://ferasjobeir.com/api/posts/${post.liked_by_current_user?'unlike':'like'}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          post_id: post.id,
        }),
      }
    );
    console.log(tweets);
    const json = await respon.json();
    if (json.success) {
      const newLike = [...tweets];
      const index = newLike.findIndex(
        singlePost => singlePost.id == json.data.id
      );
      newLike[index] = json.data;
      setTweets(newLike);
    }
    console.log(json.data)
  };
  return (
    <>
      <div className={classes.head}>
        <div>
          <h4 style={{
            marginLeft:"18px",
            borderBottom:'solid 1px #ced4da'
          }}>Home</h4>
        </div>
        <div className={classes.hidden}>
          <div className={classes.hidden1} onClick={gotohome}>
            <HomeIcon />
          </div>
          <div className={classes.hidden1} onClick={gotopro}>
            <PersonIcon />
          </div>
          <div className={classes.hidden1} onClick={goto}>
            <LockIcon />
          </div>
        </div>
      </div>

      <div className={classes.new}>
        <img src={data.avatar} />
        <div className={classes.textarea}>
          <textarea
            type="text"
            name="content"
            ref={tweetRef}
            placeholder="What is happening?"
            onChange={filltext}
          ></textarea>
          <button className="btn btn-primary" onClick={() => addonetweet()}>
            Create Post
          </button>
        </div>
      </div>
      {tweets?.length > 0 &&
        tweets.map((tweet, i) => {
          const daysss = tweet.created_at;
          return (
            <div
              key={i}
              style={{
                width: "100%",
              }}
              className="mb-4"
            >
              <div className={classes.post}>
                <div className={classes.postContent}>
                  <img src={tweet.user.avatar} />
                  <div>
                    <div className="mb-0">{tweet.user.name}</div>
                    <div className="mb-2">
                      {moment(daysss).startOf("hh").fromNow()}
                    </div>
                    <p>{tweet.content}</p>
                    <br></br>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div className="icons d-flex align-items-center">
                        <button
                          className="me-3 border rounded border bg-light py-1 px-2 d-flex align-items-center"
                          id={likes}onClick={() => likeUnlike(tweet)}>
                          <div>
                            {tweet.liked_by_current_user?<Favorite style={{ color: "red" }}/>:<FavoriteBorder/>}
                            {tweet.likes_count}
                          </div>
                        </button>
                        <button
                          className="border rounded border bg-light py-1 px-2 d-flex align-items-center"
                            onClick={() => setOpen({ id:tweet.id, open: true })}>
                              <ChatBubbleOutline />
                          <div>{tweet.comments_count}</div> 
                        </button>
                      </div>
                      <div className="d-flex" >
                        {show.open && show.id == tweet.id && (
                          <Farah id={tweet.id} />
                        )}
                        <br />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {
          <Loading />
        }
      <input
        type="button"
        className="btn btn-primary d-flex "
        // value="load more"
        onClick={tweetload}
        style={{
          display:"flex",
          flexDirection:"row",
          justifyContent:"center",
          alignItems:"center",
          marginLeft:"236px",
          marginTop:"-93px",
          backgroundColor:"white",
          border:"none"
        }}
      ></input>
    </>
  );
};

export default Tweets;
