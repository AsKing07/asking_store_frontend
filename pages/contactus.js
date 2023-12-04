import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

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

export default  function ContactUs() {
    const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [message, setMessage] = useState('')
const [phone, setPhone] = useState('')
const [submitted, setSubmitted] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
  console.log('Sending')
let data = {
    name,
    email,
    phone,
    message
  }
   
   
    try {
       const response = axios.post('/api/contact',data)
       console.log(response)
     
        if (response.code!==200) {
          throw new Error(`Invalid response: ${response.status}`);
        }
        alert('Merci de nous avoir contacter! Nous vous répondrons sous peu!');
        console.log('Response succeeded!')
        setSubmitted(true)
      } catch (err) {
        console.error(err);
        alert("Nous ne pouvons pas envoyer votre email pour le moment, réessayer plus tard?");
      }
  };

  return (
    <>
      <Header />
      <ContactContainer>
        <Title>Contactez-nous</Title>
        <ContactForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Nom</Label>
            <Input type="text" id="name" name="name" onChange={(e)=>{setName(e.target.value)}} required />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Adresse email</Label>
            <Input type="email" id="email" name="email" onChange={(e)=>{setEmail(e.target.value)}} required />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="phone">Numéro de Téléphone</Label>
            <Input type="text" id="phone" name="phone" onChange={(e)=>{setPhone(e.target.value)}}  />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="message">Message</Label>
            <TextArea id="message" name="message" rows="5" onChange={(e)=>{setMessage(e.target.value)}} required />
          </FormGroup>
          <SubmitButton type="submit">Envoyer</SubmitButton>
        </ContactForm>
      </ContactContainer>
      <Footer />
    </>
  );
}
