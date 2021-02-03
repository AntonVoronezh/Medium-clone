import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import useFetch from "../../hooks/useFetch";

const Authentication = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [{ isLoading, responce, error }, doFetch] = useFetch("/users/login");

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const emailHandler = (event) => setEmail(event.target.value);
  const passwordHandler = (event) => setPassword(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();

    doFetch({
      method: "post",
      data: {
        user: {
          email,
          password,
        },
      },
    });
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Login</h1>
            <p className="text-xs-center">
              <Link to="register">Need ad account? </Link>
            </p>
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    value={email}
                    onChange={emailHandler}
                    ref={inputRef}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    value={password}
                    onChange={passwordHandler}
                  />
                </fieldset>
                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                  disabled={isLoading}
                >
                  Sign in
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
