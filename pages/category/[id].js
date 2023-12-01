/* eslint-disable react/jsx-key */
import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import Spinner from "@/components/Spinner";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

/* Styles pour la mise en page de la page de la catégorie */
const CategoryHeader = styled.div`
  display: flex;
  flex-direction: column; 
  align-items: flex-start;
  h1 {
    font-size: 1.5em;
    margin-bottom: 10px; 
  }
`;

/* Styles pour l'enveloppe des filtres */
const FiltersWrapper = styled.div`
  display: flex;
  flex-wrap: wrap; 
  gap: 15px;
`;

/* Styles pour les filtres individuels */
const Filter = styled.div`
  background-color: #ddd;
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  gap: 5px;
  color: #444;
  margin-bottom: 10px; /* Espacement en bas de chaque filtre */
  select {
    background-color: transparent;
    border: 0;
    font-size: inherit;
    color: #444;
  }
`;

// export default function CategoryPage({category,subCategories,products:originalProducts})
// {
//     //valeurs par défaut de certains états
//     const defaultSorting = '_id-desc';
    // const defaultFilterValues = category.properties
    // .map(p => ({name:p.name,value:'all'}));

//     // État local pour gérer les produits, les filtres, la charge et le tri
//     const [products,setProducts] = useState(originalProducts);
//     const [filtersValues,setFiltersValues] = useState(defaultFilterValues);
//     const [sort,setSort] = useState(defaultSorting);
//     const [loadingProducts,setLoadingProducts] = useState(false);
//     const [filtersChanged,setFiltersChanged] = useState(false);

//     // Gestionnaire de changement de filtre
//     function handleFilterChange(filterName, filterValue) {
//         // Met à jour les valeurs des filtres
//         setFiltersValues(prev => {
//         return prev.map(p => ({
//             name:p.name,
//             value: p.name === filterName ? filterValue : p.value,
//         }));
//         });
//         setFiltersChanged(true);
//     }

//     // Effet pour charger les produits en fonction des filtres et du tri
//     useEffect(()=>{
//         if (!filtersChanged) {
//             return;
//         }
//         setLoadingProducts(true);
//         const catIds = [category._id, ...(subCategories?.map(c => c._id) || [])];
//         const params = new URLSearchParams;
//         params.set('categories', catIds.join(','));
//         params.set('sort', sort);
//         filtersValues.forEach(f => {
//             if (f.value !== 'all') {
//             params.set(f.name, f.value);
//             }
//         });
//         const url = `/api/products?` + params.toString();
//         axios.get(url).then(res => {
//             setProducts(res.data);
//             setLoadingProducts(false);
//         })

//     },[filtersValues, sort, filtersChanged])

//     // Rendu de la page individuelle pour chaque produit avec les produits et les filtres
//     return(
//         <>
//         <Header />
//         <Center>
//             <CategoryHeader>
//                  {/* ... (affichage du titre de la catégorie) */}
//                 <h1>{category.name}</h1>
//                 <FiltersWrapper>
//                     {/* ... (affichage des filtres pour la catégorie) */}
//                     {category.properties.map(prop =>(
//                         <Filter key={prop.name}>
//                             {prop.name}
//                             <select
//                              onChange={ev => handleFilterChange(prop.name, ev.target.value)}
//                              value={filtersValues.find(f => f.name === prop.name).value}>
//                                 <option value="all">Tout</option>
//                                 {prop.values.map(val =>(
//                                     <option key={val} value={val}>{val}</option>  
//                                 ))}
//                             </select>
//                         </Filter>
//                     ))}
//                      <Filter>
//               <span>Trier:</span>
//               <select
//                 value={sort}
//                 onChange={ev => {
//                   setSort(ev.target.value);
//                   setFiltersChanged(true);
//                 }}>
//                 <option value="price-asc">Prix croissant</option>
//                 <option value="price-desc">Prix décroissant</option>
//                 <option value="_id-desc">Nouveaux produits</option>
//                 <option value="_id-asc">Les plus anciens</option>
//               </select>
//             </Filter>
//                 </FiltersWrapper>
//             </CategoryHeader>

//           {/* Affichage du spinner pendant le chargement */}  
//         {loadingProducts && (
//           <Spinner fullWidth />
//         )}

//          {/* Affichage des produits ou du message si aucun produit n'est trouvé */}
//         {!loadingProducts && (
//           <div>
//             {products.length > 0 && (
//               <ProductsGrid products={products} />
//             )}
//             {products.length === 0 && (
//               <div>Désolé, aucun produit trouvé</div>
//             )}
//           </div>
//         )}
//         </Center>
//         </>
//     )
// }

