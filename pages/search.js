/* eslint-disable react/no-unescaped-entities */
// Importation des composants et des styles nécessaires
import Header from "@/components/Header";
import Center from "@/components/Center";
import Input from "@/components/Input";
import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import ProductsGrid from "@/components/ProductsGrid";
import { debounce } from "lodash";
import Spinner from "@/components/Spinner";

// Styles pour le champ de recherche
const SearchInput = styled(Input)`
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 1.4rem;
`;

// Styles pour l'enveloppe du champ de recherche
const InputWrapper = styled.div`
  position: sticky;
  top: 68px;
  margin: 25px 0;
  padding: 5px 0;
  background-color: #eeeeeeaa;
`;

// Composant principal de la page de recherche
export default function SearchPage() {
  // États pour gérer la phrase de recherche, les produits et l'état de chargement
  const [phrase, setPhrase] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Création d'une fonction de recherche débouncée pour éviter les appels excessifs
  const debouncedSearch = useCallback(
    debounce(searchProducts, 500), []
  );

  // Effectuer une recherche chaque fois que la phrase de recherche change
  useEffect(() => {
    if (phrase.length > 0) {
      setIsLoading(true);
      debouncedSearch(phrase);
    } else {
      setProducts([]);
    }
  }, [phrase]);

  // Fonction pour rechercher des produits
  function searchProducts(phrase) {
    axios.get('/api/products?phrase=' + encodeURIComponent(phrase))
      .then(response => {
        setProducts(response.data);
        setIsLoading(false);
      });
  }

  // Rendu de la page de recherche
  return (
    <>
      {/* En-tête de la page */}
      <Header />

      {/* Contenu central de la page */}
      <Center>
        {/* Enveloppe du champ de recherche */}
        <InputWrapper>
          {/* Champ de recherche */}
          <SearchInput
            autoFocus
            value={phrase}
            onChange={ev => setPhrase(ev.target.value)}
            placeholder="Rechercher des produits..."
          />
        </InputWrapper>

        {/* Affichage des messages selon l'état de la recherche */}
        {!isLoading && phrase !== '' && products.length === 0 && (
          <h2>Aucun produit trouvé pour votre recherche "{phrase}"</h2>
        )}
        {isLoading && (
          <Spinner fullWidth={true} />
        )}
        {!isLoading && products.length > 0 && (
            <div>
                      <h2> {products.length} résultat(s) pour la recherche "{phrase}"</h2>
          <ProductsGrid products={products} />
            </div>
           
        )}
      </Center>
    </>
  );
}
