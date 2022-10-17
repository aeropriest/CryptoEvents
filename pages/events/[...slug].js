import { useRouter } from "next/router";
import useSWR from "swr";
import { getAllEvents, getFilteredEvents } from "../../helpers/api-utils.js";
import EventList from "../../components/events/EventList.js";
import { Fragment, useEffect, useState } from "react";
import ResultTitle from "../../components/events/results-title";
import Button from "../../components/ui/button.js";

export default function FilteredEventsPage(props) {
  const router = useRouter();
  const filteredData = router.query.slug;
  console.log(filteredData);

  const { data, error } = useSWR(
    "https://cryptoevents-54df6-default-rtdb.firebaseio.com/Events.json"
  );

  const [events, setEvents] = useState([]);
  useEffect(() => {
    if (data) {
      const allEvents = [];
      for (const key in data) {
        allEvents.push({
          id: key,
          ...data[key],
        });
      }
      setEvents(allEvents);
    }
  }, [data]);

  if (!events) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = filteredEvents[0];
  const filteredMonth = filteredEvents[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  let showEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  // const filteredEventsMap = getFilteredEvents({
  //   year: numYear,
  //   month: numMonth,
  // });

  // if (!filteredEventsMap || filteredEventsMap.length === 0) {
  //   <p>No events found in the range</p>;
  // }

  if (props.hasError) {
    return (
      <Fragment>
        <p>Invalid filter, Please adjust your values!</p>
        <div className="center">
          <Button Link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(props.date.year, props.date.month - 1);
  const filteredEvents = props.events;

  return (
    <Fragment>
      <ResultTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;

  const filterData = params.slug;

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear < 2021 ||
    numYear > 2030 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: { hasError: true },
      //notFound: true,
      // redirect: {
      //   destination: "/error",
      // },
    };
  }
  const filteredEventsMap = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      events: filteredEventsMap,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  };
}
