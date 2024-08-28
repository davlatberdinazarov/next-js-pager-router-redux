import Cta from '@/components/cta';
import Hero from '@/components/hero';
import Product from '@/components/product';
import Statistics from '@/components/statistics';
import { fetchProducts } from '@/features/productSlice';
import { AppDispatch, RootState } from '@/store';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch]);

  if (loading) return <p>Loading...</p>

  if (error) return <p>Error: {error}</p>

  return (
    <main className='min-h-screen max-w-7xl mx-auto px-8 xl:px-0 '>
    <Hero />
    <section className='flex flex-col space-y-12'>
      <h1 className='text-5xl font-bold text-center'>
        DAVI SHOP DEALS
      </h1>
      <div className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
        {products.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </section>
    <Cta />
    <Statistics />
  </main>
  )
}
