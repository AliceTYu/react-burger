  export const countUniqueIds = (ingredients: string[]) => {
    const countMap = new Map();

    ingredients.forEach((id) => {
      if (countMap.has(id)) {
        countMap.set(id, countMap.get(id) + 1);
      } else {
        countMap.set(id, 1);
      }
    });

    return countMap;
  };