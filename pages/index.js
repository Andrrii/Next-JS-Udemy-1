import Head from 'next/head'
import Link from 'next/link'
import {getFeaturedEvents} from '../helpers/api-util'
import EventList from '../components/events/events-list'
import NewsletterRegistration from '../components/input/newsletter-registration'

export default function Home({featuredEvents}) {


  return (
    <>
      <Head>
        <title>NextJS Events</title>
        <meta 
          name = 'description'
          content = 'Find a lot of great events that allows you to evolve your life'
        />
      </Head>
      <h1>The Home Page</h1>
      <NewsletterRegistration />
      <EventList items = {featuredEvents}/>
    </>
  )
}

export async function getStaticProps(context) {
  const featuredEvents = await getFeaturedEvents()
  return {
    props: {
      featuredEvents
    },
    revalidate: 900
  }
}
