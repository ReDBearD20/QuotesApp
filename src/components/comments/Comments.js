import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "./CommentsList";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();

  const { sendRequest, data: loadedComments, status } = useHttp(getAllComments);

  useEffect(() => {
    sendRequest(params.quoteId);
  }, [sendRequest, params.quoteId]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addCommentHandler = useCallback(() => {
    sendRequest(params.quoteId);
  }, [sendRequest, params.quoteId]);

  let comments;

  if (status === "pending")
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );

  if (status === "completed" && loadedComments && loadedComments.length > 0)
    comments = <CommentsList comments={loadedComments} />;

  if (
    status === "completed" &&
    (!loadedComments || loadedComments.length === 0)
  )
    comments = <p className="centered">No comments found !</p>;

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          onAddComment={addCommentHandler}
          quoteId={params.quoteId}
        />
      )}
      {comments}
    </section>
  );
};

export default Comments;
