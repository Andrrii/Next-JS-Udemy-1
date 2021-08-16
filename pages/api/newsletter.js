import { MongoClient } from 'mongodb'

import {connectDatabase,insertDocuments} from '../../helpers/db-util'

async function handler(req,res) {
    if (req.method === 'POST') {
        const userEmail = req.body.email;
        if(!userEmail || !userEmail.includes('@')) {
            res.status(422).json({message: 'Invalid email address'})
            return;
        }

        let client

        try{
            // записуєм дані в датабазу
            client = await connectDatabase()
        }
        catch(err){
            res.status(500).json({message: "Connection with database don't work" + '\n'  + err})
            return;
        }
        
        try{
            await insertDocuments(client,'newsLetter',{ email: userEmail})
            client.close()
        }
        catch(err) {
            res.status(500).json({message: "Inserting data failed" + '\n'  + err})
        }    
        
        res.status(201).json({message: 'Signed UP!!!'})
    }
}

export default handler