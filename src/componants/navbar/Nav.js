import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import ExploreIcon from '@mui/icons-material/Explore';
import ViewListIcon from '@mui/icons-material/ViewList';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from "react-router-dom";
import classes from './nav.module.css'

const Nav = () => {
  const navigate = useNavigate()
  const gotopro = () => {
    navigate('/Profile')
  }
  const goto = () => {
     navigate('/Signin')
  }
  const gotohome = () => {
    navigate('/')
 }
 const somehow = () => {
  navigate('/Blank')
}

  return (
    <nav className={classes.navbar}>
      <img className={classes.logo}src="https://ferasjobeir.com/frontend-app/static/media/logo.1bb8db420e540d66b7c4a6a8350ca833.svg"/>
      <ul className={classes.icons}>
        <span><HomeIcon/><li onClick={gotohome}>Home</li></span>
        <span><EmailIcon/><li onClick={somehow}>Messages</li></span>
        <span><BookmarksIcon/><li onClick={somehow}>Bookmarks</li></span>
        <span><ExploreIcon/><li ><a href="https://www.google.com">Explore</a></li></span>
        <span><ViewListIcon/><li onClick={somehow}>Lists</li></span>
        <span><PersonIcon/><li onClick={gotopro}>Profile</li></span>
        <span><LockIcon/><li onClick={goto}>Sign Out</li></span>
      </ul>
    </nav>
  );
};

export default Nav;
