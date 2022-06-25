import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import QueryDataService from "../services/queries";

const AskQuery = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [query, setQuery] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState("");
  const [submitted, setSubmitted] = useState();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user-info"));
    if (user) {
      setUser(true);
      QueryDataService.getUser(user.eno, user.password).then((res) => {
        setUserInfo(res.data.query);
      });
    }

    QueryDataService.getSubjects().then((res) => {
      setSubjects(res.data);
    });
  }, []);
  const name = userInfo.Name;
  const eno = userInfo.Eno;
  const email = userInfo.Email;

  const data = { name, eno, email, subject, query };

  const SetSubject = (e) => {
    setSubject(e.target.value);
  };

  const SetQuery = (e) => {
    setQuery(e.target.value);
  };

  const Navigate = (nav) => {
    return navigate(nav);
  };

  const submit = async (e) => {
    await QueryDataService.createQuery(data).then((response) => {
      const status = response.data.status;
      if (status === "success") {
        setSubmitted(true);
      } else {
        setSubmitted(false);
      }
    });
    if (submitted) {
      return navigate("/queries");
    }
  };

  return (
    <div>
      {user ? (
        <div style={{ paddingTop: "3rem", paddingLeft: "5rem" }}>
          <input
            className="row col-sm-4 offset-3"
            type="text"
            name="name"
            value={userInfo.Name}
            style={{ padding: "0.5rem" }}
            disabled
          />
          <br />
          <input
            className="row col-sm-4 offset-3"
            type="text"
            name="eno"
            value={userInfo.Eno}
            style={{ padding: "0.5rem" }}
            disabled
          />
          <br />
          <input
            className="row col-sm-4 offset-3"
            type="text"
            name="email"
            value={userInfo.Email}
            style={{ padding: "0.5rem" }}
            disabled
          />
          <br />

          <select
            className="form-select mb-3 offset-4"
            aria-label="form-select example"
            style={{ width: "10rem", padding: "0.5rem" }}
            onClick={(e) => {
              SetSubject(e);
            }}
          >
            {subjects.map((sub) => {
              return (
                <option className="form-select" value={sub}>
                  {sub}
                </option>
              );
            })}
          </select>

          <textarea
            className="form-control offset-3"
            rows="4"
            name="query"
            onChange={(e) => {
              SetQuery(e);
            }}
            placeholder="Enter Query"
            style={{ width: "23rem" }}
          />
          <button
            className="btn btn-success offset-6"
            onClick={submit}
            style={{ marginTop: "1rem" }}
          >
            Submit
          </button>
        </div>
      ) : (
        <div>
          <h3>You need to login first!</h3>
          <button className="btn btn-success" onClick={() => Navigate("/")}>
            Log In
          </button>
        </div>
      )}
    </div>
  );
};

export default AskQuery;
