import React, { useState } from "react";
import { Button } from "@material-ui/core";
import firebase from "firebase";
import { storage, db } from "./firebase";
import "./ImageUpload.css";

function ImageUpload({ Username }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  //const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              Username: Username,
            });
            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };
  return (
    <div className="imageupload">
      <progress className="image_progress" value={progress} max="100" />

      <input
        type="text"
        palceholder="Enter a Caption...."
        onChange={(event) => setCaption(event.target.value)}
        value={caption}
      />

      <input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}> Upload</Button>
    </div>
  );
}

export default ImageUpload;
