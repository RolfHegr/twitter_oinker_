import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import CreateTweet from "../components/CreateTweet";
import TweetsContainer from "../components/TweetsContainer";
import TweetContext from "../contexts/TweetContext";

export default function HomePage({ setHello
}) {
  const {addTweet, isFetching, tweets, profileUserName, handleRedirect  } = useContext(TweetContext)
  const [randomState, setRandomState] = useState("");

  
  return (
    <div>
    <Button onClick={randomState} > </Button>
      <CreateTweet
        addTweet={addTweet}
        isFetching={isFetching}
        profileUserName={profileUserName}
        handleRedirect={handleRedirect}
      />
      <TweetsContainer setHello={setHello} tweets={tweets} isFetching={isFetching} />
    </div>
  );
}
