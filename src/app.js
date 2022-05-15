import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavigationBar from "./components/NavigationBar";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import TweetContext from "./contexts/TweetContext";
import LoginPage from "./pages/LoginPage";
import UploadImagePage from "./pages/UploadImagePage";
import AuthProvider from "./components/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Playground from "./components/Playground";
import FormComponent from "./components/FormComponent";

function App() {
  const [hello, setHello] = useState("");
  const [tweets, setTweets] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [profileUserName, setProfileUserName] = useState("");
  const [redirect, setRedirect] = useState(false);
  const auth = getAuth();
  const db = getFirestore();
  const tweetsRef = collection(db, "tweets");

  function changeUserName(newUsername) {
    setProfileUserName(newUsername);
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(tweetsRef, (snapshot) => {
      try {
        const tweets = snapshot.docs.map((user) => {
          return { ...user.data(), id: user.id };
        });
        const sortedTweets = tweets.sort(function (a, b) {
          return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
        });
        setTweets(sortedTweets);
        setIsFetching(false);
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  async function addTweetToFirestore(newTweet) {
    await setDoc(doc(db, "tweets", newTweet.id), newTweet);
  }

  function addTweet(tweet) {
    try {
      addTweetToFirestore(tweet);
      setTweets([tweet, ...tweets]);
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
  }

  useEffect(() => {
    if (redirect) {
      window.location.href = redirect;
      setRedirect(false);
    }
  }, [redirect]);

  function creatingHello(input) {
    setHello(input);
  }

  return (
    <AuthProvider>
      <TweetContext.Provider
        value={{
          tweets,
          isFetching,
          profileUserName,
          addTweet,
          changeUserName,
        }}
      >
        <div className="App">
        <FormComponent></FormComponent>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomePage setHello={creatingHello} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/uploadImage"
              element={
                <ProtectedRoute>
                  <UploadImagePage />
                </ProtectedRoute>
              }
            />
            <Route path="/playground" element={<Playground />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </TweetContext.Provider>
    </AuthProvider>
  );
}

export default App;
