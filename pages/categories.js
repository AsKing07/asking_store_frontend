/* eslint-disable react/jsx-key */
import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductBox from "@/components/ProductBox";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import Link from "next/link";
import styled from "styled-components";
import {RevealWrapper} from "next-reveal";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { WishedProduct } from "@/models/WishedProduct";


const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const CategoryTitle = styled.div`
display: flex;
justify-content: center; 
margin-top: 10px;
margin-bottom: 0;
align-items: center;
gap: 10px;
  
  h2{
    margin-bottom: 10px;
    margin-top: 10px;
  }
  a{
    color:#555;
    display: inline-block;
  }
`;
const SubCategoryTitle = styled.div`
  display:flex;
  margin-top: 10px;
  margin-bottom: 0;
  align-items: center;
  gap: 10px;
  h2{
    margin-bottom: 10px;
    margin-top: 10px;
  }
  a{
    color:#555;
    display: inline-block;
  }
`;
const CategoryWrapper = styled.div`
  margin-bottom: 40px;
`;

const ShowAllSquare = styled(Link)`
  background-color: #ddd;
  height: 160px;
  border-radius: 10px;
  align-items:center;
  display: flex;
  justify-content: center;
  color: #555;
  text-decoration: none;
`;

// export default function CategoriesPage({maincategories,categoriesProducts,subCategories,subCategoriesProducts,wishedProducts=[]})
// {

//     return(
//         <>
//             <Header />
//             <Center>
//              {/* {maincategories.map(cat=>(
//                 <CategoryWrapper  key={cat._id}>
//                     <CategoryTitle>
//                     <h2>{cat.name}</h2>
//                     <div>
//                         <Link href={'/category/'+cat._id}>Voir tout</Link>
//                     </div>
//                     </CategoryTitle>
//                     <CategoryGrid>
//                     {categoriesProducts[cat._id].map((p,index) => (
//                 <RevealWrapper delay={index*50}>
//                   <ProductBox {...p} wished={wishedProducts.includes(p._id)} />
//                 </RevealWrapper>
//               ))}
//               <RevealWrapper delay={categoriesProducts[cat._id].length*50}>
//                 <ShowAllSquare href={'/category/'+cat._id}>
//                   Voir tout &rarr;
//                 </ShowAllSquare>
//               </RevealWrapper>
                       
//                     </CategoryGrid>
                   
//                 </CategoryWrapper>
//              ))} */}
//              {subCategories.map(cat=>(
//               <>
//                 {subCategoriesProducts[cat._id].length > 0 && (

// <CategoryWrapper  key={cat._id}>
// <CategoryTitle>
// <h2>{cat.name}</h2>
// <div>
//     <Link href={'/category/'+cat._id}>Voir tout</Link>
// </div>
// </CategoryTitle>
// <CategoryGrid>

// {subCategoriesProducts[cat._id].map((p,index) => (
// <RevealWrapper delay={index*50}>
// <ProductBox {...p} wished={wishedProducts.includes(p._id)} />
// </RevealWrapper>
// ))}
// <RevealWrapper delay={subCategoriesProducts[cat._id].length*50}>
// <ShowAllSquare href={'/category/'+cat._id}>
// Voir tout &rarr;
// </ShowAllSquare>
// </RevealWrapper>
   
// </CategoryGrid>

// </CategoryWrapper>

//                 )}
//               </>
              
//              ))}

//             </Center>
//         </>
//     )
// }


export default function CategoriesPage({
  mainCategories,
  categoriesProducts,
  subCategories,
  subCategoriesProducts,
  wishedProducts = [],
}) {
  return (
    <>
      {/* En-tête */}
      <Header />
      <Center>
        {mainCategories.map((mainCat) => (
          <CategoryWrapper key={mainCat._id}>
            <CategoryTitle>
              <h2>{mainCat.name}</h2>
             
            </CategoryTitle>
            
           

            {/* Affichage des sous-catégories pour la catégorie parente */}
            {subCategories
              .filter((subCat) => subCat.parent.toString() === mainCat._id.toString())
              .map((subCat) => (
                <>
                      {subCategoriesProducts[subCat._id].length > 0 && (

<CategoryWrapper key={subCat._id}>
<SubCategoryTitle>
  <h2>{subCat.name}</h2>
  <div>
    <Link href={"/category/" + subCat._id}>Voir tout</Link>
  </div>
</SubCategoryTitle>
<CategoryGrid>
  {subCategoriesProducts[subCat._id].map((p, index) => (
    <RevealWrapper delay={index * 50} key={p._id}>
      <ProductBox {...p} wished={wishedProducts.includes(p._id)} />
    </RevealWrapper>
  ))}
  <RevealWrapper delay={subCategoriesProducts[subCat._id].length * 50}>
    <ShowAllSquare href={"/category/" + subCat._id}>
      Voir tout &rarr;
    </ShowAllSquare>
  </RevealWrapper>
</CategoryGrid>
</CategoryWrapper>
                      )}


                      

                    
                </>
           
              ))}

{subCategories
              .filter((subCat) => subCat.parent.toString() === mainCat._id.toString()).length <=0 &&(
                            <CategoryGrid>
                                                 {categoriesProducts[mainCat._id].map((p,index) => (
                                            <RevealWrapper delay={index*50}>
                                              <ProductBox {...p} wished={wishedProducts.includes(p._id)} />
                                            </RevealWrapper>
                                          ))}
                                          <RevealWrapper delay={categoriesProducts[mainCat._id].length*50}>
                                            <ShowAllSquare href={'/category/'+mainCat._id}>
                                              Voir tout &rarr;
                                            </ShowAllSquare>
                                          </RevealWrapper>
                                                   
                                                </CategoryGrid>
                      ) }
          </CategoryWrapper>
        ))}
      </Center>
    </>
  );
}


//fonction pour recupérer toutes les catégories sant parent et les produits de la liste de souhait
export async function getServerSideProps(ctx) {
  await mongooseConnect();
  const categories = await Category.find();
  const mainCategories = categories.filter(c => !c.parent);
  const subCategories = categories.filter(c => c.parent);
  const categoriesProducts = {}; // catId => [products]
  const subCategoriesProducts = {}; // catId => [products]
  const allFetchedProductsId = [];
  
  for (const subCat of subCategories)
  {
    const subCatId= subCat._id.toString();
    subCategoriesProducts[subCat._id] = await Product.find({ category: subCatId }, null, {limit:3,sort:{'_id':-1}});

  }

  for (const mainCat of mainCategories) {
    const mainCatId = mainCat._id.toString();
    const childCatIds = categories
      .filter(c => c?.parent?.toString() === mainCatId)
      .map(c => c._id.toString());
    const categoriesIds = [mainCatId, ...childCatIds];
    const products = await Product.find({category: categoriesIds}, null, {limit:3,sort:{'_id':-1}});
    allFetchedProductsId.push(...products.map(p => p._id.toString()))
    categoriesProducts[mainCat._id] = products;
  }


  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const wishedProducts = session?.user
    ? await WishedProduct.find({
      userEmail:session?.user.email,
      product: allFetchedProductsId,
    })
    : [];

  return {
    props: {
      mainCategories: JSON.parse(
        JSON.stringify(mainCategories)
      ),
      subCategories: JSON.parse(
        JSON.stringify(subCategories)
      ),
      
      categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts)),
      subCategoriesProducts: JSON.parse(JSON.stringify(subCategoriesProducts)),
      wishedProducts: wishedProducts.map(i => i.product.toString()),
    },
  };
}