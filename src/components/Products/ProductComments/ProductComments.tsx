import React, { FC, useState } from 'react';
import shortid from 'shortid';

import Modal from '../../../UI/Modal/Modal';
import style from './ProductComments.module.css';
import { useDispatchAcions } from '../../../hooks/useDispatchAction';
import getDate from '../../../helpers/date';
import { IProduct } from '../../../redux/products/productsType';

const ProductComments: FC<IProduct | any> = ({ product }) => {
  const [modal, setModal] = useState<boolean>(false);
  const openModal = (): void => setModal(true);
  const closeModal = (): void => setModal(false);

  const [comment, setComment] = useState<string>('');
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const { editProduct } = useDispatchAcions();
  const getMemoId = React.useCallback<any>(() => {
    return shortid.generate();
  }, []);
  const getMemoDate = React.useCallback<any>(() => {
    return getDate();
  }, []);

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (comment.trim().length < 30) {
      alert(`Min comment's length 30 symbol`);
      return;
    }
    const commentsToAdd = {
      id: getMemoId(),
      productId: product.id,
      description: comment.trim(),
      date: getMemoDate(),
    };
    const productToAdd = {
      ...product,
      comments: [...product.comments, commentsToAdd],
    };
    editProduct(product.id, productToAdd);

    setComment('');
    closeModal();
  };

  /*Delete Comment*/
  const onDelete = (id: string) => {
    const commentsToAdd = product.comments.filter(
      (el: IProduct) => el.id !== id,
    );
    const productToAdd = {
      ...product,
      comments: [...commentsToAdd],
    };
    editProduct(product.id, productToAdd);
  };
  return (
    <article>
      <h2 className={style.comments_title}>Comments:</h2>
      {product?.comments?.length > 0 ? (
        <ul className={style.comments_list}>
          {product?.comments?.map((el: any) => (
            <li key={el.id} className={style.comments_list_item}>
              <p className={style.comments}> {el.description}</p>
              <button
                type="button"
                className={style.delete_btn}
                onClick={() => onDelete(el.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <h4 className={style.no_comments}>No comments</h4>
      )}
      <button
        type="button"
        className={style.add_comments_btn}
        onClick={openModal}
      >
        Add Comments
      </button>
      {modal && (
        <Modal onClose={closeModal} width="400px">
          <form className={style.form} onSubmit={handleSubmit}>
            <textarea
              name="text"
              cols={30}
              rows={10}
              value={comment}
              className={style.area}
              onChange={onChange}
            />
            <div className={style.btn_box}>
              <button type="submit" className={style.add_btn}>
                Add Comments
              </button>
              <button
                type="button"
                className={style.cancel_btn}
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}
    </article>
  );
};

export default ProductComments;
