import {mongooseConnect} from "@/lib/mongoose";
const stripe = require('stripe')(process.env.STRIPE_SK);
import {buffer} from 'micro';
import {Order} from "@/models/Order";

// const endpointSecret = "whsec_575fc5f6800a64f03f95467baa29ea102d3c33862eb3cf0db1d191555df8cdda";
const endpointSecret="whsec_mhZ5uzHWPc5BpC0l9kb07I7nOVp9rAaR";
export default async function handler(req,res) {
  await mongooseConnect();
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === 'paid';
      console.log(data)
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId,{
          paid:true,
        })
        let nodemailer = require('nodemailer');
        const transporter = nodemailer.createTransport({ 
          service: 'Gmail',
          auth : { 
              user : 'charbelsnn@gmail.com', 
              pass : process.env.GOOGLE_APP_PASSWORD, 
          }, 
          secure : true, 
      });
      transporter.verify((error) => {
          if (error) {
              console.log(error);
          } else {
              console.log("Ready to Send");
          }
      });

      const Mail = {
        from: "AsKing Store- Do Not reply", // Modifier l'expéditeur
        to: data.customer_email, // Utiliser l'adresse e-mail de l'utilisateur
        subject: "Merci pour votre commande - AsKing Store",
        html: `<p>Bonjour ${data.customer_details.name},</p>
               <p>Nous vous remercions d'avoir choisi AsKing Store.</p>
               <p>Nous avons bien reçu votre commande!</p>
               <p>Nous la traiterons et vous serez livré dans les plus brefs délais :</p>
               <p>Nous vous recontacterons sous peu.</p>
               <p>Cordialement,<br/>L'équipe AsKing Store</p>
               <p>Cet email a été envoyé automatiquement, veuillez ne pas y répondre!</p>`,
    };

    transporter.sendMail(Mail, (err) => {
      if (err) {
          res.json(err);
      } else {
          res.json({ code: 200, status: "Message Sent" });
      }
  });
      
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send('ok');
}

export const config = {
  api: {bodyParser:false,}
};

//  quiet-lavish-bonny-skill
// acct_1OHcjUJu8ctDlNib