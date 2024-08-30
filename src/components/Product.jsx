
// import { useMutation, useQuery } from '@tanstack/react-query'
// import axios from 'axios'

// import { useParams } from 'react-router-dom'

// // first time
// // const fetchProduct = async()=> {
// //   const response = await fetch(https://dummyjson.com/products/${productid})
// //   const data = await response.json()
// //   return data
// // }

// //2nd time

// const Product = () => {
//   const params = useParams()
  
//   const mutation =  useMutation({
//     mutationFn: (newProduct) => {
//       // return axios.put(/products/${params.productid}, newProduct)   //new product wo hai jisme apne prouct ka data as a object dalna hai 
//         return axios.put(/products/1, newProduct)   //new product wo hai jisme apne prouct ka data as a object dalna hai 

//     }
//   })
//   const fetchProduct = async()=> {
//     // const response = await fetch(https://dummyjson.com/products/${params.productid})
//     const response = await fetch(https://dummyjson.com/products/1)

//     const data = await response.json()
//     return data
//   }
//   const {isLoading,error,data: product} = useQuery({queryKey:['product', params.product.id], queryFn:fetchProduct})


//   if(isLoading){
//     return <h3>Loading...</h3>
//   }
//   if(error){
//     return <h3>Error... : {error}</h3>
//   }


//   return (
//     <>
//     <div>Product....: {product.title}</div>
//     <button onClick={() => {
//       mutation.mutate({title: 'updated product'})  // mtlv this object are relted to (new product)
//     }}>create product</button>
//     </>
//   )
// }

// export default Product






///////////////////////////////////////////////////////////////////////
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// Define the fetch function to get product details
const fetchProduct = async (productId) => {
  const response = await fetch(`https://dummyjson.com/products/${productId}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

const Product = () => {
  const { id } = useParams(); // Correctly destructure `id` from `params`

  // Mutation for updating the product
  const mutation = useMutation({
    mutationFn: (newProduct) => {
      return axios.put(`https://dummyjson.com/products/${id}`, newProduct); // Use dynamic `id`
    }
  });

  // Query to fetch product details
  const { isLoading, error, data: product } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
    enabled: !!id, // Ensure query only runs if `id` exists
  });

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <h3>Error: {error.message}</h3>;
  }

  return (
    <>
      <div>Product Title: {product.title}</div>
      <button
        onClick={() => {
          mutation.mutate({ title: 'updated product' }); // Pass the new product data
        }}
      >
        Update Product
      </button>
      {mutation.isLoading && <p>Updating...</p>}
      {mutation.isError && <p>Error: {mutation.error.message}</p>}
      {mutation.isSuccess && <p>Product updated!</p>}
    </>
  );
};

export default Product;
