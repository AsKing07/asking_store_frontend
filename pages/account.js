/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-key */
import Button from "@/components/Button";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import ProductBox from "@/components/ProductBox";
import SingleOrder from "@/components/SingleOrder";
import Spinner from "@/components/Spinner";
import Tabs from "@/components/Tabs";
import Title from "@/components/Title";
import WhiteBox from "@/components/WhiteBox";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import { RevealWrapper } from "next-reveal";
import Link from "next/link";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css'
import styled from "styled-components";

const ColsWrapper = styled.div`
display: grid;
grid-template-columns: 1fr;
@media screen and (min-width: 768px) {
  grid-template-columns: 1.2fr .8fr;
}
gap: 40px;
margin: 40px 0px;
  p {
    margin: 5px;
  }
`;

const CityHolder = styled.div`
  display:flex;
  gap: 5px;
`;

const WishedProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
`;


export default function AccountPage() {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [phone,setPhone] = useState('');
  const [addressLoaded, setAddressLoaded] = useState(true);
  const [wishlistLoaded, setWishlistLoaded] = useState(true);
  const [orderLoaded, setOrderLoaded] = useState(true);
  const [wishedProducts, setWishedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("Commandes");
  const [orders, setOrders] = useState([]);

  async function logout() {
    await signOut({
      callbackUrl: process.env.NEXT_PUBLIC_PUBLIC_URL,
    });
  }
  async function login() {
    await signIn("google");
  }
  function saveAddress() {
    const data = { name, email, city, streetAddress, postalCode, country,phone };
    axios.put("/api/address", data);
  }

  useEffect(() => {
    if (!session) {
      return;
    }
    setAddressLoaded(false);
    setWishlistLoaded(false);
    setOrderLoaded(false);
    axios.get('/api/address').then(response => {
        try{
            setPhone(response.data.phone);
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
    try{
        axios.get('/api/wishlist').then(response => {
            setWishedProducts(response.data.map(wp => wp.product));
            setWishlistLoaded(true);
          });
    }
    catch(e)
    {
        setWishlistLoaded(true);
    }

    try{
         axios.get('/api/orders').then(response => {
      setOrders(response.data);
      setOrderLoaded(true);
    });
    }
    catch(e)
    {
        setOrderLoaded(true);
    }
  
   
  }, [session]);

  function productRemovedFromWishlist(idToRemove) {
    setWishedProducts(products => {
      return [...products.filter(p => p._id.toString() !== idToRemove)];
    });
  }
  return (
    <>
      <Header />
      <Center>
        <ColsWrapper>
          <div>
            <RevealWrapper delay={0}>
              <WhiteBox>
            
              <Tabs
                  tabs={['Commandes','Liste de souhaits']}
                  active={activeTab}
                  onChange={setActiveTab}
                />
                {activeTab === 'Commandes' && (
                  <>
                 {!session &&  (<p>Connectez-vous pour voir vos commandes</p>) }

                    {!orderLoaded && (
                      <Spinner fullWidth={true} />
                    )}
                    {orderLoaded && session && (
                      <div>
                        {orders.length === 0 && (
                          <p>Vous n'avez pas encore de commandes!</p>
                        )}
                        {orders.length > 0 && orders.map(o => (
                          <SingleOrder {...o} />
                        ))}
                      </div>
                    )}
                  </>
                )}
                
                {activeTab === 'Liste de souhaits' && (
                    <>
                    {!wishlistLoaded && (
                      <Spinner fullWidth={true} />
                    )}
                    {wishlistLoaded && (
                      <>
                        <WishedProductsGrid>
                          {wishedProducts.length > 0 && wishedProducts.map(wp => (
                            wp!==null ?
                            <ProductBox key={wp?._id} {...wp} wished={true} onRemoveFromWishlist={productRemovedFromWishlist} />
                            :null
                          ))}
                        </WishedProductsGrid>
                        {wishedProducts.length === 0 && (
                          <>
                            {session && (
                              <p>Votre liste de souhaits est vide🥲</p>
                            )}
                            {!session && (
                              <p>Connectez vous pour ajouter des produits à votre liste de souhait!</p>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </WhiteBox>
            </RevealWrapper>
          </div>
          <div>
            <RevealWrapper delay={0}>
              <WhiteBox>
                <h2>{session ? "Détails du compte" : "Connexion"}</h2>
                {!addressLoaded && <Spinner fullWidth={true} />}
                {addressLoaded && session && (
                  <>
                    <Input
                      type="text"
                      placeholder="Nom"
                      value={name}
                      name="name"
                      onChange={(ev) => setName(ev.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder="Email"
                      value={email}
                      name="email"
                      onChange={(ev) => setEmail(ev.target.value)}
                    />
                    <PhoneInput className="phoneInput"
                       international
                        defaultCountry="BJ"
                        placeholder="Numéro de téléphone*"
                        value={phone}
                        onChange={setPhone}
                    />
                    <CityHolder>
                      <Input
                        type="text"
                        placeholder="Ville"
                        value={city}
                        name="city"
                        onChange={(ev) => setCity(ev.target.value)}
                      />
                      <Input
                        type="text"
                        placeholder="Code Postal"
                        value={postalCode}
                        name="postalCode"
                        onChange={(ev) => setPostalCode(ev.target.value)}
                      />
                    </CityHolder>
                    <Input
                      type="text"
                      placeholder="Adresse de la rue"
                      value={streetAddress}
                      name="streetAddress"
                      onChange={(ev) => setStreetAddress(ev.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder="Pays"
                      value={country}
                      name="country"
                      onChange={(ev) => setCountry(ev.target.value)}
                    />
                    <Button black block onClick={saveAddress}>
                      Sauvegarder
                    </Button>
                    <hr />
                  </>
                )}
                {session && (
                  <Button primary onClick={logout}>
                    Déconnexion
                  </Button>
                )}
                {!session && (
                  <>
                      <Button primary onClick={login}>
                    Connexion avec Google
                  </Button>
                  <p>En vous connectant, vous acceptez les <Link href={'/terms'}>Termes et conditions d'utilisation</Link></p>
                  </>
                
                  
                )}
              </WhiteBox>
            </RevealWrapper>
          </div>
        </ColsWrapper>
       
      </Center>
    </>
  );
}
