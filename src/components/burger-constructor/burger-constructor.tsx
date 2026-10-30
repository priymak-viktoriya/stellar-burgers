import { BurgerConstructorUI } from '@ui';
import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearConstructor,
  getConstructorBun,
  getConstructorIngredients,
  removeIngredient, 
  moveIngredient,  
} from '../../services/slices/constructorSlice';
import { clearOrder, createOrder } from '../../services/slices/orderSlice';

export const BurgerConstructor = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const bun = useSelector(getConstructorBun);
  const ingredients = useSelector(getConstructorIngredients);
  const user = useSelector((s) => s.user.user);
  const orderRequest = useSelector((s) => s.order.isLoading);
  const orderModalData = useSelector((s) => s.order.order);

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce((sum, item) => sum + item.price, 0),
    [bun, ingredients]
  );

  const onOrderClick = (): void => {
    if (!bun || orderRequest) return;
    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }
    const ids = [bun._id, ...ingredients.map((i) => i._id), bun._id];
    void dispatch(createOrder(ids))
      .unwrap()
      .then(() => dispatch(clearConstructor()))
      .catch(() => undefined);
  };

  const closeOrderModal = (): void => {
    dispatch(clearOrder());
  };

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={{ bun, ingredients }}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
      handleRemoveIngredient={(id: string) => dispatch(removeIngredient(id))} 
      handleMoveIngredient={(from: number, to: number) => dispatch(moveIngredient({ from, to }))}
    />
  );
};