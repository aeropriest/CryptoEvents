import { Fragment } from "react";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import { getAllEvents, getEventById } from "../../helpers/api-utils";

export default function EventDetailsPage(props) {
  const eventDetail = props;
  //console.log("params are", props);
  if (!eventDetail) {
    return <p>Event id not found</p>;
  }

  //console.log(eventDetail);

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
    props: eventDetail,
  };
}

export async function getStaticPaths() {
  const events = await getAllEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths: paths,
    fallback: false,
  };
}
