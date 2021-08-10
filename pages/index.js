import Head from 'next/head'
import Image from 'next/image'
import {getFeaturedEvents} from '../dummy-data.js'
import EventList from '../components/events/events-list'

export default function Home() {

  const featuredEvents = getFeaturedEvents()

  return (
    <>
      <h1>The Home Page</h1>
      <EventList items = {featuredEvents}/>
    </>
  )
}
