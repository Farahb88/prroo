import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./tweet.css";

const Tweets = () => {
  const { token } = useContext(AuthContext);
  const [tweets, setTweets] = useState([]);
  let [count, setCount] = useState(1);

  useEffect(() => {
    const getTweets = async (count) => {
      const response = await fetch(
        `http://ferasjobeir.com/api/posts?${count}`,
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
      <div>
        {tweets?.length > 0 &&
          tweets.map((tweet, i) => {
            return (
              <div key={i} className="posts">
                <img id="avatar" src={tweet.user.avatar} />

                <h1>{tweet.user.name}</h1>
                <div>{tweet.content}</div>
                <div>{tweet.likes_count}</div>
                <div>{tweet.comments_count}</div>
              </div>
            );
          })}
      </div>
      <input
        type="button"
        className="button"
        value="load more"
        onClick={tweetload}
      ></input>
    </>
  );
};

export default Tweets;
