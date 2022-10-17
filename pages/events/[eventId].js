import { Fragment, useRef, useState } from "react";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import { getFeaturedEvents, getEventById } from "../../helpers/api-utils";
import NewComment from "../../components/input/new-comment";

export default function EventDetailsPage(props) {
  const eventDetail = props.selectedEvent;
  //console.log("params are", props);
  if (!eventDetail) {
    return <p>Event id not found</p>;
  }

  //console.log(eventDetail);
  const emailRef = useRef();
  const nameReft = useRef();
  const commentRef = useRef();

  const [showComments, setShowComments] = useState(false)

  function handleShowComments(){
    console.log('show comments', showComments)
    fetch('/api/comments').then((response)=> response.json()).then((data)=>console.log(data))
    setShowComments(!showComments)
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
      <button onClick={handleShowComments}>{showComments ? 'Hide ' : 'Show '} Comments</button>
      <NewComment />
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

/*
function EventDetailPage(props) {
  const event = props.selectedEvent;

  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: paths,
    fallback: "blocking",
  };
}

export default EventDetailPage;

*/
