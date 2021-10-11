import React, { FC, useMemo, useState } from 'react';
import shortid from 'shortid';

import Modal from '../../../UI/Modal/Modal';
import style from './ProductComments.module.css';
import { useDispatchAcions } from '../../../hooks/useDispatchAction';
import getDate from '../../../helpers/date';

const ProductComments: FC<any> = ({ product }) => {
  const [modal, setModal] = useState<boolean>(false);
  const openModal = (): void => setModal(true);
  const closeModal = (): void => setModal(false);
  const memoComments = useMemo(() => [...product.comments], []);

  const [comment, setComment] = useState<string>('');
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };
  const { editProduct } = useDispatchAcions();
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.trim().length < 30) {
      alert(`Min comment's length 30 symbol`);
      return;
    }
    const commentsToAdd = {
      id: shortid.generate(),
      productId: product.id,
      description: comment.trim(),
      date: getDate(),
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
    const commentsToAdd = product.comments.filter((el: any) => el.id !== id);
    const productToAdd = {
      ...product,
      comments: [...commentsToAdd],
    };
    editProduct(product.id, productToAdd);
  };
  return (
    <article>
      <h2 className={style.comments_title}>Comments:</h2>
      {memoComments.length > 0 && (
        <ul className={style.comments_list}>
          {memoComments.map((el: any) => (
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
      )}
      <button type="button" className={style.comments_btn} onClick={openModal}>
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
            <button type="submit" className={style.comments_btn}>
              Add Comments
            </button>
          </form>
        </Modal>
      )}
    </article>
  );
};

export default ProductComments;
