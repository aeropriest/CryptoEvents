export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getFeaturedEventsDirect() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured === true);
  const res = await fetch(
    "https://cryptoevents-54df6-default-rtdb.firebaseio.com/Events.json?isFeatured=true"
  );
  const data = await res.json();
  const events = [];
  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }
  return events;
}

export async function getAllEvents() {
  const res = await fetch(
    "https://cryptoevents-54df6-default-rtdb.firebaseio.com/Events.json"
  );
  const data = await res.json();
  const events = [];
  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }
  return events;
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  const allEvents = await getAllEvents();
  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}

export async function getEventById(id) {
  const events = await getAllEvents();
  return events.find((event) => event.id === id);
}
