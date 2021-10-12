import React, { useState, FC } from 'react';
import shortid from 'shortid';
import { useDispatchAcions } from '../../../hooks/useDispatchAction';
import style from './ProductEditor.module.css';
import { IProduct } from '../../../redux/products/productsType';

interface IState {
  id: string;
  name: string;
  count: string;
  weight: string;
  width: string;
  height: string;
  comments: [];
  imageUrl: string;
}

interface IPostEditorProp {
  onClose: () => void;
  product?: any;
}

const ProductEditor: FC<IPostEditorProp> = ({ onClose, product }) => {
  const getId = React.useCallback<any>(() => {
    return shortid.generate();
  }, []);

  const [state, setState] = useState<IState>({
    id: product?.id || getId(),
    name: product?.name || '',
    count: product?.count || '',
    weight: product?.weight || '',
    width: product?.size?.width || '',
    height: product?.size?.height || '',
    comments: product?.comments || [],
    imageUrl: '',
  });
  const { addproducts, editProduct } = useDispatchAcions();

  const handleChangeString = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setState(s => ({
      ...s,
      [name]: value,
    }));
  };

  const handleChangeNuber = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const re = /^[0-9\b]+$/;
    const { name, value } = e.target;
    if (value === '' || re.test(value))
      setState(s => ({
        ...s,
        [name]: value,
      }));
  };
  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { files, name } = e.target;
    if (files && files[0]) {
      let img = files[0];
      setState(s => ({
        ...s,
        [name]: URL.createObjectURL(img),
      }));
    }
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { id, name, count, weight, width, height, comments, imageUrl } =
      state;
    if (!name.trim() || !count || !weight || !width || !height) {
      alert('Please fill in all fields');
      return;
    } else if (+count <= 0 || +weight <= 0 || +width <= 0 || +height <= 0) {
      alert(`count,weight,width,height can't be less than zero`);
      return;
    }
    const productToAdd: IProduct = {
      id,
      imageUrl,
      name: name.trim(),
      count: +count,
      weight: +weight,
      size: {
        width: +width,
        height: +width,
      },
      comments,
    };
    if (!product) {
      addproducts(productToAdd);
    } else {
      editProduct(id, productToAdd);
    }

    onClose();
    reset();
  };

  const reset = (): void => {
    setState(s => ({
      ...s,
      name: '',
      count: '',
      weight: '',
      width: '',
      height: '',
    }));
  };

  return (
    <section className={style.editor_container}>
      <form onSubmit={handleSubmit} className={style.form}>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChangeString}
          className={style.input}
          placeholder="Enter name"
        />

        <input
          type="text"
          name="count"
          value={state.count}
          onChange={handleChangeNuber}
          className={style.input}
          placeholder="Enter count"
          pattern="[0-9]*"
        />
        <input
          type="text"
          name="weight"
          value={state.weight}
          onChange={handleChangeNuber}
          className={style.input}
          placeholder="Enter weight"
          pattern="[0-9]*"
        />
        <input
          type="text"
          name="width"
          value={state.width}
          onChange={handleChangeNuber}
          className={style.input}
          placeholder="Enter width"
          pattern="[0-9]*"
        />
        <input
          type="text"
          name="height"
          value={state.height}
          onChange={handleChangeNuber}
          className={style.input}
          placeholder="Enter height"
          pattern="[0-9]*"
        />
        <label htmlFor="img" className={style.file}>
          Download Image
          <input
            id="img"
            type="file"
            name="imageUrl"
            onChange={handleChangeImg}
            className={style.input_file}
          />
        </label>
        <div className={style.btn_box}>
          <button type="submit" className={style.submit_btn}>
            {!product ? 'Add product' : 'Edit'}
          </button>
          <button type="button" className={style.cancel_btn} onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};

export default ProductEditor;
