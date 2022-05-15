import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Button, Form, Group, File } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router";
import "../css/Profile.css";
import TweetContext from "../contexts/TweetContext";
import useAuthContext from "../hooks/useAuthContext";
import PlayContext from "../contexts/PlayContext";

export default function Profile() {
  const [userNameInput, setUserNameInput] = useState("");
  const [file, setFile] = useState();
  const { handleRedirect, changeUserName } = useContext(TweetContext);
  const { someRandomFunction } = useContext(PlayContext)
  const navigate = useNavigate();
  const { addNewUserName, controlUserNameLength } = useAuthContext();

  function onChange(e) {
    setUserNameInput(e.target.value);
    controlUserNameLength();
  }

  function storeUserNameLocalStorage() {
    const jsonNewUserName = JSON.stringify(userNameInput);
    localStorage.setItem("userName", jsonNewUserName);
  }

  async function setNewUserName(e) {
    e.preventDefault();
    changeUserName(userNameInput);
    addNewUserName(userNameInput);
    await storeUserNameLocalStorage();
    navigate("/home");
    someRandomFunction()
  }

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  return (
    <div className="c-Profile">
      <h1>Profile</h1>
      <Form>
        <Form.Label>User Name</Form.Label>
        <Form.Control
          onChange={onChange}
          className="UserName-textarea"
          type="username"
          placeholder="Enter User Name..  "
          value={userNameInput}
        />

        <div className="c-button d-flex justify-content-end">
          <Button
            onClick={setNewUserName}
            disabled={!userNameInput}
            variant="primary"
            className="saveUserNameButton"
          >
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
