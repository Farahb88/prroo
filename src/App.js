import { Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import Loading from "./componants/loading/Loading"


const SignUp = React.lazy(() => import("./pages/signup/Signup"));
const SignIn = React.lazy(() => import("./pages/signin/Signin"));
const SignOut = React.lazy(() => import("./pages/signout/SignOut"));
const Profile = React.lazy(() => import("./pages/profile/Profile"));
const Tweets = React.lazy(() => import("./pages/tweet/Tweets"));
const Home = React.lazy(() => import("./pages/Home/Home"));


function App() {
  return (
    <>
      <Routes>
        <Route path="/"element={<Suspense fallback={<Loading/>}><Home/></Suspense>}></Route>
        <Route path="/Signup" element={<Suspense fallback={<Loading/>}><SignUp/></Suspense>}></Route>
        <Route path="/Signin" element={<Suspense fallback={<Loading/>}><SignIn/></Suspense>}></Route>
        <Route path="/Signout" element={<Suspense fallback={<Loading/>}><SignOut/></Suspense>}></Route>
        <Route path="/Profile" element={<Suspense fallback={<Loading/>}><Profile/></Suspense>}></Route>
        <Route path="/Tweet" element={<Suspense fallback={<Loading/>}><Tweets/></Suspense>}></Route>
      </Routes>
    </>
  );
}

export default App;
