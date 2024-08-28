import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    quantity: number;
    rating: { rate: number, count: number }
}

interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
    selectedProduct: Product | null;
}

const initialState: ProductState = {
    products: [],
    loading: false,
    error: null,
    selectedProduct: null,
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    return (await response.json()) as Product[];
})

// new async thunk for fetchProducts detail
export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id: number) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    return (await response.json()) as Product;
});

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch products";
            })
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.selectedProduct = null;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
                state.loading = false;
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch product";
            })
    }
})

export default productSlice.reducer;