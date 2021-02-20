import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import { CurrentUserContext } from "../../contexts/currentUser";
import { useFetch } from "../../hooks/useFetch";
import { BackendErrorMessages } from "../authentiсation/components/backendErrorMessages";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export const Settings = () => {
  const { state: currentUserState, dispatch } = useContext(CurrentUserContext);
  const apiUrl = "/user";
  const [{ response, error }, doFetch] = useFetch(apiUrl);
  const [image, setImage] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const { setValue: setToken } = useLocalStorage("token");
  const [isSuccessfullLogout, setIsSucsessfullLogout] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    doFetch({
      method: "put",
      data: {
        user: {
          ...currentUserState.currentUser,
          image,
          bio,
          email,
          password: pass,
        },
      },
    });
  };
  const logout = (e) => {
    e.preventDefault();

    setToken("");
    dispatch({ type: "LOGOUT" });
    setIsSucsessfullLogout(true);
  };

  useEffect(() => {
    if (!currentUserState.currentUser) {
      return;
    }

    setImage(currentUserState.currentUser.image);
    setBio(currentUserState.currentUser.bio);
    setUsername(currentUserState.currentUser.username);
    setEmail(currentUserState.currentUser.email);
  }, [currentUserState.currentUser]);

  useEffect(() => {
    if (!response) {
      return;
    }

    dispatch({ type: "SET_AUTHORIZED", payload: response.user });
  }, [response, dispatch]);

  if (isSuccessfullLogout) {
    return <Redirect to={`/`} />;
  }

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your settings</h1>
            {error && <BackendErrorMessages errors={error.errors} />}
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="URL of profile picture"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Short bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                  />
                </fieldset>
                <button
                  type="submit"
                  className="btn btn-lg btn-primary pull-xs-right"
                >
                  Update settings
                </button>
              </fieldset>
            </form>
            <hr />
            <button className="btn btn-outline-danger" onClick={logout}>
              Or click here to logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
