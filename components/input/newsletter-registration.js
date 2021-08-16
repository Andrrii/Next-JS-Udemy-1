import { useRef, useContext } from 'react';
import NotificationContext from '../../store/notification-context';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {

  const inputRef = useRef()

  const notificationCtx = useContext(NotificationContext)

  function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = inputRef.current.value;

    notificationCtx.showNotification({
      title: 'Signing Up ...',
      message: 'Registration for newsletter)',
      status: 'pending'
    })

    fetch('/api/newsletter',{
        method: 'POST',
        body: JSON.stringify({email: enteredEmail}),
        headers: { 'Content-Type':'application/json',}
    })
    .then(response => {
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
        message: 'Successfully registered for newsletter)',
        status: 'success'
      })
    })
    .catch(e => {
      notificationCtx.showNotification({
        title: 'Error !',
        message:'Error while trying to register you for newsletter)' || e.message,
        status: 'error'
      })
    })

    inputRef.current.value = null
}

  

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref = {inputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;