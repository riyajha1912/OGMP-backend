import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QueryDataService from "../services/queries";

const Signup = () => {
  const Navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [eno, setEno] = useState("");
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [exists, setExists] = useState(false);
  const userInfo = { username, eno, course, email, password };

  useEffect(() => {
    localStorage.setItem("user-info", JSON.stringify(userInfo));
  }, [userInfo]);

  const registration = async (e) => {
    const data = { username, eno, course, email, password };
    await QueryDataService.addUser(data).then((response) => {
      localStorage.setItem("user", JSON.stringify(response.data.query));
    });
    return Navigate("/queries");
  };

  const checkUser = async (e) => {
    await QueryDataService.checkUser(eno).then((response) => {
      if (response.data.totalResults === 1) {
        setExists(true);
      } else {
        registration();
      }
    });
  };
  const NavigateTo = () => {
    Navigate("/");
  };
  return (
    <div>
      {exists ? (
        <div>
          <h3>User Exists! Please Log In</h3>
          <button className="btn btn-success form-outline" onClick={NavigateTo}>
            Login Page
          </button>
        </div>
      ) : (
        <div>
          <h1>SIGNUP</h1>
          <div className="row col-sm-4 offset-3">
            <input
              type="text"
              value={username}
              className="form-control"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="Enter Name"
            />
          </div>
          <br />
          <div className="row col-sm-4 offset-3">
            <input
              type="text"
              value={email}
              className="form-control"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter Email"
            />
          </div>
          <br />
          <div className="row col-sm-4 offset-3">
            <input
              type="text"
              className="form-control"
              value={eno}
              onChange={(e) => {
                setEno(e.target.value);
              }}
              placeholder="Enter Enrolment No."
            />
          </div>
          <br />
          <div className="row col-sm-4 offset-3">
            <input
              type="text"
              className="form-control"
              value={course}
              onChange={(e) => {
                setCourse(e.target.value);
              }}
              placeholder="Enter Course"
            />
          </div>
          <br />
          <div className="row col-sm-4 offset-3">
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Enter Password"
            />
          </div>
          <br />
          <div className="row col-sm-2 offset-4">
            <button
              type="button"
              className="btn btn-success"
              onClick={checkUser}
            >
              Register
            </button>{" "}
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
