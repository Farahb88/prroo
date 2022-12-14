import Nav from "./Nav";
import "./wrapper.css";

const Wrapper = (props) => {
  return (
    <div
      style={{
        display: "flex",
      }}
      className="parent"
    >
      <header>
        <div className="navbar">
          <Nav />
        </div>
      </header>
      <div className="child">
        <h1>{props.title}</h1>
        {props.children}
      </div>
    </div>
  );
};
export default Wrapper;
