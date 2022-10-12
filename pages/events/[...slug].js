import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dumy-data";
import EventList from "../../components/events/EventList.js";
import { Fragment } from "react";
import ResultTitle from "../../components/events/results-title";

export default function FilteredEventsPage() {
  const router = useRouter();
  const filteredEvents = router.query.slug;
  console.log(filteredEvents);
  if (!filteredEvents) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = filteredEvents[0];
  const filteredMonth = filteredEvents[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (isNaN(numYear) || isNaN(numMonth)) {
    return <p>Invlaid filter, please adust values</p>;
  }
  const filteredEventsMap = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (!filteredEventsMap || filteredEventsMap.length === 0) {
    <p>No events found in the range</p>;
  }

  const date = new Date(numYear, numMonth - 1);
  console.log(filteredEventsMap);
  return (
    <Fragment>
      <ResultTitle date={date} />
      <EventList items={filteredEventsMap} />
    </Fragment>
  );
}
