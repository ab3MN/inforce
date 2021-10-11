import { combineReducers } from 'redux';
import { IEditProductError, IEditProductSuccess } from './productsType';
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
  }:
    | IFetchProductsSuccess
    | IDeleteProductSuccess
    | IAddProductSuccess
    | IEditProductSuccess
    | any,
) => {
  switch (type) {
    case PRODUCTS_TYPES.FETCH_PRODUCTS_SUCCESS:
      return payload.products || state;

    case PRODUCTS_TYPES.DELETE_PRODUCT_SUCCESS:
      return state?.filter(el => el.id !== payload.id) || state;

    case PRODUCTS_TYPES.ADD_PRODUCTS_SUCCESS:
      return [...state, payload.product] || state;

    case PRODUCTS_TYPES.EDIT_PRODUCT_SUCCESS:
      return (
        state?.map(el =>
          el.id === payload.product.id
            ? Object.assign({}, el, payload.product)
            : el,
        ) || state
      );
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
    | IFetchOneProductError
    | IEditProductError,
) => {
  switch (type) {
    case PRODUCTS_TYPES.FETCH_PRODUCTS_ERROR:
    case PRODUCTS_TYPES.DELETE_PRODUCT_ERROR:
    case PRODUCTS_TYPES.ADD_PRODUCTS_ERROR:
    case PRODUCTS_TYPES.FETCH_ONE_PRODUCT_ERROR:
    case PRODUCTS_TYPES.EDIT_PRODUCT_ERROR:
      return payload.error || state;
    default:
      return state;
  }
};
const productReducer = (
  state = {},
  { type, payload }: IFetchOneProductSuccess | IEditProductSuccess,
) => {
  switch (type) {
    case PRODUCTS_TYPES.FETCH_ONE_PRODUCT_SUCCESS:
      return payload.product || state;

    case PRODUCTS_TYPES.EDIT_PRODUCT_SUCCESS:
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
