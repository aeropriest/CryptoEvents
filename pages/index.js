import { getFeaturedEvents } from "../dumy-data";
import EventList from "../components/events/EventList";

export default function HomePage() {
  const featuredEvents = getFeaturedEvents();
  console.log(featuredEvents);
  return <EventList items={featuredEvents} />;
}
