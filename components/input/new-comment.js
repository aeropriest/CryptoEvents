import { Fragment, useRef, useState } from "react";
import classes from "./new-comment.module.css";

export default function NewComment(props) {

  const [isInvalid, setIsInvalid] = useState(false)

  function handleSubmit(evemt) {}
  const emailRef = useRef();
  const nameRef = useRef();
  const commentRef = useRef();


  function NewCommentHandler(){
    console.log('comment =ahndler')
    if( !emailRef || !nameRef || !commentRef ){
      setIsInvalid(true)
    }
    props.onAddComment(
      {
      name: nameRef.current.value,
      eamil: emailRef.current.value,
      comment: commentRef.current.value
    
  })
  }

  

  return (
    <form className={classes.form} onSubmit={NewCommentHandler}>
    <div className={classes.row}>
      <div className={classes.control}>
        <label htmlFor='email'>Your email</label>
        <input type='email' id='email' ref={emailRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='name'>Your name</label>
        <input type='text' id='name' ref={nameRef} />
      </div>
    </div>
    <div className={classes.control}>
      <label htmlFor='comment'>Your comment</label>
      <textarea id='comment' rows='5' ref={commentRef}></textarea>
    </div>
    {isInvalid && <p>Please enter a valid email address and comment!</p>}
    <button className={classes.form}>Submit</button>
  </form>
  );
}
