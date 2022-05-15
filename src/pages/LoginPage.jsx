import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import "../css/LoginPage.css"
import useAuthContext from "../hooks/useAuthContext";

export default function LoginPage() {
  const {
    handleLogin,
    errorMessage,
    handleErrorOnLogin,
    signInWithGoogle,
    createNewUser,
  } = useAuthContext();
  const [isLogginIn, setIsLogginIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [tooLongUserName, setTooLongUserName] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const userNameRef = useRef();

  useEffect(() => {
    setIsLogginIn(false);
    setIsSigningUp(false);
  }, [errorMessage]);

  function login(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const pwd = passwordRef.current.value;
    setIsLogginIn(true);
    handleLogin(email, pwd);
  }

  function onChange(e) {
    setIsLogginIn(false);
    setIsSigningUp(false);
    handleErrorOnLogin();
    if (userNameRef.current.value.length > 15) {
      setTooLongUserName(true);
    } else {
      setTooLongUserName(false);
    }
  }

  function handleCreateNewUser(e) {
    setIsSigningUp(true);
    e.preventDefault();
    const email = emailRef.current.value;
    const pwd = passwordRef.current.value;
    const userName = userNameRef.current.value;
    createNewUser(email, pwd, userName, uuidv4());
  }

  return (
    <div className="c-Login">
      <div className="c-LandingPage">
        <h1 style={{ color: "white" }}>
          Welcome to <span className="pink">OINKer</span>
        </h1>
        <p>Create an account to get started</p>
      </div>
      {/* <h1>Login / Create User</h1> */}
      {tooLongUserName ? (
        <Alert variant="danger">
          Username have to be less than 15 characters.
        </Alert>
      ) : null}
      {errorMessage && (
        <Alert variant="danger">Login Failed: {errorMessage}</Alert>
      )}
      <Form>
        <Form.Group id="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            className="input"
            ref={emailRef}
            placeholder="Email"
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group id="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            ref={passwordRef}
            className="input"
            placeholder="Your Password"
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group id="email">
          <Form.Label>*Username</Form.Label>
          <Form.Control
            className="input"
            ref={userNameRef}
            placeholder="Only needed if creating new user"
            onChange={onChange}
          />
        </Form.Group>

        <div className="c-button d-flex justify-content-end">
          <div className="c-btns">
            <Button
              disabled={isLogginIn || tooLongUserName}
              type="submit"
              className="btn-login"
              onClick={login}
            >
              Login
              {isLogginIn && (
                <span className="mx-1">
                  <Spinner animation="border" size="sm"></Spinner>
                </span>
              )}
            </Button>
            <Button
              onClick={handleCreateNewUser}
              type="submit"
              className="btn-createUser"
              disabled={isSigningUp || tooLongUserName}
            >
              Create New User
              {isSigningUp && (
                <span className="mx-1">
                  <Spinner animation="border" size="sm"></Spinner>
                </span>
              )}
            </Button>
            <Button
              disabled={tooLongUserName}
              className="googleBtn"
              onClick={signInWithGoogle}
            >
              <img
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4="
                className="googleLogo mx-2"
              ></img>
              Sign In with Google
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
