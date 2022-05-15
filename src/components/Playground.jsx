import axios from "axios";
import React, { useEffect, useState } from "react";
import PlayTweet from "./PlayTweet";

export default function Playground() {
  const [tweets, setTweets] = useState(false);
  const fetchURL =
    "https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet";

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const res = await axios.get(fetchURL);
        setTweets(res.data.tweets);
        console.log(res.data.tweets);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTweets();
    return () => {
      fetchTweets();
    };
  }, []);

  return (
    <div className="mt-5 pt-5">
      <div className="d-flex mx-auto mt-5 c-Profile border white flex-column">
        {tweets &&
          tweets.map((tweet, index) => <PlayTweet tweet={tweet} key={index} />)}
      </div>
    </div>
  );
}
