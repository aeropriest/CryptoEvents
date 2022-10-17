import { getAllEvents } from "../../helpers/api-utils";
import EventList from "../../components/events/EventList";
import EventSearch from "../../components/event-detail/EventSearch";
import { Fragment } from "react";
import { useRouter } from "next/router";

export default function AllEventsPage(props) {
  const router = useRouter();
  const { events } = props;

  function findEventHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }
  return (
    <Fragment>
      <EventSearch onSearch={findEventHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}
