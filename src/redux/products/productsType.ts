export enum PRODUCTS_TYPES {
  FETCH_PRODUCTS_START = 'FETCH_PRODUCTS_START',
  FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS',
  FETCH_PRODUCTS_ERROR = 'FETCH_PRODUCTS_ERROR',

  FETCH_ONE_PRODUCT_START = 'FETCH_ONE_PRODUCT_START',
  FETCH_ONE_PRODUCT_SUCCESS = 'FETCH_ONE_PRODUCT_SUCCESS',
  FETCH_ONE_PRODUCT_ERROR = 'FETCH_ONE_PRODUCT_ERROR',

  EDIT_PRODUCT_START = 'EDIT_PRODUCT_START',
  EDIT_PRODUCT_SUCCESS = 'EDIT_PRODUCT_SUCCESS',
  EDIT_PRODUCT_ERROR = 'EDIT_PRODUCT_ERROR',

  ADD_PRODUCTS_START = 'ADD_PRODUCTS_START',
  ADD_PRODUCTS_SUCCESS = 'ADD_PRODUCTS_SUCCESS',
  ADD_PRODUCTS_ERROR = 'ADD_PRODUCTS_ERROR',

  DELETE_PRODUCT_START = 'DELETE_PRODUCT_START',
  DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS',
  DELETE_PRODUCT_ERROR = 'DELETE_PRODUCT_ERROR',
}

export interface IError {
  error: string;
}
export interface IOneProduct {
  product?: {
    id: string;
    imageUrl: string;
    name: string;
    count: number;
    weight: number;
    size: {
      width: number;
      height: number;
    };
    comments: [];
  };
}
/*Edit Product*/
export interface IEditProductStart {
  type: PRODUCTS_TYPES.EDIT_PRODUCT_START;
}
export interface IEditProductSuccess {
  type: PRODUCTS_TYPES.EDIT_PRODUCT_SUCCESS;
  payload: IOneProduct;
}
export interface IEditProductError {
  type: PRODUCTS_TYPES.EDIT_PRODUCT_ERROR;
  payload: IError;
}
export type EditProductActions =
  | IEditProductStart
  | IEditProductSuccess
  | IEditProductError;

/*Fetch One Product*/

export interface IFetchOneProductStart {
  type: PRODUCTS_TYPES.FETCH_ONE_PRODUCT_START;
}
export interface IFetchOneProductSuccess {
  type: PRODUCTS_TYPES.FETCH_ONE_PRODUCT_SUCCESS;
  payload: IOneProduct;
}
export interface IFetchOneProductError {
  type: PRODUCTS_TYPES.FETCH_ONE_PRODUCT_ERROR;
  payload: IError;
}
export type FetchOneProductActions =
  | IFetchOneProductStart
  | IFetchOneProductSuccess
  | IFetchOneProductError;

/*Add Product*/
export interface IProductToAdd {
  product: {
    id: string;
    imageUrl: string;
    count: number;
    weight: number;
    size?: {
      width: number;
      height: number;
    };
  };
}
export interface IAddProductStart {
  type: PRODUCTS_TYPES.ADD_PRODUCTS_START;
}
export interface IAddProductSuccess {
  type: PRODUCTS_TYPES.ADD_PRODUCTS_SUCCESS;
  payload: IProductToAdd;
}
export interface IAddProductError {
  type: PRODUCTS_TYPES.ADD_PRODUCTS_ERROR;
  payload: IError;
}
export type AddProductActions =
  | IAddProductStart
  | IAddProductSuccess
  | IAddProductError;

/*Delete Product*/
export interface IPoductsID {
  id: string;
}
export interface IDeleteProductStart {
  type: PRODUCTS_TYPES.DELETE_PRODUCT_START;
}
export interface IDeleteProductSuccess {
  type: PRODUCTS_TYPES.DELETE_PRODUCT_SUCCESS;
  payload: IPoductsID;
}
export interface IDeleteProductError {
  type: PRODUCTS_TYPES.DELETE_PRODUCT_ERROR;
  payload: IError;
}
export type DeleteProductsActions =
  | IDeleteProductStart
  | IDeleteProductSuccess
  | IDeleteProductError;

/*fetch Products*/
export interface IProducts {
  products: IProduct[];
}
export interface IProduct {
  id: string;
  imageUrl: string;
  name: string;
  count: number;
  weight: number;
}
export interface IFetchProductsStart {
  type: PRODUCTS_TYPES.FETCH_PRODUCTS_START;
}
export interface IFetchProductsSuccess {
  type: PRODUCTS_TYPES.FETCH_PRODUCTS_SUCCESS;
  payload: IProducts;
}
export interface IFetchProductsError {
  type: PRODUCTS_TYPES.FETCH_PRODUCTS_ERROR;
  payload: IError;
}
export type FetchProductsActions =
  | IFetchProductsStart
  | IFetchProductsSuccess
  | IFetchProductsError;
