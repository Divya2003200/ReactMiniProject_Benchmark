
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProductById, Product } from '../Api/Prductapi';
import { Box, Image, Text } from '@chakra-ui/react';
import { useProductStore } from '../stores/Productstore';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return <Text>No product ID provided</Text>;

 
  const globalProduct = useProductStore((state) =>
    state.products.find((p) => p.id === Number(id))
  );

 
  const { data: fetchedProduct, isLoading, isError } = useQuery<Product, Error>({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(Number(id)),
    enabled: !globalProduct,  
  });

  const product = globalProduct || fetchedProduct;

  if (isLoading) return <Text>Loading...</Text>;
  if (isError || !product) return <Text>Product not found</Text>;

   
  const imageUrl =
    product.thumbnail || (product.images && product.images.length > 0 ? product.images[0] : '');

  return (
    <Box p={5}>
      {imageUrl && <Image src={imageUrl} alt={product.title} />}
      <Text fontSize="2xl" fontWeight="bold" mt={2}>
        {product.title}
      </Text>
      <Text mt={2}>{product.description}</Text>
      <Text fontWeight="bold" mt={2}>
        ${product.price}
      </Text>
      <Text mt={2}>Category: {product.category}</Text>
    </Box>
  );
};

export default ProductDetail;
