import classes  from './Home.module.css';
import Nav from "../../componants/navbar/Nav";
import Tweets from '../tweet/Tweets';

const Home = () => {
  return (
    <div className={classes.home}>
      <Nav/>
      <Tweets/>
    </div>
  );
};

export default Home;
