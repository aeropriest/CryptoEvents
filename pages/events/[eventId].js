import { Fragment, useRef, useState } from "react";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import { getFeaturedEvents, getEventById } from "../../helpers/api-utils";
import NewComment from "../../components/input/new-comment";
import Comments from "../../components/input/comments";

export default function EventDetailsPage(props) {
  const eventDetail = props.selectedEvent;
  console.log('event details for ', eventDetail.id)
  if (!eventDetail) {
    return <p>Event id not found</p>;
  }

  //console.log(eventDetail);
  const emailRef = useRef();
  const nameReft = useRef();
  const commentRef = useRef();


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
      <Comments eventId={eventDetail.id}/>
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
    fallback: false,
  };
}
