import { ConnectDb, insertDocument, getDocument } from "../../../helpers/db-utils";

export default async function handler(req, res) {
  
    const eventId = req.query.eventId
    let client;
    try{
      client = await ConnectDb()
    }catch(error){
      res.status(500).json({message: 'Database Connection Failed'})
      return
    }

    console.log('handle comments for event', eventId)


    if( req.method === 'POST'){
      //check if entered data is correct
      const {email, name, comment} = req.body

      if( !name || name.trim() ==='' || !email.includes('@')|| !email || !comment || comment.trim() ===''){
        res.status(422).jason({message: 'Invlaide input'})
        client.close();
        return;  
      }

      const newComment = {
        name: name,
        email: email,
        comment: comment,
        eventId: eventId
      }

      console.log(newComment)

      let result;
      try{
        result = await insertDocument(client, 'comments', newComment)
        
        newComment._id = result.insertedId
        res.status(201).json({ message: `Thank you for your comments `, comment: newComment })

      }catch(error){
        res.status(500).json({message: 'Inserting comments failed'})        
      }
    }
    
    if( req.method === 'GET'){

      try{
        const documents = await getDocument(client, 'comments')
        res.status(200).json({ comments: documents })
      }catch(error){
        res.status(500).json({message: 'Failed to get document'})        
      }
      
    }

    client.close();
  }