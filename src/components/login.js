import React, { useEffect, useState } from "react";
import QueryDataService from "../services/queries.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [userExists, setUserExists] = useState(true);
  const [user, setUser] = useState({ eno: "", password: "" });

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();

    await QueryDataService.getUser(user.eno, user.password)
      .then((response) => {
        if (response.data.query != null) {
          setUserExists(true);
          localStorage.setItem("user-info", JSON.stringify(user));
          {
            return navigate("/queries", {});
          }
        } else {
          setUserExists(false);
        }
      })
      .catch((e) => {
        return { error: e.message };
      });
  };
  const loginTry = () => {
    setUserExists(true);
    return navigate("/");
  };
  return (
    <div className="submit-form">
      {userExists ? (
        <div>
          <div
            className="form-group form-outline row col-sm-4 offset-4"
            style={{ marginTop: "11rem" }}
          >
            <label htmlFor="user">Enrolment No.</label>
            <input
              type="text"
              className="form-control form-outline"
              id="name"
              required
              onChange={handleInputChange}
              name="eno"
              style={{ padding: "0.5rem" }}
            />
          </div>
          <div className="form-group form-outline row col-sm-4 offset-4">
            <label htmlFor="id">Password</label>

            <input
              type="password"
              className="form-control form-outline "
              id="id"
              required
              onChange={handleInputChange}
              name="password"
              style={{ padding: "0.5rem" }}
            />
          </div>
          <br />
          <div className="form-outline  offset-5">
            <button
              className="btn btn-success form-outline col-sm-3"
              onClick={(e) => login(e)}
            >
              Login
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3>Enrolment No./Password don't match</h3>
          <button className="btn btn-succes" onClick={loginTry}>
            Try Again?
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
