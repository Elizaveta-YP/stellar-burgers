import { ProfileOrdersUI } from '@ui-pages';
// import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchProfileOrders, selectProfileOrders } from '../../services/profileOrdersSlice/profileOrdersSlice';


export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
   const dispatch = useDispatch();

  const orders = useSelector(selectProfileOrders);

  useEffect(() => {
    dispatch(fetchProfileOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};