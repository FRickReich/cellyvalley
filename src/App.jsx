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
				<div className="App__menu__wrapper">
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
							<option value="">Zutat</option>
							{getUniqueIngredients().map(ingredient => (
								<option key={ingredient} value={ingredient}>
									{ingredient}
								</option>
							))}
						</select>
					))}
				</div>
				</div>
				
			</div>

			<div className='App__container'>
				<ul className='App__container__list'>
					{filteredRecipes.map(recipe => (
						<li 
							key={recipe.title}
							className='App__container__list__item'
						>
							<h3 className='App__container__list__item__title'>{recipe.title}</h3>
							<p className='App__container__list__item__ingredients'>{recipe.ingredients.join(', ')}</p>
							{[...Array(recipe.rating)].map((star, i) => (
								<span key={i} className="App__container__list__item__star">&#9733;</span>
							)
							)}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default App
