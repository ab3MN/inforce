import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../../Routes/Routes';

import { IProducts } from '../../../redux/products/productsType';
import Modal from '../../../UI/Modal/Modal';
import style from './ProductsList.module.css';
import { useDispatchAcions } from '../../../hooks/useDispatchAction';

const ProductsList: FC<IProducts> = ({ products }) => {
  const [modal, setModal] = useState<boolean>(false);
  const [productId, setProductId] = useState<string>('');
  const { deleteProducts } = useDispatchAcions();

  const openModal = (): void => setModal(true);
  const closeModal = (): void => setModal(false);
  const getProductId = (id: string): void => setProductId(id);

  return (
    <div>
      <ul className={style.list}>
        {products.map(el => (
          <li key={el.id} className={style.list_item}>
            <img src={el.imageUrl} alt={el.name} className={style.list_img} />
            <Link to={`${routes.PRODUCTS_PAGE.path}${el.id}`}>
              <h3 className={style.item_name}>{el.name}</h3>
            </Link>

            <div className={style.item_info}>
              <p>
                Count: <span>{el.count}</span>
              </p>
              <p>
                Weight: <span>{el.weight} g</span>
              </p>
            </div>
            <button
              className={style.item_btn_delete}
              onClick={() => {
                getProductId(el.id);
                openModal();
              }}
              type="button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {modal && (
        <Modal onClose={() => closeModal()} width="300px">
          <div className={style.delete_box}>
            <h3 className={style.delete_box_title}>Are you Sure?</h3>
            <div className={style.delete_btn_box}>
              <button
                type="button"
                className={style.delete_box_yes}
                onClick={() => {
                  deleteProducts(productId);
                }}
              >
                Yes
              </button>
              <button
                onClick={closeModal}
                type="button"
                className={style.delete_box_cancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProductsList;
