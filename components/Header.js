import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import {useContext, useState} from "react";
import {CartContext} from "@/components/CartContext";
import BarsIcon from "@/components/icons/Bars";
import SearchIcon from "./icons/SearchIcon";
import Button from "./Button";
import { signIn, signOut, useSession } from "next-auth/react";

const StyledHeader = styled.header`
  background-color: #222;
  position:sticky;
  top:0;
  z-index:10;
`;
const Logo = styled(Link)`
  color:#fff;
  text-decoration:none;
  position: relative;
  z-index: 3;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;
const StyledNav = styled.nav`
  ${props => props.mobileNavActive ? `
    display: block;
  ` : `
    display: none;
  `}
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #222;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;
const NavLink = styled(Link)`
  display: block;
  color:#aaa;
  text-decoration:none;
  min-width:30px;
  padding: 10px 0;
  svg{
    height:20px;
  }
  @media screen and (min-width: 768px) {
    padding:0;
  }
`;
const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border:0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;
const SideIcons = styled.div`
  display: flex;
  align-items: center;
  a{
    display:inline-block;
    min-width:20px;
    color:white;
    svg{
      width:14px;
      height:14px;
    }
  }
`;

const LoginButton = styled(Button)`
min-width:30px;
display: block;

`;


export default function Header()
{

  async function login() {
    await signIn("google");
  }
  async function logout() {
    await signOut({
      callbackUrl: process.env.NEXT_PUBLIC_PUBLIC_URL,
    });
  }
  const {data:session}= useSession();
    const {cartProducts} = useContext(CartContext);
    const [mobileNavActive,setMobileNavActive] = useState(false);
    return(
        
        <StyledHeader>
            <Center>
                <Wrapper>
                    <Logo href={'/'}>Asking Store</Logo>
                    <StyledNav mobileNavActive={mobileNavActive}>
                        <NavLink href={'/'}>Accueil</NavLink>
                        <NavLink href={'/products'}>Tous les produits</NavLink>
                        <NavLink href={'/categories'}>Catégories</NavLink>
                        <NavLink href={'/account'}>Compte</NavLink>
                        <NavLink href={'/cart'}>Panier({cartProducts.length})</NavLink>
                          {
                            !session &&(
                              <LoginButton primary onClick={login}>Se Connecter</LoginButton>
                            )
                          }
                          {
                            session &&(
                              <LoginButton primary onClick={logout}>Se Deconnecter</LoginButton>
                            )
                          }
                       
                    </StyledNav>
                    <SideIcons>
            <Link href={'/search'}><SearchIcon /></Link>
            <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
              <BarsIcon />
            </NavButton>
          </SideIcons>
                </Wrapper>
               
            </Center>
          
        </StyledHeader>
    )
}