import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import {useContext, useEffect, useState} from "react";
import {CartContext} from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useRouter } from "next/router";
import {RevealWrapper} from "next-reveal";

// import { Product } from "@/models/Product";
import Modal from 'react-modal';
import { useSession } from "next-auth/react";
import Spinner from "@/components/Spinner";
Modal.setAppElement('#__next');



const customStylesModal = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const buttonStylesModal = {
  display: 'block',
  margin: '10px auto',
  padding: '10px 20px',
  backgroundColor: 'blue',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr .8fr;
  }
  gap: 40px;
  margin-top: 40px;
  margin-bottom: 40px;
  table thead tr th:nth-child(3),
  table tbody tr td:nth-child(3),
  table tbody tr.subtotal td:nth-child(2){
    text-align: right;
  }
  table tr.subtotal td{
    padding: 15px 0;
  }
  table tbody tr.subtotal td:nth-child(2){
    font-size: 1.4rem;
  }
  tr.total td{
    font-weight: bold;
  }
`;
const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
  button{padding:0 !important;}
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display:flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img{
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img{
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityHolder = styled.div`
  display:flex;
  gap: 5px;
`;

const AlertHolder = styled.p`
  color: red;
  font-size: 12px;
`;



export default function CartPage() {
  const { data: session } = useSession();
  const {cartProducts,addProduct,removeProduct,clearCart} = useContext(CartContext);
  const [products,setProducts] = useState([]);
  const [addressLoaded, setAddressLoaded] = useState(true);
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [city,setCity] = useState('');
  const [postalCode,setPostalCode] = useState('');
  const [streetAddress,setStreetAddress] = useState('');
  const [country,setCountry] = useState('');
  const [phone,setPhone] = useState('');
  const [isSuccess,setIsSuccess] = useState(false);
  const [showAlertText,setShowAlertText]= useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const router = useRouter();

  const handlePaymentMode = (mode) => {
    // Effectuer des actions en fonction du mode de paiement sélectionné
    //vérifier si un des champ est vide
    if (!name || !email || !city  || !streetAddress || !country || !phone) {
      // Handle empty field error
    alert("Veuillez remplir tous les champs requis (*)");
    setShowAlertText(true)
    
    }
    else if(mode==='Stripe')
    {
      goToPayment();
    }
    else
    {
      goToPaymentKKPay();
    }
    setModalIsOpen(false);
  };
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post('/api/cart', {ids:cartProducts})
        .then(response => {
          setProducts(response.data);
        })
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (!session) {
      return;
    }
    setAddressLoaded(false);
    axios.get('/api/address').then(response => {
        try{
          setPhone(response.data.phone)
            setName(response.data.name);
            setEmail(response.data.email);
            setCity(response.data.city);
            setPostalCode(response.data.postalCode);
            setStreetAddress(response.data.streetAddress);
            setCountry(response.data.country);
            setAddressLoaded(true);
        }
        catch(e)
        {
            setAddressLoaded(true);
        } 
    });
   
  }, [session]);


  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (window?.location.href.includes('success')) {
      try{
        clearCart();
      }
      catch(e)
      {
        console.log(`Impossible de vider le panier: ${e}`)
      }
      setIsSuccess(true);
    }
  }, []);


  function moreOfThisProduct(id) {
    addProduct(id);
  }
  function lessOfThisProduct(id) {
    removeProduct(id);
  }


  async function goToPaymentKKPay()
  {
    
    
   const response= await axios.post('/api/checkout', {
      name,email,city,postalCode,streetAddress,country,
      cartProducts,phone,methode:'kkpay',total
    });
    console.log(response);
    if (response.data.pathname) {

         router.push({
      pathname: `${response.data.pathname}`,
      query: response.data.query,
    });

    }
    
  }


  async function goToPayment() {
    const response = await axios.post('/api/checkout', {
      name,email,city,postalCode,streetAddress,country,
      cartProducts,phone,methode:'stripe',total
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }
  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find(p => p._id === productId)?.price || 0;
    total += price;
  }

  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Merci pour votre commande!</h1>
              <p>Nous vous enverrons un email lorsque votre commande sera envoyée.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }
  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
        <RevealWrapper delay={0}>
        <Box>
            <h2>Panier</h2>
            {!cartProducts?.length && (
              <div>Votre panier est vide!</div>
            )}
            {products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Produit</th>
                    <th>Quantité</th>
                    <th>Prix</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} alt=""/>
                        </ProductImageBox>
                        {product.title}
                      </ProductInfoCell>
                      <td>
                        <Button
                          onClick={() => lessOfThisProduct(product._id)}>-</Button>
                        <QuantityLabel>
                          {cartProducts.filter(id => id === product._id).length}
                        </QuantityLabel>
                        <Button
                          onClick={() => moreOfThisProduct(product._id)}>+</Button>
                      </td>
                      <td>
                        ${cartProducts.filter(id => id === product._id).length * product.price}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>Total:<strong>${total}</strong></td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>
        </RevealWrapper>
        
          {!!cartProducts?.length && (
            <RevealWrapper delay={100}>
                <Box>
              <h2>Informations de commande </h2>
              {!addressLoaded && <Spinner fullWidth={true} />}
                {addressLoaded  && (
                  <>
              <Input required type="text"
                     placeholder="Nom*"
                     value={name}
                     name="name"
                     onChange={ev => setName(ev.target.value)} />
              <Input required type="text"
                     placeholder="Email*"
                     value={email}
                     name="email"
                     onChange={ev => setEmail(ev.target.value)}/>
                      <PhoneInput className="phoneInput"
                       international
                      defaultCountry="BJ"
      placeholder="Numéro de téléphone*"
      value={phone}
      onChange={setPhone}/>
              <CityHolder>
                <Input required type="text"
                       placeholder="Ville*"
                       value={city}
                       name="city"
                       onChange={ev => setCity(ev.target.value)}/>
                <Input required type="text"
                       placeholder="Code Postal"
                       value={postalCode}
                       name="postalCode"
                       onChange={ev => setPostalCode(ev.target.value)}/>
              </CityHolder>
              <Input type="text"
                     placeholder="Adresse de la rue*"
                     value={streetAddress}
                     name="streetAddress"
                     onChange={ev => setStreetAddress(ev.target.value)}/>
              <Input required type="text"
                     placeholder="Pays*"
                     value={country}
                     name="country"
                     onChange={ev => setCountry(ev.target.value)}/>
                     {showAlertText &&
                     <AlertHolder>
                                Veuillez remplir tous les champs obligatoires (marqués par *) avant de continuer!

                     </AlertHolder>
                    }
                     
                     <Button black block onClick={() => setModalIsOpen(true)}>
  Continuer le paiement
</Button>
</>
                )}

            </Box>
            </RevealWrapper>
          
          )}
        </ColumnsWrapper>
       
      </Center>
      <Modal
  isOpen={modalIsOpen}
  onRequestClose={() => setModalIsOpen(false)}
  contentLabel="Exemple de dialogue"
  style={customStylesModal}
>
  <h2>Choisissez un mode de paiement :</h2>
  <form>
    <button
      style={buttonStylesModal}
      onClick={() => handlePaymentMode('KKiapay')}
    >
      KKiapay
    </button>
    <button
      style={buttonStylesModal}
      onClick={() => handlePaymentMode('Stripe')}
    >
      Stripe
    </button>
  </form>
  <button onClick={() => setModalIsOpen(false)}>Fermer</button>
</Modal>

    </>
  );
}