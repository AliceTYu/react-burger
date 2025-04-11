import { INGREDIENTS_ERROR, SET_INGREDIENTS } from "../actions/allIngredients";
import { allIngredientsReducer } from "../reducers/allIngredients";

describe("allIngredientsReducer", () => {
  const initialState = {
    allIngredients: [],
    errorSet: false,
    isLoading: false,
  };

  it("должен возвращать начальное состояние", () => {
    expect(allIngredientsReducer(undefined, {})).toEqual(initialState);
  });

  it("должен обрабатывать SET_INGREDIENTS", () => {
    const mockIngredients = [{ _id: "1", name: "Булка", type: "bun" }];
    const action = {
      type: SET_INGREDIENTS,
      payload: { data: mockIngredients },
    };

    expect(allIngredientsReducer(initialState, action)).toEqual({
      ...initialState,
      allIngredients: mockIngredients,
    });
  });

  it("должен обрабатывать INGREDIENTS_ERROR", () => {
    const action = {
      type: INGREDIENTS_ERROR,
      payload: { errorSet: true },
    };

    expect(allIngredientsReducer(initialState, action)).toEqual({
      ...initialState,
      errorSet: true,
    });
  });

  it("не должен изменять состояние для неизвестного действия", () => {
    const action = { type: "UNKNOWN_ACTION" };
    expect(allIngredientsReducer(initialState, action)).toBe(initialState);
  });
});
