import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import ExploreIcon from "@mui/icons-material/Explore";
import ViewListIcon from "@mui/icons-material/ViewList";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { NavLink } from "react-router-dom";
import classes from "./nav.module.css";
import { useNavigate } from "react-router-dom";
const Nav = () => {
  const navigate = useNavigate();

  const links = [
    {
      target: "/",
      text: "Home",
    },
    {
      target: "/messages",
      text: "Messages",
    },
    {
      target: "/bookmarks",
      text: "Bookmarks",
    },
    {
      target: "/https://www.google.com",
      text: "Explore",
    },
    {
      target: "/lists",
      text: "Lists",
    },
    {
      target: "/profile",
      text: "profile",
    },
  ];

  return (
    <nav className={classes.navbar}>
      <img
        className={classes.logo}
        src="https://ferasjobeir.com/frontend-app/static/media/logo.1bb8db420e540d66b7c4a6a8350ca833.svg"
      />
      <ul className={classes.icons}>
        <span>
          <NavLink to="/" className={classes.bar}>
            <li
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "8px",
              }}
            >
              <div>
                <HomeIcon />
              </div>
              <div>Home</div>
            </li>
          </NavLink>
        </span>
        <span>
          <NavLink to="/messages" className={classes.bar}>
            <li
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "8px",
              }}
            >
              <div>
                <EmailIcon />
              </div>
              <div>Messages</div>
            </li>
          </NavLink>
        </span>
        <span>
          <NavLink to="/bookmarks" className={classes.bar}>
            <li
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "8px",
              }}
            >
              <div>
                <BookmarksIcon />
              </div>
              <div>Bookmarks</div>
            </li>
          </NavLink>
        </span>
        <span>
          <NavLink to="https://www.google.com"className={classes.bar}>
            <li
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "8px",
              }}>
                <ExploreIcon/>
              <div>Explore</div>
            </li>
            </NavLink>
        </span>
        <span>
          <NavLink to="/lists" className={classes.bar}>
            <li
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "8px",
              }}
            >
              <div>
                <ViewListIcon />
              </div>
              <div>Lists</div>
            </li>
          </NavLink>
        </span>
        <span>
          <NavLink to="/profile" classname={classes.bar2}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "8px",
              }}
            >
              <div>
                <PersonIcon />
              </div>
              <div>Profile</div>
            </div>
          </NavLink>
        </span>
        <span>
           <li
              onClick={() => navigate("/signout")}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "8px",
              }}>
              <div>
                <LockIcon />
              </div>
              <div>Sign Out</div>
            </li>
        </span>
      </ul>
    </nav>
  );
};

export default Nav;
