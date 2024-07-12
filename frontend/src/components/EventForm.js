import { Form, json, redirect, useActionData, useNavigate } from 'react-router-dom';

import classes from './EventForm.module.css';

const server = import.meta.env.REACT_SERVER_URL

function EventForm({ method, event }) {
  const data = useActionData()
  const navigate = useNavigate();
  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method={method} className={classes.form}>
      {data && data.error && (<ul>
        {Object.values(data.error).map((err) => (
          <li key={err}>{err}</li>
        ))}
      </ul>)}
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required defaultValue={event && event.title}/>
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required defaultValue={event && event.image}/>
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required defaultValue={event && event.date}/>
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required defaultValue={event && event.description}/>
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button>Save</button>
      </div>
    </Form>
  );
}

export async function action({request, params}){
  const data = await request.formData()
  const method = request.method
  const id = params.id

  const eventData = {
      title: data.get('title'),
      image: data.get('image'),
      date: data.get('date'),
      description: data.get('description')
  }
  let url = `${server}/events`

  if(method === 'PATCH'){
    url = `${server}/events/` + id
  }
  const response = await fetch(url, {
      method: method,
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventData)
  })

  if(response.status === 422){
      return response
  }

  if(!response.ok){
      throw json({message: 'Could not send the data to the server'}, {status: 500})
  } else {
      return redirect('/events')
  }
}
export default EventForm;
