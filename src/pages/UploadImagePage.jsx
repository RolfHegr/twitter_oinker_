import { getDownloadURL, uploadBytes, ref, getStorage } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import useAuthContext from "../hooks/useAuthContext.js";
import { initializeApp } from "firebase/app";
import { Form, Button } from "react-bootstrap";
import "../css/Profile.css";


export default function Profile() {
  const { activeUser, getAvtarImageURL } = useAuthContext();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const storage = getStorage();
  const [photoURL, setPhotoURL] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
  );

  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  }

  function handleClick() {
    upload(photo, activeUser, setLoading);
  }

  async function upload(file, currentUser, setLoading) {
    const fileRef = ref(storage, currentUser.uid + ".png");
    setLoading(true);
    const snapshot = await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);
    updateProfile(currentUser, { photoURL });
    alert('Upload Successful')
    setLoading(false);
  }

  useEffect(() => {
    if (activeUser?.photoURL) {
      setPhotoURL(activeUser.photoURL);
      getAvtarImageURL(photoURL);
    }
  }, [activeUser]);

  return (
    <div className="c-Profile">
      <Form className="uploadImageForm">
        <Form.Group controlId="formFile" className="mb-3 form-group">
          <Form.Label className="form-label">
            Upload your profiel picture here
          </Form.Label>
          <Form.Control onChange={handleChange} type="file" />
        </Form.Group>
        <Button disabled={loading || !photo} onClick={handleClick}>
          Upload Photo
        </Button>
        <p className="white">Your Current Photo</p>
        <img
          src={photoURL}
          alt="Avatar"
          className=" profileImagePreview "
        />
      </Form>
    </div>
  );
}
