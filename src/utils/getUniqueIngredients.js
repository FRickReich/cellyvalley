export const getUniqueIngredients = (recipesData) => {
    const allIngredients = recipesData.recipes.reduce(
        (acc, recipe) => [...acc, ...recipe.ingredients],
        []
    );

    return [...new Set(allIngredients)].sort();
}
