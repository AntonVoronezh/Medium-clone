import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Authentication = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  useEffect(() => {
    if (!isSubmit) {
      return;
    }

    axios("https://conduit.productionready.io/api/users/login", {
      method: "post",
      data: {
        user: {
          email,
          password,
        },
      },
    })
      .then((res) => {
        console.log(res);
        setIsSubmit(false);
      })
      .catch((err) => {
        console.log(err);
        setIsSubmit(false);
      });
  });

  const emailHandler = (event) => setEmail(event.target.value);
  const passwordHandler = (event) => setPassword(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsSubmit(true);
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
                  disabled={isSubmit}
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
