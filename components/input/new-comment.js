import { Fragment, useRef } from "react";
import classes from "./new-comment.module.css";

export default function NewComment() {
  function handleSubmit(evemt) {}
  const emailRef = useRef();
  const nameReft = useRef();
  const commentRef = useRef();

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Your E-mail</label>
      <input ref={emailRef} id="email"></input>
      <label htmlFor="name">Your E-mail</label>
      <input ref={emailRef} id="name"></input>
      <label htmlFor="comment">Your Comment</label>
      <textarea id="comment" ref={commentRef} rows="5"></textarea>
    </form>
  );
}
