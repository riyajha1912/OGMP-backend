import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const Navigate = useNavigate();
  const [Login, setLogin] = useState(false);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user-info"));
    if (user) {
      setLogin(true);
    }
  });
  const logout = () => {
    setLogin(false);
    localStorage.clear();
    Navigate("/");
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand navbar-dark bg-dark "
        style={{ padding: "1rem" }}
      >
        <a href="/queries" className="navbar-brand ">
          OGMP
        </a>

        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/queries"} className="nav-link">
              Queries
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/askQuery"} className="nav-link">
              Ask Query
            </Link>
          </li>
          <li className="nav-item">
            {Login ? (
              <a
                className="nav-link"
                style={{ cursor: "pointer" }}
                onClick={logout}
              >
                Logout
              </a>
            ) : (
              <Link to={"/"} className="nav-link">
                Login
              </Link>
            )}
          </li>
          <li className="nav-item">
            <Link to={"/signup"} className="nav-link">
              {" "}
              Sign Up{" "}
            </Link>
          </li>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
