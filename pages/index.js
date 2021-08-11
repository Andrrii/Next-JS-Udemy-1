import Head from 'next/head'
import Image from 'next/image'
import {getFeaturedEvents} from '../helpers/api-util'
import EventList from '../components/events/events-list'

export default function Home({featuredEvents}) {


  return (
    <>
      <h1>The Home Page</h1>
      <EventList items = {featuredEvents}/>
    </>
  )
}

export async function getStaticProps(context) {
  const featuredEvents = await getFeaturedEvents()
  return {
    props: {
      featuredEvents
    }
  }
}
