import { useState } from 'react';
import recipesData from './recipes.json';
import './App.scss';


const getUniqueIngredients = () => {
	const allIngredients = recipesData.recipes.reduce(
		(acc, recipe) => [...acc, ...recipe.ingredients],
		[]
	);

	return [...new Set(allIngredients)].sort();
};

const App = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [ingredientFilters, setIngredientFilters] = useState(Array(5).fill(''));

	const filteredRecipes = recipesData.recipes
  .filter(recipe => {
    const matchTitle = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchIngredients = ingredientFilters.every((filter, index) =>
      filter ? recipe.ingredients.includes(filter) : true
    );

    return matchTitle && matchIngredients;
  })
  .sort((a, b) => a.title.localeCompare(b.title));


	return (
		<div className='App'>
			<header className="App__header">
				<h1>CellyValley Rezepte</h1>
			</header>

			<div className='App__menu'>
				<input
					className='App__menu__input'
					type="text"
					placeholder="Suche"
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
				/>

				<div className='App__menu__select'>
					{ingredientFilters.map((filter, index) => (
						<select
							key={index}
							value={filter}
							onChange={e => {
								const newFilters = [...ingredientFilters];
								newFilters[index] = e.target.value;
								setIngredientFilters(newFilters);
							}}
						>
							<option value="">Zutat auswählen</option>
							{getUniqueIngredients().map(ingredient => (
								<option key={ingredient} value={ingredient}>
									{ingredient}
								</option>
							))}
						</select>
					))}
				</div>
			</div>

			<div className='App__container'>
				<ul>
					{filteredRecipes.map(recipe => (
						<li key={recipe.title}>
							<h3>{recipe.title}</h3>
							<p>{recipe.ingredients.join(', ')}</p>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default App
