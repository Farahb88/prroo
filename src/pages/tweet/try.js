import React, { useState } from "react";
import moment from "moment/moment";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import classes from "../../pages/home.module.css";
import { AuthContext } from "../../context/AuthContext";
import { useEffect, useContext,  } from "react";
import Comments from "../Comments";
const Post = ({
  id,
  avatar,
  name,
  content,
  likes_count,
  comments_count,
  createdAt,
}) => {
  const [comentts, setmycomentts] = useState([])
  
  const Comments = async() =>{
    const { token } = useContext(AuthContext);
            const respo = await fetch('http://ferasjobeir.com/api/posts/1019', {
              method: "get",
              headers: {
                "Content-Type": `application/json`,
                Authorization: `Bearer ${token}`,
              },
            });
            const json = await respo.json();
          
            
          setmycomentts(json.data.comments)
           }
           Comments()
          console.log(comentts)
          console.log("hi") 
          
         
 const [open, setOpen] = useState(false);

  return (
    <div className={classes.post} key={id}>
      <img src={avatar}></img>
      <div className={classes.writings}>
        <h3>{name}</h3>
        <h6>{moment(createdAt).startOf("hh").fromNow()}</h6>
        <p>{content}</p>

        <div className={classes.iconandcomm}>
          <div><span className={classes.heart1}>
            <FavoriteBorderIcon />
            <input type="button" value={likes_count}></input>
          </span>
          </div>
          <div >
            <span    className={classes.heart}>
            <ChatBubbleOutlineIcon />
            <input type="button"  onClick={() => setOpen(!open)} value={comments_count}></input>
          </span>
          </div>
          </div> 
      
      {open && (
        <div className={classes.commentpart}
          style={{
            height: 200,
          
          }}>
            <p>
              {comentts?.length>0 &&
              comentts.map((coment,i) =>{
                return(
                  <div key={i}>
                  
                    <label>{coment.user.name}</label>
                    <label>{coment.content}</label>
                  </div>
                )
              })}
            </p>

      
        

        </div>
      )}
      </div> 
    </div>
  );
};

export default Post;