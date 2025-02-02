import React from 'react'
import MainNavigation from '../components/MainNavigation'
import PageContent from '../components/PageContent'
import { useRouteError } from 'react-router-dom'

const Error = () => {
    const error = useRouteError()

    let title = 'An error occured'
    let message = 'Something went wrong'

    if(error.status === 500){
        message = error.data.message
    }
    if(error.status === 404){
        title = 'Not found!'
        message = 'Could not find resource or page'
    }
  return (
    <>
      <MainNavigation/>
      <PageContent title={title}>{message}</PageContent>
    </>
  )
}

export default Error
