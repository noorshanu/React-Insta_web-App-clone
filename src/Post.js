import React, { useEffect, useState } from "react";
import "./Post.css";
import firebase from "firebase";
import { db } from "./firebase";
import Avatar from "@material-ui/core/Avatar";
import { Button } from "@material-ui/core";

function Post({ postId, user, Username, caption, imageUrl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);
  const postComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      Username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className="post">
      <div className="post_header">
        <Avatar
          className="post_avatar"
          alt={Username}
          src="/static/images/avatar/1.jpg"
        />
        <h3>{Username}</h3>
      </div>
      {/*header avatar + usernAME*/}
      <img className="post_image" src={imageUrl} alt="ping" />
      <h4 className="post_text">
        <strong>{Username}</strong>:{caption}{" "}
      </h4>
      <div className="post_comments">
        {comments.map((comment) => (
          <p>
            <strong>{comment.Username}</strong>
            {comment.text}
          </p>
        ))}
      </div>
      {user && (
        <form className="post_commentBox">
          <input
            className="post_input"
            type="text"
            placeholder="Add a Comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            disable={!comment}
            className="post_button"
            type="submit"
            onClick={postComment}
          >
            Post
          </Button>
        </form>
      )}
    </div>
  );
}

export default Post;
