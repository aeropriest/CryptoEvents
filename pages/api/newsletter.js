// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  console.log('handle newsletter subscrition')
  if( req.method === 'POST'){
    console.log(req.body.email)
    const email = req.body.email;
    if( !email || !email.includes('@') ){
      res.status(422).jason({error: 'Invlaide email format'})
      return;
    }
    //console.log('Sign user up for ', email)
    res.status(201).json({ reply: `Thank you for subscribing ${email}` })
  }else{
    res.status(200).json({ reply: 'Please subscribe to our newsletter' })
  }
}