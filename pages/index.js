import EventList from "../components/events/EventList";
import {
  getFeaturedEvents,
  getFeaturedEventsDirect,
} from "../helpers/api-utils";

export default function HomePage(props) {
  console.log(props);
  return <EventList items={props.events} />;
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
