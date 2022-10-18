import {MongoClient} from 'mongodb'


export default async function handler(req, res) {
  const eventId = req.query.eventId
    console.log('handle comments for event', eventId)
    if( req.method === 'POST'){

      //check if entered data is correct
      const {email, name, comment} = req.body

      if( !name || name.trim() ==='' || !email.includes('@')|| !email || !comment || comment.trim() ===''){
        res.status(422).jason({message: 'Invlaide input'})
        return;  
      }

      const newComment = {
        name: name,
        email: email,
        comment: comment,
        eventId: eventId
      }

      console.log(newComment)

      const client = await MongoClient.connect('mongodb+srv://ashokjaiswal:hUWzNObFsCD4xIPT@cluster0.utylnvp.mongodb.net/events?retryWrites=true&w=majority')
      const db = client.db();
      const result = await db.collection('comments').insertOne(newComment)
      console.log(result)
      client.close();

      
      res.status(201).json({ message: `Thank you for your comments `, comment: newComment })
    }
    
    if( req.method === 'GET'){
      const commentsList = [
        {id:'c1', email:'a@s.com', name: 'Sir A', comment: 'First comment'},
        {id:'c1', email:'a@s.com', name: 'Mister B', comment: 'Second Comment'},
        {id:'c1', email:'a@s.com', name: 'Lady C', comment: 'Thrid Comment'},
      ]
      res.status(200).json({ comments: commentsList })
    }
  }