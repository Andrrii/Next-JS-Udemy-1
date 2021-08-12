import { getFilteredEvents } from "../../helpers/api-util";
import EventList from "../../components/events/events-list";
import ResultsTitle from "../../components//events/results-title/results-title"
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert"

function FilteredEventsPage ({filteredData,filteredEvents,date}) {



    if(!filteredData) {
        return (
            <p className="center">
                Loading...
            </p>
        )
    }

    if(!filteredEvents || filteredEvents.length === 0) {
        return (
            <>
                <div className="center">
                    <ErrorAlert>
                        <p>No events found for the chosen filter!</p>
                    </ErrorAlert>
                    <Button link = {'/events'}>Show All Events</Button>
                </div>
            </>
        )
    }

   

    return (
        <>  
            <ResultsTitle date = {date} />
            <EventList items = {filteredEvents} />
        </>
    )
}

export async function getServerSideProps({params:{slug}}) {

    const filteredData = slug

    const filteredYear = filteredData[0]
    const filteredMonth = filteredData[1]

    const numYear = +filteredYear,
          numMonth = +filteredMonth

    
    if( 
        isNaN(numYear)  || isNaN(numMonth) || 
        numYear < 2021  || numYear > 2030  ||
        numMonth < 1    || numMonth > 12 ) {

            return {
                notFound:true,
                // redirect:{
                //     destination: '/error'
                // }
            }
    }   

    const filteredEvents = await getFilteredEvents({
        year: numYear,
        month: numMonth,
    })

    const date = new Date(numYear,numMonth-1).toString()

    return {
        props: {
            filteredData,
            filteredEvents,
            date
        }
    }

}

export default FilteredEventsPage;