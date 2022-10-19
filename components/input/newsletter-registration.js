import { useContext, useRef } from "react";
import NotificationContext from "../../store/notification-context";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const notificationCtx = useContext(NotificationContext);

  const emailRef = useRef();

  async function registrationHandler(event) {
    event.preventDefault();
    const email = emailRef.current.value;
    const reqBody = { email: email };

    notificationCtx.showNotification({
      title: "Signing Up",
      message: "Registering for newsletter",
      status: "pending",
    });

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("response is ok then go ahead");
          return response.json();
        }
        return response.json().then((data) => {
          throw new Error(data.message || "Failed to register for newsletter");
        });
      })
      .then((data) => {
        console.log("Newsletter registration ", data);
        notificationCtx.showNotification({
          title: "Signup Success",
          message: "Registration for newsletter completed",
          status: "success",
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Signup Failed",
          message: error.message || "Failed to register for newsletter",
          status: "error",
        });
      });

    /*
    try {
      console.log("registering now");
      const res = await fetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status !== 201) {
        throw new Error("Registeration failed, error code", res.status);
      }
      const data = await res.json();
      console.log("Newsletter registration ", data);
      notificationCtx.showNotifcation({
        title: "Signup Success",
        message: "Registration for newsletter completed",
        status: "success",
      });
    } catch (error) {
      console.log("error occured");
      notificationCtx.showNotifcation({
        title: "Signup Failed",
        message: "Failed to resigter for newsletter",
        status: "error",
      });
    }
    */
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
