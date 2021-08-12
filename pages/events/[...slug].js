import { getFilteredEvents } from "../../helpers/api-util";
import EventList from "../../components/events/events-list";
import ResultsTitle from "../../components//events/results-title/results-title"
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert"
import Head from "next/head"

function FilteredEventsPage ({filteredData,filteredEvents,date}) {

    const pageHeadData = (
        <Head>
            <title>Filtered Events</title>
            <meta 
                name = 'description'
                content = 'Find a lot of great events that allows you to evolve your life'
            />
        </Head>
    )

    if(!filteredData) {
        return (
            <>
                {pageHeadData}
                <p className="center">
                    Loading...
                </p>
            </>
        )
    }

    if(!filteredEvents || filteredEvents.length === 0) {
        return (
            <>
                {pageHeadData}
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
            {pageHeadData}
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