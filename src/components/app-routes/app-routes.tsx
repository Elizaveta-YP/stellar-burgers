import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';

import { IngredientDetails, Modal, OrderInfo } from '@components';
import { useDispatch } from '../../services/store';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { FC, useEffect } from 'react';
import { fetchIngredients } from '../../services/ingredientsSlice/ingredientsSlice';
import { fetchUser } from '../../services/userSlice/userSlice';
import { UnauthOnlyRoute } from '../unauth-only-route/unauth-only-route';
import { AuthRoute } from '../auth-route';

export const AppRoutes: FC = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as { background?: Location };
  const background = state?.background;

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchUser());
  }, [dispatch]);

  const handleCloseModal = () => {
    navigate(-1);
  };

  return (
    <>
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />

        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />

        <Route
          path='/login'
          element={
            <UnauthOnlyRoute>
              <Login />
            </UnauthOnlyRoute>
          }
        />
        <Route
          path='/register'
          element={
            <UnauthOnlyRoute>
              <Register />
            </UnauthOnlyRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <UnauthOnlyRoute>
              <ForgotPassword />
            </UnauthOnlyRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <UnauthOnlyRoute>
              <ResetPassword />
            </UnauthOnlyRoute>
          }
        />

        <Route
          path='/profile'
          element={
            <AuthRoute>
              <Profile />
            </AuthRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <AuthRoute>
              <ProfileOrders />
            </AuthRoute>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <AuthRoute>
              <OrderInfo />
            </AuthRoute>
          }
        />

        <Route path='/ingredients/:id' element={<IngredientDetails />} />

        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингридиента' onClose={handleCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal title='' onClose={handleCloseModal}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <AuthRoute>
                <Modal title='' onClose={handleCloseModal}>
                  <OrderInfo />
                </Modal>
              </AuthRoute>
            }
          />
        </Routes>
      )}
    </>
  );
};