import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import ProductItem from '../../components/ProductItem/ProductItem';
import { useDispatchAcions } from '../../hooks/useDispatchAction';
import { useTypedSelector } from '../../hooks/useTypedSelector';

interface IProductPageParams {
  productId: string;
}

const ProductPage = () => {
  const params = useParams<IProductPageParams>();
  const { fetchOneProduct } = useDispatchAcions();
  const { product }: any = useTypedSelector(state => state.products);

  useEffect(() => {
    const { productId } = params;
    fetchOneProduct(productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {Object.keys(product).length > 0 && <ProductItem product={product} />}
    </div>
  );
};

export default ProductPage;
