import { ADD_FEED, ADD_PRICE } from "../actions/currentFeed";
import { currentFeedReducer } from "../reducers/currentFeed";

describe("currentFeedReducer", () => {
  const initialState = {
    name: "",
    price: null,
    feed: [],
  };

  const mockFeedItem = {
    _id: "1",
    name: "Test Ingredient",
    type: "main",
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 100,
    price: 100,
    image: "image.png",
    image_mobile: "image-mobile.png",
    image_large: "image-large.png",
    __v: 0,
    count: 1,
  };

  it("should return initial state", () => {
    expect(currentFeedReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle ADD_FEED action", () => {
    const action = {
      type: ADD_FEED,
      payload: {
        feed: [mockFeedItem],
      },
    };

    const expectedState = {
      ...initialState,
      feed: [mockFeedItem],
    };

    expect(currentFeedReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle ADD_PRICE action", () => {
    const action = {
      type: ADD_PRICE,
      payload: {
        price: 250,
      },
    };

    const expectedState = {
      ...initialState,
      price: 250,
    };

    expect(currentFeedReducer(initialState, action)).toEqual(expectedState);
  });

  it("should not modify state for unknown action", () => {
    const action = {
      type: "UNKNOWN_ACTION",
    };

    expect(currentFeedReducer(initialState, action)).toBe(initialState);
  });

  it("should handle multiple actions sequentially", () => {
    let state = currentFeedReducer(initialState, {
      type: ADD_FEED,
      payload: {
        feed: [mockFeedItem],
      },
    });

    state = currentFeedReducer(state, {
      type: ADD_PRICE,
      payload: {
        price: 350,
      },
    });

    expect(state).toEqual({
      name: "",
      price: 350,
      feed: [mockFeedItem],
    });
  });

  it("should replace existing feed when ADD_FEED dispatched", () => {
    const firstState = currentFeedReducer(initialState, {
      type: ADD_FEED,
      payload: {
        feed: [mockFeedItem],
      },
    });

    const newFeedItem = {
      ...mockFeedItem,
      _id: "2",
      name: "New Ingredient",
    };

    const secondState = currentFeedReducer(firstState, {
      type: ADD_FEED,
      payload: {
        feed: [newFeedItem],
      },
    });

    expect(secondState.feed).toEqual([newFeedItem]);
    expect(secondState.feed).not.toContain(mockFeedItem);
  });

  it("should handle empty feed array", () => {
    const action = {
      type: ADD_FEED,
      payload: {
        feed: [],
      },
    };

    expect(currentFeedReducer(initialState, action)).toEqual({
      ...initialState,
      feed: [],
    });
  });

  it("should handle null price", () => {
    const action = {
      type: ADD_PRICE,
      payload: {
        price: null,
      },
    };

    expect(currentFeedReducer(initialState, action)).toEqual({
      ...initialState,
      price: null,
    });
  });
});
