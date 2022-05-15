import React, { useContext, useEffect, useState } from "react";
import TweetContext from "../contexts/TweetContext";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { v4 as uuidv4 } from "uuid";
import "../css/CreateTweet.css";
import useAuthContext from "../hooks/useAuthContext";
import { getAuth } from "firebase/auth";

export default function CreateTweet() {
  const { addTweet, isFetching } = useContext(TweetContext);
  const [oinkName, setOinkName] = useState();
  const [tweetContent, setTweetContent] = useState("");
  const { addTweetToFirestore } = useAuthContext();
  const auth = getAuth();

  useEffect(() => {
    async function getUsername() {
      try {
        const displayName = auth.currentUser.displayName;
        const currEmail = auth.currentUser.email;
        const localStorageUserName = await JSON.parse(
          localStorage.getItem("preferredUserName")
        );
        if (displayName) {
          setOinkName(displayName);
        }
        if (localStorageUserName) {
          setOinkName(localStorageUserName);
        } else {
          setOinkName(currEmail);
        }
      } catch (error) {
        console.error(error.message);
      }
    }
    getUsername();
    return () => {
      getUsername();
    };
  }, []);

  function submitTweet(e) {
    const tweetObj = {
      content: tweetContent,
      userName: oinkName,
      date: new Date().toISOString(),
      dateNum: new Date().getTime(),
      id: uuidv4(),
      image: auth.currentUser.photoURL,
    };
    addTweet(tweetObj);
    addTweetToFirestore(tweetObj);
    setTweetContent("");
  }

  function handleChange(e) {
    setTweetContent(e.target.value);
  }

  function setTextareaPlaceholder() {
    if (oinkName === null) {
      return "Create a userName to tweet";
    } else {
      return `What's on your mind ${oinkName}`;
    }
  }

  return (
    <div className="c-CreateTweet">
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            onClick={handleChange}
            onChange={handleChange}
            className="CreateTweet-textarea"
            as="textarea"
            rows={3}
            placeholder={setTextareaPlaceholder()}
            value={tweetContent}
          />
        </Form.Group>
        <div className="btn-inside-textarea">
          <div className="c-AlertAndButton">
            {tweetContent.length > 140 ? (
              <div className="c-alert">
                <Alert variant="danger" className="AlertTweetLength">
                  <p>The tweet can't contain more then 140 chars.</p>
                </Alert>
              </div>
            ) : null}

            <Button
              disabled={
                tweetContent.length > 140 ||
                tweetContent.length === 0 ||
                isFetching
                  ? true
                  : false
              }
              onClick={submitTweet}
              variant="primary"
            >
              OINK!
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
