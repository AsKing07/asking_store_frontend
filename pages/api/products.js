// Importation des modules nécessaires depuis les bibliothèques et les modèles
import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";


// Fonction asynchrone pour gérer la requête HTTP
export default async function handle(req, res) {
    // Établissement de la connexion à la base de données MongoDB
    await mongooseConnect();

    // Extraction des paramètres de requête, tels que les catégories, le tri, la phrase de recherche et les filtres
    const {categories, sort, phrase, ...filters} = req.query;

     // Initialisation des champs de tri par défaut s'ils ne sont pas spécifiés dans la requête
    let [sortField, sortOrder] = (sort || '_id-desc').split('-');

    // Construction de l'objet de requête pour la recherche de produits
    const productsQuery = {};

     // Vérification et ajout des catégories à la requête de recherche des produits, si spécifiées
    if (categories) {
        productsQuery.category = categories.split(',');
    }

    // Vérification et ajout de la phrase de recherche aux critères de la requête, si spécifiée
    if (phrase) {
        productsQuery['$or'] = [
        {title:{$regex:phrase,$options:'i'}},
        {description:{$regex:phrase,$options:'i'}},
        ];
    }

    // Vérification et ajout des filtres supplémentaires aux critères de la requête, si spécifiés
    if (Object.keys(filters).length > 0) {
        Object.keys(filters).forEach(filterName => {
        productsQuery['properties.'+filterName] = filters[filterName];
        });
    }
  console.log(productsQuery);

   // Renvoi des produits correspondant aux critères de recherche spécifiés
  res.json(await Product.find(
    productsQuery, // Critères de recherche
    null,// Sélection des champs à retourner (null pour tout retourner)
    {
      sort:{[sortField]:sortOrder==='asc' ? 1 : -1}// Tri des résultats
    })
  );
}