import CustomImage from '@/components/image'
import { fetchProductById } from '@/features/productSlice';
import { ProductType } from '@/interfaces';
import { AppDispatch, RootState } from '@/store';
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function ProductDetail() {
	const router = useRouter();
	const { id } = router.query;
	const dispatch = useDispatch<AppDispatch>();
	const { selectedProduct, loading, error } = useSelector((state: RootState) => state.product);

	useEffect(() => {
		if (id) {
			dispatch(fetchProductById(Number(id)));
		}
	}, [dispatch, id]);

	// Agar selectedProduct null bo'lsa
	if (!selectedProduct) {
		return <p>Product not found</p>;
	}
	const handleAddToCart = () => {
        const cartItems = JSON.parse(localStorage.getItem('carts') || '[]');
        const existingProduct = cartItems.find((product: ProductType) => product.id === selectedProduct.id);

        if (existingProduct) {
            existingProduct.quantity += 1; // Increase quantity if already in cart
        } else {
            cartItems.push({ ...selectedProduct, quantity: 1 }); // Add new product
        }

        localStorage.setItem('carts', JSON.stringify(cartItems));
		toast('Product added to your bag!!');
    };


	return (
		<div className='max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 px-4 mt-24 pb-10'>
			<CustomImage product={selectedProduct} />

			<div className='divide-2'>
				<div className='space-y-2 pb-8'>
					<h1 className='text-2xl md:text-4xl font-bold'>
						{selectedProduct.title}
					</h1>
					<h2 className='text-gray-500 font-bold text-xl md:text-3xl'>
						${selectedProduct.price}
					</h2>
				</div>

				<div>
					<p className='text-xs md:text-sm'>
						{selectedProduct.description}
					</p>
				</div>

				<div>
					<button onClick={handleAddToCart} className='button mt-8 ml-3 active:bg-blue-500 bg-blue-700 text-white '>Add Cart</button>
				</div>
			</div>
		</div>
	)
}
