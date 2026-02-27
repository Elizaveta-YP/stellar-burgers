// ordersFeedSlice.test.ts
import { TOrdersData } from '@utils-types';
import reducer, { fetchFeed } from './ordersFeedSlice';

const mockFeed: TOrdersData = {
  orders: [
    {
      _id: '1',
      status: 'done',
      name: 'Order 1',
      createdAt: '2025-11-26',
      updatedAt: '2025-11-26',
      number: 1,
      ingredients: ['bun-1', 'main-1']
    }
  ],
  total: 567,
  totalToday: 10
};

describe('ordersFeedSlice', () => {
  it('устанавливает isLoading при pending', () => {
    const state = reducer(undefined, fetchFeed.pending('', undefined));
    expect(state.isLoading).toBe(true);
  });

  it('сохраняет данные при fulfilled', () => {
    const state = reducer(
      undefined,
      fetchFeed.fulfilled(mockFeed, '', undefined)
    );
    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(mockFeed.orders);
    expect(state.total).toEqual(mockFeed.total);
    expect(state.totalToday).toEqual(mockFeed.totalToday);
  });

  it('сбрасывает isLoading при rejected', () => {
    const state = reducer(
      undefined,
      fetchFeed.rejected(new Error('Ошибка'), '', undefined)
    );
    expect(state.isLoading).toBe(false);
  });
});