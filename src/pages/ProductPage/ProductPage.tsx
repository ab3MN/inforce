import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router';
import ProductComments from '../../components/Products/ProductComments/ProductComments';
import ProductItem from '../../components/Products/ProductItem/ProductItem';
import { useDispatchAcions } from '../../hooks/useDispatchAction';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import style from './ProductPage.module.css';

interface IProductPageParams {
  productId: string;
}

const ProductPage: FC = () => {
  const params = useParams<IProductPageParams>();
  const { fetchOneProduct } = useDispatchAcions();
  const { product }: any = useTypedSelector(state => state.products);
  const { comments } = product;

  useEffect(() => {
    const { productId } = params;
    fetchOneProduct(productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={style.product_container}>
      {Object.keys(product).length > 0 && <ProductItem product={product} />}
      {comments?.length > 0 && <ProductComments product={product} />}
    </section>
  );
};

export default ProductPage;
