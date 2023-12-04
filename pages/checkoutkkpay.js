
'use client'

import { mongooseConnect } from '@/lib/mongoose';

import axios from 'axios';
import { useKKiaPay } from 'kkiapay-react';
import { useRouter } from 'next/router';


import { useEffect } from 'react';


 export default  function  Checkoutkkpay()
{

 
  const { openKkiapayWidget, addKkiapayListener } = useKKiaPay();
  const router = useRouter();

  const{name, email, city, postalCode,streetAddress,country,
    cartProducts,phone, total, orderId,items}= router.query;
//enlever les quatres premiers caractères de la variable phone apres l'avoir converti en string
const phoneWithoutPrefix = String(phone).substring(4);

    const data = {orderId:orderId,name:name, email:email,city:city, streetAddress:streetAddress, country:country, items:items}
    const success_url= process.env.NEXT_PUBLIC_PUBLIC_URL + `/cart?success=1`;
    const cancel_url= process.env.NEXT_PUBLIC_PUBLIC_URL + '/cart?canceled=1';

   
async function successHandler(response) {
  // Effectuez une requête vers votre endpoint d'API pour mettre à jour l'état de paiement
  await axios.post('/api/updatePaymentStatus', {
    status: 'success',
    orderId: orderId,
  });
  console.log(response)

  // let nodemailer = require('nodemailer');
  //       const transporter = nodemailer.createTransport({ 
  //         service: 'Gmail',
  //         auth : { 
  //             user : 'charbelsnn@gmail.com', 
  //             pass : process.env.GOOGLE_APP_PASSWORD, 
  //         }, 
  //         secure : true, 
  //     });
  //     transporter.verify((error) => {
  //         if (error) {
  //             console.log(error);
  //         } else {
  //             console.log("Ready to Send");
  //         }
  //     });

  //     const Mail = {
  //       from: "AsKing Store- Do Not reply", // Modifier l'expéditeur
  //       to: response.data.email, // Utiliser l'adresse e-mail de l'utilisateur
  //       subject: "Merci pour votre commande - AsKing Store",
  //       html: `<p>Bonjour ${response.data.name},</p>
  //              <p>Nous vous remercions d'avoir choisi AsKing Store.</p>
  //              <p>Nous avons bien reçu votre commande!</p>
  //              <p>Nous la traiterons et vous serez livré dans les plus brefs délais</p>
  //              <p>Adrese de livraison: ${response.data.country}, ${response.data.city}, ${response.data.streetAddress} </p>
  //              <p>Nous vous recontacterons sous peu.</p>
  //              <p>Cordialement,<br/>L'équipe AsKing Store</p>
  //              <p>Cet email a été envoyé automatiquement, veuillez ne pas y répondre!</p>`,
  //   };

  //   transporter.sendMail(Mail, (err) => {
  //     if (err) {
  //         res.json(err);
  //     } else {
  //         res.json({ code: 200, status: "Message Sent" });
  //     }
  // });
      

  window.location = success_url;
}
    
    function failureHandler(error) {
      console.log(error);
      window.location = cancel_url
      // const queryParams = {
      //   canceled:1
      // };
      // router.push({
      //   pathname: process.env.PUBLIC_URL + '/cart',
      //   query: queryParams,
      // });
    }
  
    useEffect(() => {
      addKkiapayListener('success', successHandler)
      addKkiapayListener('failed', failureHandler)
    }, [addKkiapayListener]);
  
    
  
      openKkiapayWidget({
        data:data,
        name:name,
        amount: parseInt(total) ,
        api_key: '74707e40729f11eea29bd729ceb25af7',
        sandbox: true,
        email: email,
        phone: phoneWithoutPrefix,
      });
  
  
    
  
  

    
    

   return(
    <div></div>
   )

}

