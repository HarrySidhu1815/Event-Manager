import React, { Suspense } from 'react'
import { Await, json, redirect, useRouteLoaderData, defer } from 'react-router-dom'
import EventItem from '../components/EventItem'
import EventsList from '../components/EventsList'

const EventDetailPage = () => {
    const {event, events} = useRouteLoaderData('event-detail')
    
  return (
    <>
        <Suspense fallback={<p>Loading...</p>}>
            <Await resolve={event}>
            {loadEvent => <EventItem event={loadEvent}/>} 
            </Await>
        </Suspense>
        <Suspense fallback={<p>Loading...</p>}>
            <Await resolve={events}>
            {loadedEvents => <EventsList events={loadedEvents} />} 
            </Await>
        </Suspense> 
    </>
  )
}
async function loadEvent(id){
    const response = await fetch('http://localhost:8080/events/' + id)
    if(!response.ok){
        throw json({message: 'Could not fetch the event details'} , { status: 500})
    } else {
        const resData = await response.json()
        return resData.event
    }
}
async function loadedEvents(){
    const response = await fetch("http://localhost:8080/events");
    if (!response.ok) {
      throw json({message: 'Could not fetch the data'}, {status: 500})
    } else {
      const resData = await response.json()
      return resData.events;
    }
  }
export async function loader({request, params}){
    const id = params.id
    return defer({
        event: loadEvent(id),
        events: loadedEvents()
    })
}

export async function action({request, params}){
    const id = params.id

    const response = await fetch('http://localhost:8080/events/' + id , {
        method: request.method
    })
    if(!response.ok){
        throw json({message: 'Could not delete the data'} , { status: 500})
    } else {
        return redirect('/events')
    } 
}
export default EventDetailPage
