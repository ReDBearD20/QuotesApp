import { useEffect, useRef } from "react";
//import { useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { addComment } from "../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./NewCommentForm.module.css";

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  const { onAddComment } = props; //these are props.quoteId and props.onAddComment
  //const params=useParams();   to get the quoteId but we can also use props to get it
  const { sendRequest, status, error } = useHttp(addComment);

  useEffect(() => {
    if (status === "completed" && !error) {
      onAddComment();
    }
  }, [onAddComment, error, status]);

  const submitFormHandler = (event) => {
    event.preventDefault();
    const commentText = commentTextRef.current.value;
    sendRequest({ commentData: { text: commentText }, quoteId: props.quoteId });
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === "pending" && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
