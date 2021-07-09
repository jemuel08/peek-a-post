import React, { useState, useEffect } from "react";
import { db } from "../utils/firebase";
import Post from "./Post";
import ImageUpload from "./ImageUpload";
import { auth } from "../utils/firebase";
import "../styles/Home.css";
import Loading from "./Loading";
import Nav from "./Nav";

function Home() {
  const [userLogin, setUserLogin] = useState("");
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    var user = auth.currentUser;

    if (user) {
      // User is signed in.
      setUserLogin(user);
      setIsLoading(false);
    } else {
      // No user is signed in.
      setUserLogin(null);
      setIsLoading(true);
    }
  }, []);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        //everytime a new post added
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  if (isLoading) {
    return <Loading />
  } else {
    return (
      <div>
        {/* <Nav /> */}
        <div className="nav-bar">
          <Nav />
        </div>
        {/* <h3>{userLogin.displayName}</h3> */}

        <br />

        <div className="homePostContain">
          {posts.map(({ id, post }) => (
            <Post
              postId={id}
              key={id}
              email={post.email}
              caption={post.caption}
              imageUrl={post.imageUrl}
            />
          ))}
        </div>

        <ImageUpload email={userLogin.displayName} />
      </div>
    );
  }
}

export default Home;
