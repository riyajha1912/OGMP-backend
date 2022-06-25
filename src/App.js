import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Nav from "./Nav";
import AskQuery from "./components/askQuery";
import Queries from "./components/queryList";
import Login from "./components/login";
import Signup from "./components/signup";

function App() {
  const userInfo = localStorage.getItem("user");
  // const [isLoggedIn, setIsLoggedIn] = React.useState(
  //   localStorage.getItem("user")
  // );
  // const login = () => {
  //   setIsLoggedIn(localStorage.getItem("user"));
  // };

  // const logout = () => {
  //   setIsLoggedIn("");
  //   localStorage.clear();
  //   console.log(isLoggedIn);
  // };
  return (
    <div>
      <Nav />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/askQuery" element={<AskQuery />} />
          <Route path="/queries" element={<Queries />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Queries />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
