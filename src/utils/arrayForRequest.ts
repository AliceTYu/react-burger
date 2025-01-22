interface Ingredient {
  _id: string;
}

export const arrayForRequest = (bun: Ingredient, ing: Ingredient[]): string[] => {
  let ingredients = [];

  for (let i = 0; i < ing.length; i++) {
    ingredients[i] = ing[i]._id;
  }

  ingredients.push(bun._id);
  ingredients.unshift(bun._id);

  return ingredients;
};
