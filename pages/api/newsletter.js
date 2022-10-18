// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { ConnectDb, insertDocument } from '../../helpers/db-utils';

export default async function handler(req, res) {
  console.log('handle newsletter subscrition')
  if( req.method === 'POST'){
    console.log(req.body.email)
    const email = req.body.email;
    if( !email || !email.includes('@') ){
      res.status(422).jason({error: 'Invlaide email format'})
      return;
    }

    let client;
    try{
      client = await ConnectDb()
    }catch(error){
      res.status(500).json({message: 'Database Connection Failed'})
      return
    }

    try{
      await insertDocument(client, 'newsletter', {email: email})
      client.close()
    }catch(error){
      res.status(500).json({message: 'Inserting data failed'})
      return
    }

    res.status(201).json({ reply: `Thank you for subscribing ${email}` })
  }else{
    res.status(200).json({ reply: 'Please subscribe to our newsletter' })
  }
}