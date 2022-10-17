export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getFeaturedEventsDirect() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured === true);
  console.log(
    "----------------------- getFeaturedEventsDirect -------------------"
  );
  const res = await fetch(
    "https://cryptoevents-54df6-default-rtdb.firebaseio.com/Events.json?isFeatured=false"
  );
  const data = await res.json();
  //console.log("all events data ", data);
  const events = [];
  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }
  //console.log("getFeaturedEventsDirect, ", events);
  return events;
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

export async function getAllEvents() {
  const res = await fetch(
    "https://cryptoevents-54df6-default-rtdb.firebaseio.com/Events.json"
  );
  const data = await res.json();
  //console.log("all events data ", data);
  const events = [];
  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }
  //console.log("getAllEvents, ", events);
  return events;
}
