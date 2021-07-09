import React, { useState, useEffect } from "react";
import "../styles/Post.css";
import Avatar from "@material-ui/core/Avatar";
import Loading from "./Loading";
import { Button } from "@material-ui/core";
import { auth, db } from "../utils/firebase";
import firebase from "firebase";

export default function Post({ postId, email, caption, imageUrl }) {
  const [isLoading, setIsLoading] = useState(true);
  const [userLogin, setUserLogin] = useState("");
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");

  useEffect(() => {
    var userSignedIn = auth.currentUser;

    if (userSignedIn) {
      // User is signed in.
      setCurrentEmail(userSignedIn.displayName);
      setIsLoading(false);
    } else {
      // No user is signed in.
      setUserLogin(null);
      setIsLoading(true);
    }
  }, []);

  useEffect(() => {
    let unsubs;
    if (postId) {
      unsubs = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubs();
    };
  }, [postId]);

  const postComment = (e) => {
    e.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      email: currentEmail,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  useEffect(() => {
    var user = auth.currentUser;

    if (user.displayName === email) {
      // User is signed in.
      setUserLogin(email);
    } else {
      // No user is signed in.
      setUserLogin(null);
    }
  }, []);

  const deletePost = (e) => {
    e.preventDefault();
    db.collection("posts")
      .doc(postId)
      .delete()
      .then(function () {
        console.log("deleted");
      })
      .catch((error) => {
        var errorMessage = error.message;
        // ..
        alert(errorMessage);
      });
  };

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div className="post">
        <div className="post_header">
          <div className="postHeader_one">
            {/* avatar */}
            <Avatar
              className="post_avatar"
              alt={email}
              src="/static/images/avatar/1.jpg"
            />
            <h3>{email}</h3>
          </div>
          <div className="postHeader_two">
            {userLogin ? (
              <Button onClick={deletePost} className="del">
                Delete
              </Button>
            ) : null}
          </div>
        </div>

        {/* image */}
        <img className="post_image" src={imageUrl} alt="no image" />

        {/* username and caption */}
        <h4 className="post_text">
          <strong>{email}</strong> {caption}
        </h4>

        <div className="post_comments">
          {comments.map((comment) => (
            <p>
              <strong>{comment.email}</strong> {comment.text}
            </p>
          ))}
        </div>

        <form className="commentBox">
          <input
            className="postInput"
            type="text"
            placeholder="Comment your thoughts..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            disabled={!comment}
            className="commentButton"
            type="submit"
            onClick={postComment}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}
