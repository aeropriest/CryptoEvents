import { useRouter } from "next/router";
import EVENT_DATA, { getEventById } from "../../dumy-data";
import { Fragment } from "react";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";

export default function EventDetailsPage() {
  const router = useRouter();

  const eventId = router.query.eventId;
  const eventDetail = getEventById(eventId);
  console.log(eventDetail);
  if (!eventDetail) {
    return <p>Event id {eventId} not found</p>;
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
