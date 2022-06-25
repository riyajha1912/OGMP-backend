import React, { useState, useEffect } from "react";
import QueryDataService from "../services/queries.js";
import { useNavigate } from "react-router-dom";

const QueryList = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [queryExists, setQueryExists] = useState(false);
  const [subject, setSubject] = useState(["All Subjects"]);
  const [queries, setQueries] = useState([]);
  const [searchSubject, setSearchSubject] = useState();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user-info"));
    if (user) {
      setUser(true);
      QueryDataService.getAll(user.eno)
        .then((response) => {
          setQueries(response.data.query);
          console.log(queries);
        })

        .catch((e) => {
          console.log(e.message);
          return { error: e.message };
        });
    }
    retrieveQueries();
  }, []);

  const retrieveQueries = () => {
    console.log(queries);
    if (queries.filter["Query"] === "") {
      setQueryExists(false);
    } else {
      setQueryExists(true);
    }
  };
  const OnChangeSearchSubject = (e) => {
    setSearchSubject(e.target.value);
  };
  const findBySubject = (grievance) => {
    QueryDataService.find(grievance)
      .then((response) => {
        setQueries(response.data.query);
      })
      .catch((e) => {
        return { error: e.message };
      });
  };

  function Navigate(nav) {
    return navigate(nav);
  }

  function askQuery(e) {
    e.preventDefault();

    return Navigate("/askQuery", {});
  }
  return (
    <div>
      {user ? (
        <div>
          {queryExists ? (
            <div>
              <div className="row">
                <div className="col">
                  <form>
                    <select
                      className="form-select form-outline mb-4"
                      onChange={(e) => OnChangeSearchSubject(e)}
                    >
                      {queries.map((query) => {
                        const sub = `${query.Subject}`;
                        return (
                          <option value={sub} className="dropdown-item">
                            {sub}
                          </option>
                        );
                      })}
                    </select>
                  </form>
                </div>
              </div>
              <div className="row">
                {queries.map((query) => {
                  const Sub = `${query.Subject}`;
                  return (
                    <div className="col-lg-4 pb-1">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">{Sub}</h5>
                          <p className="card-text">
                            <strong>Query: </strong>
                            {query.Query}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>{" "}
            </div>
          ) : (
            <div>
              <h3>No Queries Asked Yet !</h3>
              <button
                className="btn btn-success"
                onClick={(e) => {
                  askQuery(e);
                }}
              >
                Ask One?
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h3>You need to login first!</h3>
          <button
            className="btn btn-success"
            onClick={(e) => {
              Navigate("/");
            }}
          >
            Log In
          </button>
        </div>
      )}
    </div>
  );
};

export default QueryList;
