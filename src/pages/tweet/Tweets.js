import classes from "./Tweet.module.css";
import {
  ChatBubbleOutline,
  FavoriteBorder,
  ShowChart,
} from "@mui/icons-material";
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import Nav from "../../componants/navbar/Nav";
import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import moment from "moment/moment";
import Farah from "./Comments";
import { NavItem } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";


const Tweets = () => {
  const { token, user } = useContext(AuthContext);
  const [data, setUserData] = useState(user);
  const [tweets, setTweets] = useState([]);
  let [count, setCount] = useState(1);
  const [post, setPosts] = useState({ content: "" });
  const filltext = (e) => {
    post[e.target.name] = e.target.value;
  };
  const tweetRef = useRef();

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
    if (count <= 1000) {
      setCount(count + 1);
    }
  };
  console.log(tweets);

//   const gotohome = () => {
//     navigate('/')
//  }
//  const gotopro = () => {
//   navigate('/Profile')
// }
// const goto = () => {
//   navigate('/Signin')
// }

  return (
    <>
    <div className={classes.head}>
      <div><h4>Home</h4></div>
      <div className={classes.hidden}>
      <div className={classes.hidden1}><HomeIcon/></div>
      <div className={classes.hidden1}><PersonIcon/></div>
      <div className={classes.hidden1}><LockIcon/></div>
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
            <div key={i} style={{
              width: '100%'
            }} className="mb-4">
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
                   <div style={{
                    display: 'flex',
                    flexDirection: 'column'
                   }}>
                    <div className="icons d-flex align-items-center">
                      <button className="me-3 border rounded border bg-light py-1 px-2 d-flex align-items-center">
                        <FavoriteBorder />
                        {tweet.likes_count}
                      </button>

                      <button
                        onClick={() => setOpen({ id: tweet.id, open: true })}
                        className="border rounded border bg-light py-1 px-2 d-flex align-items-center"
                      >
                        <ChatBubbleOutline />
                        {tweet.comments_count}
                      </button>
                      </div> 
                      <div className="d-flex">
                        {show.open && show.id == tweet.id && (
                          <Farah id={tweet.id} />
                        )}<br/> 
                      </div>
                   
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      <input
        type="button"
        className="btn btn-primary"
        value="load more"
        onClick={tweetload}
      ></input>
    </>
  );
};

export default Tweets;
