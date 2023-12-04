/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-key */
import styled from "styled-components";
import Input from "@/components/Input";
import WhiteBox from "@/components/WhiteBox";
import StarsRating from "@/components/StarsRating";
import Textarea from "@/components/Textarea";
import Button from "@/components/Button";
import {useEffect, useState} from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";


const Title = styled.h2`
  font-size:1.2rem;
  margin-bottom:5px;
`;
const Subtitle = styled.h3`
  font-size: 1rem;
  margin-top: 5px;
`;
const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-bottom: 40px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
`;
const ReviewWrapper = styled.div`
  margin-bottom: 10px;
  border-top: 1px solid #eee;
  padding: 10px 0;
  h3{
    margin:3px 0;
    font-size:1rem;
    color:#333;
    font-weight: normal;
  }
  p{
    margin:0;
    font-size: .7rem;
    line-height: 1rem;
    color:#555;
  }
`;
const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  time{
    font-size: 12px;
    color: #aaa;
  }
`;


const UserName = styled.p`
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 5px;
`;

const UserImage = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  object-fit: cover;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export default function ProductReviews({product}) {
    const {data:session} = useSession();
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [stars,setStars] = useState(0);
  const [reviews,setReviews] = useState([]);
  const [reviewsLoading,setReviewsLoading] = useState(false);
  function submitReview() {
    const data = {title,description,stars,product:product._id};
    axios.post('/api/reviews', data).then(res => {
      console.log(res)
      setTitle('');
      setDescription('');
      setStars(0);
      loadReviews();
    });
  }
  useEffect(() => {
    loadReviews();

  }, []);
  async function loadReviews() {
    setReviewsLoading(true);
   await  axios.get('/api/reviews?product='+product._id).then(res => {
      setReviews(res.data);
      setReviewsLoading(false);
    });
  }
  async function login() {
    await signIn("google");
  }
  return (
    <div>
      <Title>Commentaires</Title>
      <ColsWrapper>
        <div>
            {
                !session &&(
                    <WhiteBox>
                          <div>
              <Button primary onClick={login}>Connectez-vous pour laisser un commentaire</Button>
              <p>En vous connectant, vous acceptez les <Link href={'/terms'}>Termes et conditions d'utilisation</Link></p>

            </div>
                    </WhiteBox>
                )
            }
            {
                session &&(
                    <WhiteBox>
                    <Subtitle>Ajouter un commentaire</Subtitle>
                    <div>
                      <StarsRating onChange={setStars} />
                    </div>
                    <Input
                      value={title}
                      onChange={ev => setTitle(ev.target.value)}
                      placeholder="Titre" />
                    <Textarea
                      value={description}
                      onChange={ev => setDescription(ev.target.value)}
                      placeholder="Qu'avez-vous pensé de ce produit? Le recommandez-vous?" />
                    <div>
                      <Button primary onClick={submitReview}>Soumettre votre commentaire</Button>
                    </div>
                  </WhiteBox>
                )
            }
        
        </div>
        <div>
          <WhiteBox>
            <Subtitle>Tous les commentaires</Subtitle>
            {reviewsLoading && (
              <Spinner fullWidth={true} />
            )}
            {reviews.length === 0 && (
              <p>Pas de commentaire :(</p>
            )}
            {console.log(reviews)}
            {reviews.length > 0 && reviews.map(review => (
               
              <ReviewWrapper>
                <ReviewHeader>
                  <StarsRating size={'sm'} disabled={true} defaultHowMany={review.stars} />
                  <time>{(new Date(review.createdAt)).toLocaleString('fr-BJ')}</time>
                </ReviewHeader>
                <h3>{review.title}</h3>
                <p>{review.description}</p>
                 {/* Affichage du nom et de la photo de l'utilisateur */}
                 {review?.user && (
  <UserInfoWrapper>
    <UserImage src={review?.user?.image} alt="User" />
    <UserName>{review?.user?.name}</UserName>
                      
  </UserInfoWrapper>
)}
              </ReviewWrapper>
            ))}
          </WhiteBox>
        </div>
      </ColsWrapper>
    </div>
  );
}