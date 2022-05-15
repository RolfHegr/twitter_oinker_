import AuthContext from "../contexts/AuthContext";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseApp } from "../firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";

export default function AuthProvider({ children }) {
  const [activeUser, setActiveUser] = useState(() =>
    JSON.parse(localStorage.getItem("activeUser"))
  );
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [preferredUserName, setPreferredUserName] = useState("");
  const [avatarImageURL, setAvatarImageURL] = useState();
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    function getUserFromLocalStorage() {}
    getUserFromLocalStorage();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setActiveUser(authUser);
      setLocalStorageWithActiveUser(authUser);
      setIsAuthLoading(false)
    });
    return () => unsubscribe();
  }, [auth]);

  function getAvtarImageURL(url) {
    setAvatarImageURL(url);
  }

  function setLocalStorageWithActiveUser(user) {
    window.localStorage.setItem("activeUser", JSON.stringify(user));
  }

  async function handleLogin(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setActiveUser(user);
      setPreferredUserName(preferredUserName || user.displayName || user.email);
      navigate("/home");
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  function handleLogOut() {
    try {
      signOut(auth);
      setActiveUser(null);
      setPreferredUserName(null);
      setAvatarImageURL(null);
      localStorage.clear();
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
    navigate("/login");
  }

  function handleErrorOnLogin() {
    setErrorMessage("");
  }

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setActiveUser(user);
        setPreferredUserName(user.displayName);
        navigate("/home");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
      });
  }

  function createNewUser(email, password, userName, newUserId) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setActiveUser(user);
        navigate("/home");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
      });
    addNewUserToDatabase(email, userName, newUserId);
    setPreferredUserName(userName);
  }

  async function addNewUserToDatabase(email, userName, uniqueId) {
    const newUserObj = {
      email,
      userName,
      uniqueId,
    };
    await setDoc(doc(db, "users", uniqueId), newUserObj);
  }

  function addNewUserName(newPreferredUserName) {
    setPreferredUserName(newPreferredUserName);
    window.localStorage.setItem(
      "preferredUserName",
      JSON.stringify(newPreferredUserName)
    );
  }

  return (
    <AuthContext.Provider
      value={{
        activeUser,
        handleLogOut,
        handleLogin,
        errorMessage,
        handleErrorOnLogin,
        signInWithGoogle,
        createNewUser,
        preferredUserName,
        addNewUserName,
        getAvtarImageURL,
        avatarImageURL,
      }}
    >
      {!isAuthLoading && children}
    </AuthContext.Provider>
  );
}
