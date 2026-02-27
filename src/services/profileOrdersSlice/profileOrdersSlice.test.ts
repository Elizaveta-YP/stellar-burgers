// profileOrdersSlice.test.ts
import { TOrder } from '@utils-types';
import reducer, { fetchProfileOrders, fetchOrderByNumber } from './profileOrdersSlice';

const mockOrders: TOrder[] = [
  {
    _id: '1',
    status: 'done',
    name: 'Profile Order',
    createdAt: '2025-11-26',
    updatedAt: '2025-11-26',
    number: 1,
    ingredients: ['bun-1', 'main-1']
  }
];

const mockOrder: TOrder = mockOrders[0];

describe('profileOrdersSlice', () => {
  describe('fetchProfileOrders', () => {
    it('устанавливает isLoading при pending', () => {
      const state = reducer(undefined, fetchProfileOrders.pending('', undefined));
      expect(state.isLoading).toBe(true);
    });

    it('сохраняет данные при fulfilled', () => {
      const state = reducer(
        undefined,
        fetchProfileOrders.fulfilled(mockOrders, '', undefined)
      );
      expect(state.isLoading).toBe(false);
      expect(state.orders).toEqual(mockOrders);
    });

    it('сбрасывает isLoading при rejected', () => {
      const state = reducer(
        undefined,
        fetchProfileOrders.rejected(new Error('Ошибка'), '', undefined)
      );
      expect(state.isLoading).toBe(false);
    });
  });

  describe('fetchOrderByNumber', () => {
    it('устанавливает currentOrder в null при pending', () => {
      const state = reducer(
        { orders: [], currentOrder: mockOrder, isLoading: false },
        fetchOrderByNumber.pending('', 1)
      );
      expect(state.currentOrder).toBeNull();
      // isLoading не меняется (в редьюсере не затронуто)
      expect(state.isLoading).toBe(false);
    });

    it('сохраняет данные при fulfilled', () => {
      const state = reducer(
        undefined,
        fetchOrderByNumber.fulfilled(mockOrder, '', 1)
      );
      expect(state.currentOrder).toEqual(mockOrder);
      // проверяем, что добавилось поле orderNumber (оно есть в коде, хотя не описано в типе)
      expect((state as any).orderNumber).toEqual(mockOrder.number);
      // isLoading не меняется
      expect(state.isLoading).toBe(false);
    });

    it('устанавливает currentOrder в null при rejected', () => {
      const state = reducer(
        { orders: [], currentOrder: mockOrder, isLoading: false },
        fetchOrderByNumber.rejected(new Error('Ошибка'), '', 1)
      );
      expect(state.currentOrder).toBeNull();
      expect(state.isLoading).toBe(false);
    });
  });
});