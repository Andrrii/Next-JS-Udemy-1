import {useRouter} from 'next/router'
import { getEventById } from '../../dummy-data'
import EventSummary from '../../components/event-detail/event-summary'
import EventLogistics from '../../components/event-detail/event-logistics'
import EventContent from '../../components/event-detail/event-content'
import ErrorAlert from '../../components/ui/error-alert'
import Button from '../../components/ui/button'


function EventDetailPage () {

    const router = useRouter()

    const {eventId} = router.query

    const event =  getEventById(eventId)

    if(!event) {
        return (
            <div className="center">
                <ErrorAlert>            
                    <p>No event found</p>
                </ErrorAlert>
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

export default EventDetailPage