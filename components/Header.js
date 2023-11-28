import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";

const StyledHeader = styled.header`
background-color: #222;
`;

const Logo = styled(Link)`
color:#fff;
text-decoration:none;
`
;

const Wrapper = styled.div`
display: flex;
justify-content: space-between;
padding: 20px 0;
`;

const NavLink = styled(Link)`
color: #aaa;
text-decoration: none;

`;

const StyledNav = styled.nav`
display: flex;
gap: 15px;
`
;

export default function Header()
{
    return(
        
        <StyledHeader>
            <Center>
                <Wrapper>
                    <Logo href={'/'}>Asking Store</Logo>
                    <StyledNav>
                        <NavLink href={'/'}>Accueil</NavLink>
                        <NavLink href={'/products'}>Tous les produits</NavLink>
                        <NavLink href={'/categories'}>Catégories</NavLink>
                        <NavLink href={'/account'}>Compte</NavLink>
                        <NavLink href={'/cart'}>Panier(0)</NavLink>
                    </StyledNav>
                </Wrapper>
               
            </Center>
          
        </StyledHeader>
    )
}