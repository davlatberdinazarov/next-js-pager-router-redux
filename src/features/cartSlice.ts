import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductType } from '@/interfaces';

interface CartState {
    products: ProductType[];
}

const initialState: CartState = {
    products: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<ProductType[]>) {
            state.products = action.payload;
        },
        addProduct(state, action: PayloadAction<ProductType>) {
            const product = action.payload;
            const existingProduct = state.products.find(p => p.id === product.id);

            if (existingProduct) {
                existingProduct.quantity += product.quantity;
            } else {
                state.products.push(product);
            }

            localStorage.setItem('carts', JSON.stringify(state.products));
        },
        removeProduct(state, action: PayloadAction<number>) {
            state.products = state.products.filter(product => product.id !== action.payload);
            localStorage.setItem('carts', JSON.stringify(state.products));
        },
        incrementQuantity(state, action: PayloadAction<number>) {
            const product = state.products.find(p => p.id === action.payload);
            if (product) {
                product.quantity += 1;
                localStorage.setItem('carts', JSON.stringify(state.products));
            }
        },
        decrementQuantity(state, action: PayloadAction<number>) {
            const product = state.products.find(p => p.id === action.payload);
            if (product) {
                if (product.quantity === 1) {
                    state.products = state.products.filter(p => p.id !== action.payload);
                } else {
                    product.quantity -= 1;
                }
                localStorage.setItem('carts', JSON.stringify(state.products));
            }
        },
    },
});

export const { addProduct, removeProduct, incrementQuantity, decrementQuantity, setProducts } = cartSlice.actions;
export default cartSlice.reducer;
