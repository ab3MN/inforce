import { lazy } from 'react';

const ProductsPage: React.LazyExoticComponent<React.FC<{}>> = lazy(
  () => import('../pages/ProductsPage/ProductsPage'),
  /* webpackChunkName: "products-page" */
);

const ProductPage: React.LazyExoticComponent<React.FC<{}>> = lazy(
  () => import('../pages/ProductPage/ProductPage'),
  /* webpackChunkName: "product-page" */
);

const routes = {
  PRODUCTS_PAGE: {
    path: '/',
    component: ProductsPage,
  },
  PRODUCT_PAGE: {
    path: '/:productId',
    component: ProductPage,
  },
};

export default routes;
