import { Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";

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
        <Route path="/"element={<Suspense><Home/></Suspense>}></Route>
        <Route path="/Signup" element={<Suspense><SignUp/></Suspense>}></Route>
        <Route path="/Signin" element={<Suspense><SignIn/></Suspense>}></Route>
        <Route path="/Signout" element={<Suspense><SignOut/></Suspense>}></Route>
        <Route path="/Profile" element={<Suspense><Profile/></Suspense>}></Route>
        <Route path="/Tweet" element={<Suspense><Tweets/></Suspense>}></Route>
      </Routes>
    </>
  );
}

export default App;
