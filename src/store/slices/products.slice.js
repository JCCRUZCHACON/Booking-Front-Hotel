import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const productsSlice = createSlice({
	name: 'products',
	initialState: null,
	reducers: {
		setProducts: (state, action) => action.payload,
	},
});

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;

//Middleware
export const getHotelsThunk = (url) => (dispatch) => {
	axios
		.get(url)
		.then((res) => dispatch(setProducts(res.data)))
		.catch((err) => console.error(err));
};
