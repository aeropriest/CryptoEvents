import { Fragment } from "react";
import EventList from "../components/events/EventList";
import NewsletterRegistration from "../components/input/newsletter-registration";

import {
  getFeaturedEvents,
  getFeaturedEventsDirect,
} from "../helpers/api-utils";

export default function HomePage(props) {
  return (
    <Fragment>
        <NewsletterRegistration/>
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
