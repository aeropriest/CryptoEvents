// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {MongoClient} from 'mongodb'

export default async function handler(req, res) {
  console.log('handle newsletter subscrition')
  if( req.method === 'POST'){
    console.log(req.body.email)
    const email = req.body.email;
    if( !email || !email.includes('@') ){
      res.status(422).jason({error: 'Invlaide email format'})
      return;
    }

    const client = await MongoClient.connect('mongodb+srv://ashokjaiswal:hUWzNObFsCD4xIPT@cluster0.utylnvp.mongodb.net/events?retryWrites=true&w=majority')
    const db = client.db();
    await db.collection('newsletter').insertOne({email: email})
    client.close();

    res.status(201).json({ reply: `Thank you for subscribing ${email}` })
  }else{
    res.status(200).json({ reply: 'Please subscribe to our newsletter' })
  }
}