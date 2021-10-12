import React, { useState, FC } from 'react';
import shortid from 'shortid';
import { useDispatchAcions } from '../../../hooks/useDispatchAction';
import style from './ProductEditor.module.css';
import { IProduct } from '../../../redux/products/productsType';

interface IState {
  id: string;
  name: string;
  count: number;
  weight: number;
  width: number;
  height: number;
  comments: [];
  img: any;
}

interface IPostEditorProp {
  onClose: () => void;
  product?: any;
}

const ProductEditor: FC<IPostEditorProp> = ({ onClose, product }) => {
  const [state, setState] = useState<IState>({
    id: product?.id || shortid.generate(),
    name: product?.name || '',
    count: product?.count || 0,
    weight: product?.weight || 0,
    width: product?.size?.width || 0,
    height: product?.size?.height || 0,
    comments: product?.comments || [],
    img: '',
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
    const { id, name, count, weight, width, height, comments, img } = state;
    if (!name.trim() || !count || !weight || !width || !height) {
      alert('Please fill in all fields');
      return;
    } else if (count <= 0 || weight <= 0 || width <= 0 || height <= 0) {
      alert(`count,weight,width,height can't be less than zero`);
      return;
    }
    const productToAdd: IProduct = {
      id: id,
      imageUrl: img,
      name: name.trim(),
      count,
      weight,
      size: {
        width,
        height,
      },
      comments: comments,
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
      count: 0,
      weight: 0,
      width: 0,
      height: 0,
    }));
  };

  return (
    <div className={style.editor_box}>
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
            name="img"
            onChange={handleChangeImg}
            placeholder="Enter name"
            className={style.input_file}
          />
        </label>
        <button type="submit" className={style.button}>
          {!product ? 'Add product' : 'Edit'}
        </button>
      </form>
    </div>
  );
};

export default ProductEditor;
