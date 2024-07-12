import { Await, defer, json, useLoaderData } from 'react-router-dom';
import EventsList from '../components/EventsList';
import { Suspense } from 'react';

const server = import.meta.env.REACT_APP_SERVER_URL

function EventsPage() {
  const {events} = useLoaderData()
  
  return (
    <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvent)=> <EventsList events={loadedEvent} />}
      </Await>
    </Suspense>
  );
}

async function loadedEvent(){
  const response = await fetch(`${server}/events`);
  if (!response.ok) {
    throw json({message: 'Could not fetch the data'}, {status: 500})
  } else {
    const resData = await response.json()
    return resData.events;
  }
}
export const loader =  () => {
  return defer({
    events: loadedEvent()
  })
}

export default EventsPage;
