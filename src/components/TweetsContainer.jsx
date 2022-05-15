import "../css/TweetsContainer.css"
import React, { useContext } from "react";
import Tweet from "./Tweet";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import TweetContext from "../contexts/TweetContext";

export default function TweetsContainer( {setHello} ) {
  const { tweets, isFetching } = useContext(TweetContext);
  return (
    <div className="TweetsContainer">
      <div className="InnerTweetsContainer d-flex flex-column w-100 flex-grow">
        {isFetching ? (
          <div className="justify-content-center d-flex mb-4">
            <Button variant="primary" disabled>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span className="visually-hidden">Loading...</span>
            </Button>{" "}
          </div>
        ) : null}
        {tweets.map((tweet) => (
          <Tweet setHello={setHello} key={tweet.id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
}
