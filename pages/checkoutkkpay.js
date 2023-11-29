
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


    const data = {orderId:orderId,name:name, email:email,city:city, streetAddress:streetAddress, country:country, items:items}
    const success_url= process.env.NEXT_PUBLIC_PUBLIC_URL + `/cart?success=1`;
    const cancel_url= process.env.NEXT_PUBLIC_PUBLIC_URL + '/cart?canceled=1';

   
async function successHandler(response) {
  // Effectuez une requête vers votre endpoint d'API pour mettre à jour l'état de paiement
  await axios.post('/api/updatePaymentStatus', {
    status: 'success',
    orderId: orderId,
  });

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
        phone: phone.substring(4),
      });
  
  
    
  
  

    
    

   return(
    <div></div>
   )

}

