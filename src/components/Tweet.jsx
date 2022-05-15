import React from "react";
import "../css/Tweet.css";
import oink from "../resources/pigicon.png";
import { Image, Button } from "react-bootstrap";

export default function Tweet({ tweet, setHello }) {
  function settingHello() {
    console.log("clicked");
    setHello("Hello");
  }

  return (
    <div className="Tweet justify-content-start">
      <div className="c-profilePic">
        <Image
          className="avatar roundedCircle fluid"
          src={tweet.image || oink}
        ></Image>
        {/* <img className="avatar"  src={tweet.image}></img>{" "} */}
      </div>
      <div className="c-restOfTweet">
        <div className="d-flex justify-content-between mb-2">
          <span className="secondaryText">{tweet.userName}</span>
          <span>
            {" "}
            <Button onClick={settingHello}>Click Me</Button>
          </span>
          <span className="secondaryText">{tweet.date} </span>
        </div>
        <div>
          <p>{tweet.content}</p>
        </div>
      </div>
    </div>
  );
}
