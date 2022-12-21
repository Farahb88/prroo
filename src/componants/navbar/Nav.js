import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import ExploreIcon from '@mui/icons-material/Explore';
import ViewListIcon from '@mui/icons-material/ViewList';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { NavLink} from "react-router-dom";
import classes from './nav.module.css'
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { useState } from 'react';
const Nav = () => {
  const {token} = useContext(AuthContext)
    const navigate = useNavigate()
    const [isActive, setIsActive] = useState(false);
    const [Active, setActive] = useState(false);
    const handleClick = () => {
      setIsActive(current => !current);}
      const handleClick2 = () => {
        setActive(current => !current);}
    
const links = [
  {
      target: '/',
      text: 'Home'
  },
  {
    target: '/profile',
    text: 'profile'
},]

  return (
    <nav className={classes.navbar}>
      <img className={classes.logo}src="https://ferasjobeir.com/frontend-app/static/media/logo.1bb8db420e540d66b7c4a6a8350ca833.svg"/>
      <ul className={classes.icons}>
      <span><NavLink to="/" className={classes.bar}><div style={{display:"flex",
        justifyContent: "space-between",
        gap: '3px'}}><div><HomeIcon/></div><div></div>Home</div> </NavLink></span>
        <span><EmailIcon/><li >Messages</li></span>
        <span><BookmarksIcon/><li >Bookmarks</li></span>
        <span><ExploreIcon/><li ><a href="https://www.google.com">Explore</a></li></span>
        <span><ViewListIcon/><li >Lists</li></span>
        <span><NavLink to='/profile' classname={classes.bar2} ><div  style={{display:"flex",
        justifyContent: "space-between",
        gap: '3px'}}><div><PersonIcon/></div><div>Profile</div> </div></NavLink></span>
        <span><LockIcon/><li onClick={()=>navigate('/signout')}>Sign Out</li></span>
      </ul>
    </nav>
  );
};

export default Nav;
