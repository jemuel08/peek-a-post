import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { storage, db } from "../utils/firebase";
import firebase from "firebase";
import "../styles/ImageUpload.css";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ImageUpload({ email }) {
  const [modalStyle] = useState(getModalStyle);
  const [modalUpload, setModalUpload] = useState(false);
  const classes = useStyles();
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = (e) => {
    if (image === null) {
      alert("choose image to upload");
    } else {
      const uploadAction = storage.ref(`images/${image.name}`).put(image);

      uploadAction.on(
        "state_changed",
        (snapshot) => {
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
                email: email,
                // username: username
              });
            });
          setProgress(0);
          setCaption("");
          setImage(null);
          setModalUpload(false);
        }
      );
    }
  };

  const addPost = (e) => {
    e.preventDefault();
    setModalUpload(true);
  };

  return (
    <div>
      <button onClick={addPost} className="material-icons floating-btn">
        add
      </button>

      <Modal open={modalUpload} onClose={() => setModalUpload(false)}>
        <div style={modalStyle} className={classes.paper}>
          <div className="imageUpload">
            <progress className="progress" value={progress} max="100" />
            <textarea
              placeholder="Enter your caption"
              onChange={(e) => setCaption(e.target.value)}
            />
            <div className="filePosition">
              <input
                type="file"
                onChange={handleChange}
                className="fileUpload"
              />
            </div>
            <Button className="imageUpload_button" onClick={handleUpload}>
              Upload
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
