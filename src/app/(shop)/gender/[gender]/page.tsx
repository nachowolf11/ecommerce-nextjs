export const revalidate = 60;

import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';
import { Category } from '@/interfaces';
import { Gender } from '@prisma/client';
import { redirect } from 'next/navigation';

interface Props {
  params: {
    gender: string;
  },
  searchParams: {
    page?: string
  }
}

export default async function GenderPage({ params, searchParams }: Props) {

  const page = searchParams.page ? parseInt( searchParams.page ) : 1;
  const { gender } = params;
  //@ts-ignore
  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
    gender: gender as Gender
  });

  if ( products.length === 0 ) {
    redirect('/');
  }

  const labels: Record<Category, string>  = {
    'men': 'para hombres',
    'women': 'para mujeres',
    'kid': 'para niños',
    'unisex': 'para todos'
  }

  return (
    <>
      <Title
        title={`Artículos de ${ labels[gender as Gender] }`}
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid 
        products={ products }
      />

      <Pagination totalPages={ totalPages }/>
      
    </>
  );
}