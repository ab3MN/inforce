import React, { FC, memo, useEffect, useMemo, useState } from 'react';
import Select from 'react-select';
import { useDispatchAcions } from '../../hooks/useDispatchAction';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Modal from '../../UI/Modal/Modal';
import ProductEditor from './ProductEditor/ProductEditor';
import ProductsList from './ProductsList/ProductsList';
import style from './Products.module.css';

const options = [
  { value: 'count', label: 'Count' },
  { value: 'weight', label: 'Weight' },
];

const Products: FC = () => {
  /*Fetch products*/
  const { fetchProducts } = useDispatchAcions();
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { products } = useTypedSelector(state => state.products);
  const [selectedType, setSelectedType] = useState<string>('count');
  const changeSelectedTypeHandler = (e: string) => {
    setSelectedType(e);
  };

  const memoPproducts = useMemo(
    () => [
      ...products.sort((a: any, b: any) => a[selectedType] - b[selectedType]),
    ],
    [products, selectedType],
  );
  const MemoProductList = memo(ProductsList);

  /*Open Modal to Add*/
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <main className={style.products}>
      <Select
        options={options}
        defaultValue={options[0]}
        onChange={(e: any) => changeSelectedTypeHandler(e?.value)}
      />
      {memoPproducts.length > 0 && <MemoProductList products={memoPproducts} />}
      {isModalOpen && (
        <Modal onClose={closeModal} width="400px">
          <ProductEditor onClose={closeModal} />
        </Modal>
      )}
      <button type="button" className={style.button} onClick={openModal}>
        Add Product
      </button>
    </main>
  );
};

export default Products;
