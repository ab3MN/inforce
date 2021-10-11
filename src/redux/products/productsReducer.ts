import { combineReducers } from 'redux';
import {
  IDeleteProductError,
  IProduct,
  IAddProductSuccess,
  IAddProductError,
  IFetchProductsSuccess,
  PRODUCTS_TYPES,
  IFetchProductsError,
  IDeleteProductSuccess,
  IFetchOneProductSuccess,
  IFetchOneProductError,
} from './productsType';

const productsReducer = (
  state: IProduct[] = [],
  {
    type,
    payload,
  }: IFetchProductsSuccess | IDeleteProductSuccess | IAddProductSuccess | any,
) => {
  switch (type) {
    case PRODUCTS_TYPES.FETCH_PRODUCTS_SUCCESS:
      return payload.products;

    case PRODUCTS_TYPES.DELETE_PRODUCT_SUCCESS:
      return state.filter(el => el.id !== payload.id);

    case PRODUCTS_TYPES.ADD_PRODUCTS_SUCCESS:
      return [...state, payload.product];
    default:
      return state;
  }
};

const errorReducer = (
  state = '',
  {
    type,
    payload,
  }:
    | IFetchProductsError
    | IDeleteProductError
    | IAddProductError
    | IFetchOneProductError,
) => {
  switch (type) {
    case PRODUCTS_TYPES.FETCH_PRODUCTS_ERROR:
    case PRODUCTS_TYPES.DELETE_PRODUCT_ERROR:
    case PRODUCTS_TYPES.ADD_PRODUCTS_ERROR:
    case PRODUCTS_TYPES.FETCH_ONE_PRODUCT_ERROR:
      return payload.error;
    default:
      return state;
  }
};
const productReducer = (
  state = {},
  { type, payload }: IFetchOneProductSuccess,
) => {
  switch (type) {
    case PRODUCTS_TYPES.FETCH_ONE_PRODUCT_SUCCESS:
      return payload.product || state;
    default:
      return state;
  }
};

export default combineReducers({
  products: productsReducer,
  error: errorReducer,
  product: productReducer,
});
