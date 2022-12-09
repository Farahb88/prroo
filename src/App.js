import SignUp from "./pages/signup/Signup";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/signin/Signin";
import Home from "./pages/Home/Home";
import SignOut from "./pages/signout/SignOut";
import Profile from "./pages/profile/Profile";
import Tweets from "./pages/tweet/Tweets";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/Signup" element={<SignUp/>}></Route>
        <Route path="/Signin" element={<SignIn/>}></Route>
        <Route path="/Signout" element={<SignOut/>}></Route>
        <Route path="/Profile" element={<Profile/>}></Route>
        <Route path="/Tweet" element={<Tweets/>}></Route>
      </Routes>
    </>
  );
}

export default App;
