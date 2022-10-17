import { Fragment, useRef } from "react";
import EventList from "../components/events/EventList";
import {
  getFeaturedEvents,
  getFeaturedEventsDirect,
} from "../helpers/api-utils";

export default function HomePage(props) {
  console.log(props);
  const emailRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    const email = emailRef.current.value
    const reqBody = {email: email}
    console.log(email);
    fetch('/api/newsletter',{
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then((response)=> response.json()).then((data)=>console.log(data))
  }

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <h1>Sign up to stay updated!!</h1>
        <input placeholder="Your email" ref={emailRef} />
        <button>Register</button>
      </form>
      <EventList items={props.events} />
    </Fragment>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  console.log(featuredEvents);
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 600,
  };
}
