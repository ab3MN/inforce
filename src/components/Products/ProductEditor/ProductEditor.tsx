import React, { useState, FC } from 'react';
import shortid from 'shortid';
import { useDispatchAcions } from '../../../hooks/useDispatchAction';
import style from './ProductEditor.module.css';

interface IState {
  id: string;
  name: string;
  count: number | string;
  weight: number | string;
  width: number | string;
  height: number | string;
}

interface IPostEditorProp {
  onClose: () => void;
}

const ProductEditor: FC<IPostEditorProp> = ({ onClose }) => {
  const [state, setState] = useState<IState>({
    id: '',
    name: '',
    count: '',
    weight: '',
    width: '',
    height: '',
  });
  const { addproducts } = useDispatchAcions();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setState(s => ({
      ...s,
      [name]: value,
    }));
  };
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { name, count, weight, width, height } = state;
    if (!name || !count || !weight || !width || !height) {
      alert('Please fill in all fields');
      return;
    } else if (+count <= 0 || +weight <= 0 || +width <= 0 || +height <= 0) {
      alert(`count,weight,width,height can't be <= 0`);
      return;
    }
    const product = {
      id: shortid.generate(),
      imageUrl:
        'https://image-skincare.ru/wa-data/public/shop/products/64/03/364/images/844/844.200@2x.jpg',
      name,
      count: +count,
      weight: +weight,
      size: {
        width: +width,
        height: +height,
      },
      comments: [],
    };
    addproducts(product);
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
    <div className={style.editor_box}>
      <form onSubmit={handleSubmit} className={style.form}>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          className={style.input}
          placeholder="Enter name"
        />
        <input
          type="text"
          name="count"
          value={state.count}
          onChange={handleChange}
          className={style.input}
          placeholder="Enter count"
        />
        <input
          type="text"
          name="weight"
          value={state.weight}
          onChange={handleChange}
          className={style.input}
          placeholder="Enter weight"
        />
        <input
          type="text"
          name="width"
          value={state.width}
          onChange={handleChange}
          className={style.input}
          placeholder="Enter width"
        />
        <input
          type="text"
          name="height"
          value={state.height}
          onChange={handleChange}
          className={style.input}
          placeholder="Enter height"
        />
        <button type="submit" className={style.button}>
          Add product
        </button>
      </form>
    </div>
  );
};

export default ProductEditor;
