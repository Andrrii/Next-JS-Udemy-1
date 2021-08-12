import { getEventById,getFeaturedEvents } from '../../helpers/api-util'
import EventSummary from '../../components/event-detail/event-summary'
import EventLogistics from '../../components/event-detail/event-logistics'
import EventContent from '../../components/event-detail/event-content'
import Button from '../../components/ui/button'
import Spinner from '../../components/ui/spinner'


function EventDetailPage ({event}) {
   
    if(!event) {
        return (
            <div className="center">
                <Spinner />
                <Button link = {'/events'}>Show All Events</Button>
            </div>
        )
    }

    return (
        <>
            <EventSummary title={event.title} />
            <EventLogistics
                date={event.date}
                address = {event.location}
                image = {event.image}
                imageAlt = {event.title}
            />
            <EventContent >
                <p>{event.description}</p>
            </EventContent>
        </>
    )
}

export async function getStaticProps({params:{eventId}}) {
    const event =  await getEventById(eventId)

    if(!event) {
        return {
            notFound: true
        }
    }

    return {
        props:{
            event
        },
        revalidate: 25
    }
}

export async function getStaticPaths() {

    const events = await getFeaturedEvents()

    const paths = events.map(item => ({params: { eventId: item.id }}))


    return {
        paths,
        fallback:true
    }
}

export default EventDetailPage