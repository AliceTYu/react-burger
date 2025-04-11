import {
  DEL_CURRENT_INGREDIENT,
  SET_CURRENT_INGREDIENT,
} from "../actions/currentIngredient";
import { currentIngredientReducer } from "../reducers/currentIngredient";

describe("currentIngredientReducer", () => {
  const initialState = {
    currentIngredient: {},
  };

  const mockIngredient = {
    _id: "1",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 0,
  };

  it("should return initial state", () => {
    expect(currentIngredientReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle SET_CURRENT_INGREDIENT action", () => {
    const action = {
      type: SET_CURRENT_INGREDIENT,
      payload: {
        currentIngredient: mockIngredient,
      },
    };

    expect(currentIngredientReducer(initialState, action)).toEqual({
      currentIngredient: mockIngredient,
    });
  });

  it("should handle DEL_CURRENT_INGREDIENT action", () => {
    const stateWithIngredient = currentIngredientReducer(initialState, {
      type: SET_CURRENT_INGREDIENT,
      payload: {
        currentIngredient: mockIngredient,
      },
    });

    const action = {
      type: DEL_CURRENT_INGREDIENT,
    };

    expect(currentIngredientReducer(stateWithIngredient, action)).toEqual(
      initialState
    );
  });

  it("should not modify state for unknown action", () => {
    const action = {
      type: "UNKNOWN_ACTION",
    };

    expect(currentIngredientReducer(initialState, action)).toBe(initialState);
  });

  it("should completely replace current ingredient on SET", () => {
    const firstIngredient = {
      ...mockIngredient,
      _id: "1",
      name: "First Ingredient",
    };

    const secondIngredient = {
      ...mockIngredient,
      _id: "2",
      name: "Second Ingredient",
    };

    let state = currentIngredientReducer(initialState, {
      type: SET_CURRENT_INGREDIENT,
      payload: {
        currentIngredient: firstIngredient,
      },
    });

    state = currentIngredientReducer(state, {
      type: SET_CURRENT_INGREDIENT,
      payload: {
        currentIngredient: secondIngredient,
      },
    });

    expect(state.currentIngredient).toEqual(secondIngredient);
    expect(state.currentIngredient).not.toEqual(firstIngredient);
  });

  it("should handle empty object as ingredient", () => {
    const action = {
      type: SET_CURRENT_INGREDIENT,
      payload: {
        currentIngredient: {},
      },
    };

    expect(currentIngredientReducer(initialState, action)).toEqual({
      currentIngredient: {},
    });
  });
});
