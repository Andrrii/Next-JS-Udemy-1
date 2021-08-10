import { useRouter } from "next/router";
import EventList from "../../components/events/events-list";
import EventSearch from "../../components/events/events-search";
import { getAllEvents } from "../../dummy-data";

function AllEventsPage () {

    const events = getAllEvents();

    const router = useRouter()

    function findEventsHandler (year,month) {
        const fullPath = `/events/${year}/${month}`
        router.push(fullPath)
    }

    return (
        <>
            <EventSearch onSearch={findEventsHandler} />
            <EventList items={events} />
        </>
    )
}

export default AllEventsPage;