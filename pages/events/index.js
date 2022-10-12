import { getAllEvents } from "../../dumy-data";
import EventList from "../../components/events/EventList";
import EventSearch from "../../components/event-detail/EventSearch";
import { Fragment } from "react";
import { useRouter } from "next/router";

export default function AllEventsPage() {
  const router = useRouter();
  const allEvents = getAllEvents();
  function findEventHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }
  return (
    <Fragment>
      <EventSearch onSearch={findEventHandler} />
      <EventList items={allEvents} />
    </Fragment>
  );
}
