import EventList from "../../components/events/events-list";
import EventSearch from "../../components/events/events-search";
import { getAllEvents } from "../../helpers/api-util";
import {useRouter} from "next/router"
import Head from "next/head";

function AllEventsPage ({events}) {

    const router = useRouter()

    function findEventsHandler (year,month) {
        const fullPath = `/events/${year}/${month}`
        router.push(fullPath)
    }

    return (
        <>
            <Head>
                <title>NextJS Events</title>
                <meta 
                name = 'description'
                content = 'Find a lot of great events that allows you to evolve your life'
                />
            </Head>
            <EventSearch onSearch={findEventsHandler} />
            <EventList items={events} />
        </>
    )
}

export async function getStaticProps() {
    const events = await getAllEvents();

    return {
        props: {
            events
        },
        revalidate:60
    }
}

export default AllEventsPage;