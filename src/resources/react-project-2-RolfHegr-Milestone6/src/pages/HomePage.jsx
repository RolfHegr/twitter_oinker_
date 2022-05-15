import React, { useContext } from "react";
import CreateTweet from "../components/CreateTweet";
import TweetsContainer from "../components/TweetsContainer";
import TweetContext from "../contexts/TweetContext";

export default function HomePage({
}) {
  const {addTweet, isFetching, tweets, profileUserName, handleRedirect  } = useContext(TweetContext)
  return (
    <div>
      <CreateTweet
        addTweet={addTweet}
        isFetching={isFetching}
        profileUserName={profileUserName}
        handleRedirect={handleRedirect}
      />
      <TweetsContainer tweets={tweets} isFetching={isFetching} />
    </div>
  );
}
