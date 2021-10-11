import React, { useState, FC } from 'react';
import shortid from 'shortid';
import { useDispatchAcions } from '../../../hooks/useDispatchAction';
import style from './ProductEditor.module.css';

interface IState {
  id: string;
  name: string;
  count: number;
  weight: number;
  width: number;
  height: number;
}

interface IPostEditorProp {
  onClose: () => void;
}

const ProductEditor: FC<IPostEditorProp> = ({ onClose }) => {
  const [state, setState] = useState<IState>({
    id: '',
    name: '',
    count: 0,
    weight: 0,
    width: 0,
    height: 0,
  });
  const { addproducts } = useDispatchAcions();

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
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { name, count, weight, width, height } = state;
    if (!name.trim() || !count || !weight || !width || !height) {
      alert('Please fill in all fields');
      return;
    } else if (count <= 0 || weight <= 0 || width <= 0 || height <= 0) {
      alert(`count,weight,width,height can't be less than zero`);
      return;
    }
    const product = {
      id: shortid.generate(),
      imageUrl:
        'https://image-skincare.ru/wa-data/public/shop/products/64/03/364/images/844/844.200@2x.jpg',
      name: name.trim(),
      count: count,
      weight: weight,
      size: {
        width: width,
        height: height,
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
        <button type="submit" className={style.button}>
          Add product
        </button>
      </form>
    </div>
  );
};

export default ProductEditor;
