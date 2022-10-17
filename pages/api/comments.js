// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    console.log('handle newsletter subscrition')
    if( req.method === 'GET'){
      //console.log('Sign user up for ', email)
      res.status(201).json({ reply: `Thank you for your comments` })
    }else{
      res.status(200).json({ reply: 'Please subscribe to our newsletter' })
    }
  }