// burgerConstructorSlice.test.ts
import { TIngredient } from '@utils-types';
import reducer, {
  addToConstructor,
  removeFromConstructor,
  reorderConstructor,
  resetConstructor
} from './burgerConstructorSlice';

const bun: TIngredient = {
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
};

const main: TIngredient = {
  ...bun,
  _id: 'main-1',
  type: 'main',
  name: 'Начинка',
  price: 50
};

describe('burgerConstructorSlice', () => {
  it('добавляет булку', () => {
    const state = reducer(undefined, addToConstructor(bun));
    expect(state.bun).toMatchObject({ ...bun, id: expect.any(String) });
    expect(state.ingredients).toHaveLength(0);
  });

  it('добавляет начинку', () => {
    const state = reducer(undefined, addToConstructor(main));
    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toMatchObject({ ...main, id: expect.any(String) });
  });

  it('удаляет ингредиент по индексу', () => {
    let state = reducer(undefined, addToConstructor(main));
    state = reducer(state, addToConstructor(main));
    const initialLength = state.ingredients.length;
    state = reducer(state, removeFromConstructor(0));
    expect(state.ingredients).toHaveLength(initialLength - 1);
  });

  it('меняет порядок ингредиентов', () => {
    let state = reducer(undefined, addToConstructor(main));
    state = reducer(state, addToConstructor({ ...main, _id: 'main-2' }));
    const firstId = state.ingredients[0]._id;
    const secondId = state.ingredients[1]._id;

    state = reducer(state, reorderConstructor({ from: 0, to: 1 }));
    expect(state.ingredients[0]._id).toBe(secondId);
    expect(state.ingredients[1]._id).toBe(firstId);
  });

  it('сбрасывает конструктор', () => {
    let state = reducer(undefined, addToConstructor(bun));
    state = reducer(state, addToConstructor(main));
    state = reducer(state, resetConstructor());
    expect(state).toEqual({ bun: null, ingredients: [] });
  });
});