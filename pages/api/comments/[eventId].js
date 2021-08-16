
import {connectDatabase,insertDocuments,getAllDocuments} from '../../../helpers/db-util'


async function handler(req,res) {

    const eventId = req.query.eventId
    let client
    try {
        client = await connectDatabase()
    }catch(err) {
        res.status(500).json({message: "Connection with database don't work" + '\n'  + err})
        return;
    }

    if (req.method === "POST") {
        const {email,name,text} = req.body

        if(!email.includes('@') ||
            !name ||
            name.trim() === '' ||
            !text ||
            text.trim() === ''
        ) {
            res.status(422).json({message: 'Invalid input'})
            client.close()
            return // виходимо із функції
        }

        const newComment = {
            email,
            name,
            text,
            eventId
        }

        let result

        try{
            result = await insertDocuments(client,'comments',newComment)
            newComment._id = result.insertedId

            res.status(201).json({ message: 'Added comment',comment: newComment})
        } catch(err) {
            res.status(500).json({message: "Inserting comment failed" + '\n'  + err})
            
        } 

    }

    if (req.method === "GET") {
        // Беремо дані із ДБ
        try {
            const documents = await getAllDocuments(client, 'comments',{_id: -1},{eventId})
            res.status(200).json({comments: documents})
        }catch(err) {
            res.status(500).json({message: "Getting comments failed" + '\n' + err})
            return 
        }
    }

    client.close()
}

export default handler