import EventItem from "./EventItem";
import classes from "./EventList.module.css";

export default function EventList(props) {
  const items = { props };
  return (
    <ul className={classes.list}>
      {props.items.map((event) => (
        <EventItem
          key={event.id}
          id={event.id}
          image={event.image}
          title={event.title}
          location={event.location}
          date={event.date}
        />
      ))}
    </ul>
  );
}
