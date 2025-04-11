import {
  ADD_BUN,
  ADD_INGREDIENTS,
  DEL_INGREDIENTS,
  DELL_ALL_INGREDIENTS,
  UPDATE_SORT,
} from "../actions/currentIngredients";
import {
  currentIngredients,
  initialState,
} from "../reducers/currentIngredients";

describe("currentIngredients reducer", () => {
  const mockBun = {
    _id: "bun-1",
    name: "Краторная булка",
    type: "bun",
    price: 1255,
  };

  const mockIngredient1 = {
    _id: "ing-1",
    id: "uuid-1",
    name: "Соус фирменный",
    type: "sauce",
    price: 300,
  };

  const mockIngredient2 = {
    _id: "ing-2",
    id: "uuid-2",
    name: "Биокотлета",
    type: "main",
    price: 500,
  };

  it("should return initial state", () => {
    expect(currentIngredients(undefined, {})).toEqual(initialState);
  });

  it("should handle ADD_BUN action", () => {
    const action = {
      type: ADD_BUN,
      payload: {
        bun: mockBun,
      },
    };

    expect(currentIngredients(initialState, action)).toEqual({
      bun: mockBun,
      ingredients: [],
    });
  });

  it("should handle ADD_INGREDIENTS action", () => {
    const action = {
      type: ADD_INGREDIENTS,
      payload: {
        newIngredient: {
          _id: "ing-1",
          name: "Соус фирменный",
          type: "sauce",
          price: 300,
        },
        id: "uuid-1",
      },
    };

    expect(currentIngredients(initialState, action)).toEqual({
      bun: null,
      ingredients: [mockIngredient1],
    });
  });

  it("should handle UPDATE_SORT action", () => {
    const stateWithIngredients = {
      bun: mockBun,
      ingredients: [mockIngredient1, mockIngredient2],
    };

    const reorderedIngredients = [mockIngredient2, mockIngredient1];
    const action = {
      type: UPDATE_SORT,
      payload: {
        ingredients: reorderedIngredients,
      },
    };

    expect(currentIngredients(stateWithIngredients, action)).toEqual({
      bun: mockBun,
      ingredients: reorderedIngredients,
    });
  });

  it("should handle DEL_INGREDIENTS action", () => {
    const stateWithIngredients = {
      bun: mockBun,
      ingredients: [mockIngredient1, mockIngredient2],
    };

    const action = {
      type: DEL_INGREDIENTS,
      payload: {
        deleteId: "uuid-1",
      },
    };

    expect(currentIngredients(stateWithIngredients, action)).toEqual({
      bun: mockBun,
      ingredients: [mockIngredient2],
    });
  });

  it("should handle DELL_ALL_INGREDIENTS action", () => {
    const stateWithIngredients = {
      bun: mockBun,
      ingredients: [mockIngredient1, mockIngredient2],
    };

    const action = {
      type: DELL_ALL_INGREDIENTS,
    };

    expect(currentIngredients(stateWithIngredients, action)).toEqual(
      initialState
    );
  });

  it("should not modify state for unknown action", () => {
    const action = {
      type: "UNKNOWN_ACTION",
    };

    expect(currentIngredients(initialState, action)).toBe(initialState);
  });

  it("should handle multiple ADD_INGREDIENTS actions", () => {
    let state = currentIngredients(initialState, {
      type: ADD_INGREDIENTS,
      payload: {
        newIngredient: {
          _id: "ing-1",
          name: "Соус фирменный",
          type: "sauce",
          price: 300,
        },
        id: "uuid-1",
      },
    });

    state = currentIngredients(state, {
      type: ADD_INGREDIENTS,
      payload: {
        newIngredient: {
          _id: "ing-2",
          name: "Биокотлета",
          type: "main",
          price: 500,
        },
        id: "uuid-2",
      },
    });

    expect(state).toEqual({
      bun: null,
      ingredients: [mockIngredient1, mockIngredient2],
    });
  });

  it("should replace bun when ADD_BUN is dispatched again", () => {
    const firstBun = { ...mockBun, _id: "bun-1" };
    const secondBun = { ...mockBun, _id: "bun-2" };

    let state = currentIngredients(initialState, {
      type: ADD_BUN,
      payload: {
        bun: firstBun,
      },
    });

    state = currentIngredients(state, {
      type: ADD_BUN,
      payload: {
        bun: secondBun,
      },
    });

    expect(state.bun).toEqual(secondBun);
    expect(state.bun).not.toEqual(firstBun);
  });

  it("should handle empty ingredients array in UPDATE_SORT", () => {
    const action = {
      type: UPDATE_SORT,
      payload: {
        ingredients: [],
      },
    };

    expect(currentIngredients(initialState, action)).toEqual({
      bun: null,
      ingredients: [],
    });
  });
});
