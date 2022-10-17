import { Fragment } from "react";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import { getAllEvents, getEventById } from "../../helpers/api-utils";
import { getFeaturedEvents } from "../../dumy-data";

export default function EventDetailsPage(props) {
  const eventDetail = props.selectedEvent;
  //console.log("params are", props);
  if (!eventDetail) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <EventSummary title={eventDetail.title} />
      <EventLogistics
        date={eventDetail.date}
        image={eventDetail.image}
        address={eventDetail.location}
        imageAlt={eventDetail.title}
      />
      <EventContent>
        <p>{eventDetail.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const eventDetail = await getEventById(eventId);
  return {
    props: {
      selectedEvent: eventDetail,
    },
    revalidate: 300,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths: paths,
    fallback: true,
  };
}
