import axios from 'axios';
import { Dispatch } from 'react';
import {
  AddProductActions,
  DeleteProductsActions,
  FetchProductsActions,
  FetchOneProductActions,
  PRODUCTS_TYPES,
  EditProductActions,
} from './productsType';

axios.defaults.baseURL = 'http://localhost:4040';

/*Edit product*/
export const editProduct = (id: string, product: any) => {
  return async (d: Dispatch<EditProductActions>) => {
    try {
      d({
        type: PRODUCTS_TYPES.EDIT_PRODUCT_START,
      });
      const res = await axios.put(`/products/${id}`, product);
      d({
        type: PRODUCTS_TYPES.EDIT_PRODUCT_SUCCESS,
        payload: { product: res.data },
      });
    } catch {
      d({
        type: PRODUCTS_TYPES.EDIT_PRODUCT_ERROR,
        payload: { error: 'Edit product with some error' },
      });
    }
  };
};

/*fetch One product*/
export const fetchOneProduct = (id: string) => {
  return async (d: Dispatch<FetchOneProductActions>) => {
    try {
      d({
        type: PRODUCTS_TYPES.FETCH_ONE_PRODUCT_START,
      });
      const res = await axios.get(`/products/${id}`);
      d({
        type: PRODUCTS_TYPES.FETCH_ONE_PRODUCT_SUCCESS,
        payload: {
          product: res.data,
        },
      });
    } catch {
      d({
        type: PRODUCTS_TYPES.FETCH_ONE_PRODUCT_ERROR,
        payload: { error: 'Fetch product with some error' },
      });
    }
  };
};

/*add products*/
export const addproducts = (product: any) => {
  return async (d: Dispatch<AddProductActions>) => {
    try {
      d({
        type: PRODUCTS_TYPES.ADD_PRODUCTS_START,
      });
      const res = await axios.post('/products', product);
      d({
        type: PRODUCTS_TYPES.ADD_PRODUCTS_SUCCESS,
        payload: { product: res.data },
      });
    } catch {
      d({
        type: PRODUCTS_TYPES.ADD_PRODUCTS_ERROR,
        payload: {
          error: 'Add product with some error',
        },
      });
    }
  };
};

/*delete products*/
export const deleteProducts = (id: string) => {
  return async (d: Dispatch<DeleteProductsActions>) => {
    try {
      d({
        type: PRODUCTS_TYPES.DELETE_PRODUCT_START,
      });
      await axios.delete(`/products/${id}`);
      d({
        type: PRODUCTS_TYPES.DELETE_PRODUCT_SUCCESS,
        payload: { id },
      });
    } catch {
      d({
        type: PRODUCTS_TYPES.DELETE_PRODUCT_ERROR,
        payload: { error: 'Delete product with some error' },
      });
    }
  };
};

/*fetch products*/
export const fetchProducts = () => {
  return async (d: Dispatch<FetchProductsActions>) => {
    try {
      d({
        type: PRODUCTS_TYPES.FETCH_PRODUCTS_START,
      });
      const res = await axios.get('/products');
      d({
        type: PRODUCTS_TYPES.FETCH_PRODUCTS_SUCCESS,
        payload: { products: res.data },
      });
    } catch {
      d({
        type: PRODUCTS_TYPES.FETCH_PRODUCTS_ERROR,
        payload: { error: 'Fetch products with some error' },
      });
    }
  };
};