export default function CategoryPage({category,parentCat,products:originalProducts})
{


    //valeurs par défaut de certains états
    const defaultSorting = '_id-desc';

let mergedValues=[]
    
    const defaultFilterValues = category.properties.map(p => ({ name: p.name, value: 'all' }));
    if(parentCat?.properties)
    {
      const defaultParentFilterValues = parentCat.properties.map(p => ({ name: p.name, value: 'all' })) ;
      mergedValues = [...defaultFilterValues, ...defaultParentFilterValues].map(p => ({ name: p.name, value: 'all' }));
    }
    else
    {
      mergedValues = defaultFilterValues;
    }
    


console.log(mergedValues);


    // État local pour gérer les produits, les filtres, la charge et le tri
    const [products,setProducts] = useState(originalProducts);
    const [filtersValues,setFiltersValues] = useState(mergedValues);
    const [sort,setSort] = useState(defaultSorting);
    const [loadingProducts,setLoadingProducts] = useState(false);
    const [filtersChanged,setFiltersChanged] = useState(false);

    // Gestionnaire de changement de filtre
    function handleFilterChange(filterName, filterValue) {
        // Met à jour les valeurs des filtres
        setFiltersValues(prev => {
        return prev.map(p => ({
            name:p.name,
            value: p.name === filterName ? filterValue : p.value,
        }));
        });
        setFiltersChanged(true);
    }

    // Effet pour charger les produits en fonction des filtres et du tri
    useEffect(()=>{
        if (!filtersChanged) {
            return;
        }
        setLoadingProducts(true);
        const catIds = [category._id];
        const params = new URLSearchParams;
        params.set('categories', catIds.join(','));
        params.set('sort', sort);
        filtersValues.forEach(f => {
            if (f.value !== 'all') {
            params.set(f.name, f.value);
            }
        });
        const url = `/api/products?` + params.toString();
        axios.get(url).then(res => {
            setProducts(res.data);
            setLoadingProducts(false);
        })

    },[filtersValues, sort, filtersChanged])

    // Rendu de la page individuelle pour chaque produit avec les produits et les filtres
    return(
        <>
        <Header />
        <Center>
            <CategoryHeader>
                 {/* ... (affichage du titre de la catégorie) */}
                <h1>{category.name}</h1>
                <FiltersWrapper>
                    {/* ... (affichage des filtres pour la catégorie) */}
                    {category.properties.map(prop =>(
                        <Filter key={prop.name}>
                            {prop.name}
                            <select
                             onChange={ev => handleFilterChange(prop.name, ev.target.value)}
                             value={filtersValues.find(f => f.name === prop.name).value}>
                                <option value="all">Tout</option>
                                {prop.values.map(val =>(
                                    <option key={val} value={val}>{val}</option>  
                                ))}
                            </select>
                        </Filter>
                    ))}
                     {/* ... (affichage des filtres de la catégorie parente si elle existe) */}
                    {parentCat?.properties?.map(prop =>(
                        <Filter key={prop.name}>
                            {prop.name}
                            <select
                             onChange={ev => handleFilterChange(prop.name, ev.target.value)}
                             value={filtersValues.find(f => f.name === prop.name).value}>
                                <option value="all">Tout</option>
                                {prop.values.map(val =>(
                                    <option key={val} value={val}>{val}</option>  
                                ))}
                            </select>
                        </Filter>
                    ))}
                     <Filter>
              <span>Trier:</span>
              <select
                value={sort}
                onChange={ev => {
                  setSort(ev.target.value);
                  setFiltersChanged(true);
                }}>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="_id-desc">Nouveaux produits</option>
                <option value="_id-asc">Les plus anciens</option>
              </select>
            </Filter>
                </FiltersWrapper>
            </CategoryHeader>

          {/* Affichage du spinner pendant le chargement */}  
        {loadingProducts && (
          <Spinner fullWidth />
        )}

         {/* Affichage des produits ou du message si aucun produit n'est trouvé */}
        {!loadingProducts && (
          <div>
            {products.length > 0 && (
              <ProductsGrid products={products} />
            )}
            {products.length === 0 && (
              <div>Désolé, aucun produit trouvé</div>
            )}
          </div>
        )}
        </Center>
        </>
    )
}


// // Récupère les données côté serveur pour la page de la catégorie
// export async function getServerSideProps(context) {
//     // Récupère la catégorie, ses sous-catégories et les produits associés
//     const category = await Category.findById(context.query.id);
//     const subCategories = await Category.find({parent:category._id});
//     const catIds = [category._id, ...subCategories.map(c => c._id)];
//     const products = await Product.find({category:catIds});
//     return {
//       props:{
//         category: JSON.parse(JSON.stringify(category)),
//         subCategories: JSON.parse(JSON.stringify(subCategories)),
//         products: JSON.parse(JSON.stringify(products)),
//       }
//     };
//   }
// Récupère les données côté serveur pour la page de la catégorie
export async function getServerSideProps(context) {
    // Récupère la catégorie, sa catégorie parente si elle existe et les produits associés
    const category = await Category.findById(context.query.id);
    
    const parentCategorie = await Category.findById(category.parent)

    const catIds = [category._id];
    const products = await Product.find({category:catIds});
    console.log( JSON.parse(JSON.stringify(parentCategorie)))
    return {
      props:{
        category: JSON.parse(JSON.stringify(category)),
        parentCat: JSON.parse(JSON.stringify(parentCategorie)),
        products: JSON.parse(JSON.stringify(products)),
      }
    };
  }