import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styled from "styled-components";

const ContactContainer = styled.div`
  margin: 20px;
  padding: 20px;
  background-color: #f9f9f9;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default function ContactUs() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Ajouter ici la logique pour traiter le formulaire de contact
  };

  return (
    <>
      <Header />
      <ContactContainer>
        <Title>Contactez-nous</Title>
        <ContactForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Nom</Label>
            <Input type="text" id="name" name="name" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Adresse email</Label>
            <Input type="email" id="email" name="email" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="message">Message</Label>
            <TextArea id="message" name="message" rows="5" />
          </FormGroup>
          <SubmitButton type="submit">Envoyer</SubmitButton>
        </ContactForm>
      </ContactContainer>
      <Footer />
    </>
  );
}
