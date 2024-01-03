export const determineIngredientFound = (ingredientsData, ingredientTitle) => {
    return ingredientsData.ingredients.find(item => item.title === ingredientTitle);
}
