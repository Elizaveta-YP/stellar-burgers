// orderSlice.test.ts
import { TOrder } from '@utils-types';
import reducer, { createOrder, closeOrder } from './orderSlice';

const mockOrder: TOrder = {
  _id: '1',
  status: 'done',
  name: 'Order 1',
  createdAt: '2025-11-26',
  updatedAt: '2025-11-26',
  number: 111,
  ingredients: ['bun-1', 'main-1']
};

describe('orderSlice', () => {
  it('очищает заказ по closeOrder', () => {
    const filledState = {
      ...reducer(undefined, { type: '' }),
      currentOrder: mockOrder,
      orderNumber: 111
    };
    const state = reducer(filledState, closeOrder());
    expect(state.currentOrder).toBeNull();
    expect(state.orderNumber).toBeNull();
    expect(state.isLoading).toBe(false);
  });

  it('устанавливает isLoading при pending', () => {
    const state = reducer(undefined, createOrder.pending('', []));
    expect(state.isLoading).toBe(true);
  });

  it('сохраняет данные при fulfilled', () => {
    const state = reducer(
      undefined,
      createOrder.fulfilled(mockOrder, '', [])
    );
    expect(state.isLoading).toBe(false);
    expect(state.currentOrder).toEqual(mockOrder);
    expect(state.orderNumber).toEqual(mockOrder.number);
  });

  it('сбрасывает isLoading при rejected', () => {
    const state = reducer(
      undefined,
      createOrder.rejected(new Error('Ошибка'), '', [])
    );
    expect(state.isLoading).toBe(false);
    // currentOrder и orderNumber не меняются (остаются null)
    expect(state.currentOrder).toBeNull();
    expect(state.orderNumber).toBeNull();
  });
});