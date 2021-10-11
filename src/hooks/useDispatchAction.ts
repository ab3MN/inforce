import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as po from '../redux/products/productsOperations';

const Actions = { ...po };

export const useDispatchAcions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(Actions, dispatch);
};
