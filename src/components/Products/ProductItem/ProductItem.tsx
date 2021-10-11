import React, { FC, useState } from 'react';
import style from './ProductItem.module.css';

const ProductItem: FC<any> = ({ product }) => {
  const [modal, setModal] = useState<boolean>(false);
  const openModal = (): void => setModal(true);
  // const closeModal = (): void => setModal(false);
  return (
    <article className={style.product}>
      <img src={product.imageUrl} alt={product?.name} className={style.img} />
      <h3 className={style.name}>{product?.name}</h3>
      <div className={style.info}>
        <p className={style.info_item}>
          Count: <span>{product?.count}</span>
        </p>
        <p className={style.info_item}>
          Weight: <span>{product?.weight}g</span>
        </p>
      </div>
      <div className={style.info}>
        <p className={style.info_item}>
          Width: <span>{product?.size?.width}</span>
        </p>
        <p className={style.info_item}>
          Height: <span>{product?.size?.height}</span>
        </p>
      </div>
      <button
        className={style.edit_btn}
        onClick={() => {
          openModal();
        }}
        type="button"
      >
        Edit
      </button>
    </article>
  );
};

export default ProductItem;
