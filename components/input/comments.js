import { useContext, useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '../../store/notification-context';

function Comments(props) {
  const { eventId } = props,
         notificationCtx = useContext(NotificationContext),
        [showComments, setShowComments] = useState(false),
        [comments,setComments] = useState([]),
        [isFetchingComments, setIsFetchingComments] = useState(false)
  

  const getComments = () => {
    fetch(`/api/comments/${eventId}`)
      .then((response) => response.json())
      .then(data => {
        setComments(data.comments);
        setIsFetchingComments(false);
      })
    }
  

  useEffect(() => {
    if(showComments){
      setIsFetchingComments(true)
      getComments();
    }
  },[showComments])

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
    getComments()
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: 'Sending comment ...',
      message: 'Your comment is currently being stored into a database)',
      status: 'pending'
    })
    fetch(`/api/comments/${eventId}`,{
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response =>{
      if(response.ok) {
        return response.json()
      }

      response.json().then(data => {
        throw new Error(data.message || "Something went wrong")
      })
    })
    .then(data => {
      notificationCtx.showNotification({
        title: 'Success !',
        message: 'Your comment was saved)',
        status: 'success'
      })
    })
    .catch(e => {
      notificationCtx.showNotification({
        title: 'Error !',
        message:'Error while trying to sending your comment)' || e.message,
        status: 'error'
      })
    })
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment getComments = {getComments} onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && <CommentList items = {comments} />}
      {showComments && isFetchingComments && <p>Loading...</p>} 
    </section>
  );
}

export default Comments;