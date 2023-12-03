import styled from "styled-components";
import GitHubIcon from "./icons/Github";
import FacebookIcon from "./icons/FacebookIcon";

const FooterContainer = styled.footer`
  background-color: black; /* Arrière-plan noir */
  padding: 20px;
  margin-top: 50px; 
`;

const SocialMediaIcons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const SocialMediaLink = styled.a`
  text-decoration: none;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }
`;

const SocialMediaIcon = styled.img`
  width: 25px; /* Taille des icônes à adapter selon vos besoins */
  height: auto;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 10px;
`;

const FooterLink = styled.li`
  a {
    color: #fff; /* Couleur du texte pour les liens */
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.3s ease;
  }

  a:hover {
    color: #aaa; /* Couleur du texte au survol */
  }
`;

const Copyright = styled.p`
  text-align: center;
  font-size: 0.8rem;
  color: #888;
`;

export default function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <SocialMediaIcons>
          <SocialMediaLink href="#">
            <GitHubIcon />
          </SocialMediaLink>
          <SocialMediaLink href="#">
            <FacebookIcon />
          </SocialMediaLink>
          {/* Ajoutez d'autres icônes et liens vers d'autres réseaux sociaux si nécessaire */}
        </SocialMediaIcons>
        <FooterLinks>
          <FooterLink>
            <a href="/about">À propos de nous</a>
          </FooterLink>
          <FooterLink>
            <a href="/terms">Termes et conditions</a>
          </FooterLink>
          <FooterLink>
            <a href="/contactus">Contactez-nous</a>
          </FooterLink>
          {/* Ajoutez d'autres liens si nécessaire */}
        </FooterLinks>
        <Copyright>
          © {new Date().getFullYear()} Asking. Tous droits réservés.
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
}
