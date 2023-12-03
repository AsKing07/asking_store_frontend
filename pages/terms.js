/* eslint-disable react/no-unescaped-entities */
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styled from "styled-components";

const TermsContainer = styled.div`
  margin: 20px;
  padding: 20px;
  background-color: #f9f9f9;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 15px;
`;

export default function TermsAndConditions() {
  return (
    <>
      <Header />
      <TermsContainer>
        <Title>Conditions Générales</Title>
        <Paragraph>
          En utilisant ce site, vous acceptez de respecter et d'être lié par ces conditions générales.
        </Paragraph>
        <Paragraph>
          Toutes les informations personnelles que vous fournissez sur ce site seront traitées conformément à notre politique de confidentialité.
        </Paragraph>
        <Paragraph>
          Nous nous réservons le droit de modifier ces termes à tout moment sans préavis.
        </Paragraph>
        <Paragraph>
          Votre utilisation continue de ce site après de telles modifications constitue votre acceptation desdites modifications.
        </Paragraph>
        <Paragraph>
          Toutes les marques de commerce utilisées dans ce site sont la propriété de leurs détenteurs respectifs.
        </Paragraph>
        <Paragraph>
          En cas de litige, la juridiction compétente sera celle de [indiquer la ville/pays de juridiction].
        </Paragraph>
      </TermsContainer>
      <Footer />
    </>
  );
}
