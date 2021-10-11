import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ProductComments from '../../components/Products/ProductComments/ProductComments';
import ProductItem from '../../components/Products/ProductItem/ProductItem';
import { useDispatchAcions } from '../../hooks/useDispatchAction';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import style from './ProductPage.module.css';
import { IProduct } from '../../redux/products/productsType';
import Modal from '../../UI/Modal/Modal';
import ProductEditor from '../../components/Products/ProductEditor/ProductEditor';

interface IProductPageParams {
  productId: string;
}

const ProductPage: FC = () => {
  const params = useParams<IProductPageParams>();
  const { fetchOneProduct } = useDispatchAcions();
  const { product }: IProduct | any = useTypedSelector(state => state.products);
  const { comments } = product;

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    const { productId } = params;
    fetchOneProduct(productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={style.product_container}>
      {Object.keys(product).length > 0 && (
        <ProductItem product={product} openModal={openModal} />
      )}
      {comments?.length > 0 && <ProductComments product={product} />}
      {isModalOpen && (
        <Modal onClose={closeModal} width="400px">
          <ProductEditor onClose={closeModal} product={product} />
        </Modal>
      )}
    </section>
  );
};

export default ProductPage;
