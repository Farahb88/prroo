import "./tweet.css";
import moment from "moment/moment";
import Gravatar from "react-gravatar";
import { ChatBubbleOutline, FavoriteBorder } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const Tweets = () => {
  const { token } = useContext(AuthContext);
  const [tweets, setTweets] = useState([]);
  let [count, setCount] = useState(1);

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
  return (
    <>
      <div className="mytweet">
        <h1 className="home">Home</h1>
        <div className="mysmg"></div>
        <div>
          <Gravatar
            className="pic"
            email="farahb88@gmail.com"
            size={80}
            style={{
              borderRadius: "80px",
              marginLeft: "4px",
              marginTop: 3,
            }}
          />
          <input
            className="textmsg"
            type="text"
            placeholder="what is going on"
          ></input>
          <input className="msgbtn" type="button" value="create post"></input>
        </div>
      </div>

      <div className="tweetbox">
        {tweets?.length > 0 &&
          tweets.map((tweet, i) => {
            return (
              <div key={i} className="posts">
                <img id="avatar" src={tweet.user.avatar} />
                <div>
                  <h3>{tweet.user.name}</h3>
                  <div>{tweet.created_at}</div>
                  <p>{tweet.content}</p>
                  <div className="likecomenticons">
                    <span className="likecoment">
                      <FavoriteBorder />
                      <input type="button" value={tweet.likes_count}></input>
                    </span>
                    <span className="likecoment">
                      <ChatBubbleOutline />
                      <input type="button" value={tweet.comments_count}></input>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        <input
          type="button"
          className="button"
          value="load more"
          onClick={tweetload}
        ></input>
      </div>
    </>
  );
};

export default Tweets;
