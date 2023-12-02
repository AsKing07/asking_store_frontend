import { mongooseConnect } from "@/lib/mongoose";
import { Review } from "@/models/Review";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  await mongooseConnect();
try{
    const { user } = await getServerSession(req, res, authOptions);
}catch(e)
{

}


  if (req.method === 'POST' && user) {
    const { title, description, stars, product } = req.body;
    // const userId = user?.id; // Récupération de l'ID de l'utilisateur connecté
    res.json(await Review.create({ title, description, stars, product, user }));
  }

  if (req.method === 'GET') {
    const { product } = req.query;
    const reviews = await Review.find({ product }, null, { sort: { createdAt: -1 } });
    res.json(reviews);
  }
}
