import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState, useRef } from "react";
import clsses from './comments.module.css';
import moment from "moment";
import { fontFamily } from "@mui/system";


const Farah = ({id}) => {
  
  const [comments, setcommentts] = useState([]);
  const comentRef = useRef();
  const [right, setRight] = useState(false);
  const [com, setCom] = useState('');
  const { token } = useContext(AuthContext);

  const fillcoment = (e) => {
    setCom(e.target.value)
  };
  const daysss = comments.created_at;

  const createcom = async () => {
    console.log(com)
    const respo = await fetch('http://ferasjobeir.com/api/comments', {
      method: "post",
      headers: {
        "Content-Type": `application/json`,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content: com,
        post_id: id
      }),
      
    });

    const json12 = await respo.json();
    if (json12.success) {
      const postData = [json12.data, ...comments];
      comentRef.current.value = "";
      setcommentts(postData);
    }
  };
  const addcoment = async (e) => {
    await createcom(com);
  };

  
  useEffect(()=>{
    allComents();
  },[])

    const allComents = async () => {
      const allres = await fetch(`http://ferasjobeir.com/api/posts/${id}`, {
        method: "get",
        headers: {
          "Content-Type": `application/json`,
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await allres.json();
      setcommentts(json.data.comments);
      console.log(comments);
      console.log("fofo");
    }    
     return (
        <div style={{
          width: '556px'
        }}>
            <div className="coment"style={{  display: 'flex' , flexDirection: "column"}} >
              <div>
                {comments?.length > 0 &&
                  comments.map((coment, i) => ( 
                    <div className="SinglPost">
                    <div
                      style={{
                        display: "flex",
                        borderBottom: "2px solid #f3f4f5",
                        fontFamily: "Medium",
                        padding: "10px 15px",
                        marginBottom: "8px",
                        
                      }}
                    >
                      <img
                        style={{
                          borderRadius: "50%",
                          height: "50px",
                          marginRight: "15px",
                          width: "50px",
                        }}
                        src={coment.user.avatar}
                      />
                      <div>
                        <div style={{
                         fontWeight: '600',
                        }} className="name">{coment.user.name}</div>
                        <div style={{
                          fontSize: '13px',
                          fontWeight: '200',
                          fontFamily:'Poppins',
                          color:'#6c757d',
                        }} className="mb-2">{moment(daysss).startOf("hh").fromNow()}</div>
                        <p style={{
                          fontWeight: "400",
                          fontSize: "20px"
                        }} className="post mb-0">{coment.content}</p>
                      </div>
                    </div>
                  </div>
                  ))
                }
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
              }}>
              <input className={`${clsses.texto}  `} type="text" name="content" ref={comentRef} placeholder="right something" onChange={fillcoment}></input>
              <button className="btn btn-primary w-25 me-5" onClick={() => addcoment()}>Add</button>
              </div>
            </div>
        </div>
      );
}

export default Farah;



