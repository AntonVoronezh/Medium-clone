import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, Redirect } from "react-router-dom";

import { useFetch } from "../../hooks/useFetch";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { CurrentUserContext } from "../../contexts/currentUser";
import { BackendErrorMessages } from "./components/backendErrorMessages";

interface IProps {
  match: any;
}

const Authentication = (props: IProps): JSX.Element => {
  const isLogin: boolean = props.match.path === "/login";
  const pageTitle: string = isLogin ? "Sign In" : "Sign Up";
  const descriptionLink: string = isLogin ? "/register" : "/login";
  const descriptionText: string = isLogin
    ? "Need an account?"
    : "Have an account?";
  const apiUrl: string = isLogin ? "/users/login" : "/users";

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [isSuccessfulSubmit, setSuccessfulSubmit] = useState<boolean>(false);
  const [{ isLoading, response, error }, doFetch] = useFetch(apiUrl);
  const { setValue: setToken } = useLocalStorage("token");
  const { dispatch } = useContext(CurrentUserContext);

  const inputRef = useRef(null);

  useEffect(() => {
    // inputRef.current.focus();
  });

  useEffect(() => {
    if (!response) {
      return;
    }

    setToken(response.user.token);
    setSuccessfulSubmit(true);
    dispatch({ type: "SET_AUTHORIZED", payload: response.user });
  }, [response, setToken, dispatch, setSuccessfulSubmit]);

  const emailHandler = (event: React.SyntheticEvent<EventTarget>): void =>
    setEmail((event.target as HTMLInputElement).value);

  const userHandler = (event: React.SyntheticEvent<EventTarget>): void =>
    setUsername((event.target as HTMLInputElement).value);

  const passwordHandler = (event: React.SyntheticEvent<EventTarget>): void =>
    setPassword((event.target as HTMLInputElement).value);

  const handleSubmit = (event: React.SyntheticEvent<EventTarget>): void => {
    event.preventDefault();

    const user = isLogin ? { email, password } : { email, password, username };

    doFetch({
      method: "post",
      data: {
        user,
      },
    });
  };

  if (isSuccessfulSubmit) {
    return <Redirect to="/" />;
  }

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">{pageTitle}</h1>
            <p className="text-xs-center">
              <Link to={descriptionLink}>{descriptionText}</Link>
            </p>
            {error && <BackendErrorMessages errors={error.errors} />}
            <form onSubmit={handleSubmit}>
              <fieldset>
                {!isLogin && (
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="User"
                      value={username}
                      onChange={userHandler}
                    />
                  </fieldset>
                )}
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
                  {pageTitle}
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
