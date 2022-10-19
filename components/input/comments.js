import { Fragment, useEffect, useRef, useState } from "react";
import classes from "./comments.module.css";
import NewComment from "./new-comment";
import CommentList from "./comment-list";

export default function Comments(props) {
  const [showComments, setShowComments] = useState(false);
  const { eventId } = props;
  const [commentsList, setCommentsList] = useState([]);

  useEffect(() => {
    async function fetchComments() {
      const response = await fetch("/api/comments/" + eventId);
      const json = await response.json();
      setCommentsList(json.comments);
    }
    fetchComments();
  }, [showComments]);

  console.log("loaded commented", commentsList);

  function addCommentHandler(commentData) {
    console.log("addCommentHandler called");
    console.log(props);
    //send the data to APIs
    fetch("/api/comments/" + eventId, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <CommentList items={commentsList} />}
      <NewComment onAddComment={addCommentHandler} />
    </section>
  );
}
