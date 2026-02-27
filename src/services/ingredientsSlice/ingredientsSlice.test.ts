// ingredientsSlice.test.ts
import { TIngredient } from '@utils-types';
import reducer, { fetchIngredients } from './ingredientsSlice';

const mockIngredients: TIngredient[] = [
  {
    _id: 'bun-1',
    name: 'Булка',
    type: 'bun',
    proteins: 10,
    fat: 20,
    carbohydrates: 30,
    calories: 500,
    price: 100,
    image: '',
    image_large: '',
    image_mobile: ''
  }
];

describe('ingredientsSlice', () => {
  it('устанавливает isLoading при pending', () => {
    const state = reducer(undefined, fetchIngredients.pending('', undefined));
    expect(state.isLoading).toBe(true);
  });

  it('сохраняет данные при fulfilled', () => {
    const state = reducer(
      undefined,
      fetchIngredients.fulfilled(mockIngredients, '', undefined)
    );
    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
  });

  it('сбрасывает isLoading при rejected', () => {
    const state = reducer(
      undefined,
      fetchIngredients.rejected(new Error('Ошибка'), '', undefined)
    );
    expect(state.isLoading).toBe(false);
    // ошибка не сохраняется в state, поэтому проверяем только isLoading
  });
});