import { useEffect, useState } from 'react';

import recipesData from './recipes.json';
import ingredientsData from './ingredients.json';

import './App.scss';

const App = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [ingredientFilters, setIngredientFilters] = useState(Array(5).fill(''));
	const [showIngredientWindow, setShowIngredientWindow] = useState(false);
	const [currentIngredient, setCurrentIngredient] = useState(undefined);
	const [selectedIngredient, setSelectedIngredient] = useState({});

	useEffect(() => {
		if(currentIngredient)
		{
			setSelectedIngredient(ingredientsData.ingredients.find(ing => ing.title === currentIngredient))
			console.log(selectedIngredient);
		}

	}, [currentIngredient]);

	const filteredRecipes = recipesData.recipes
		.filter(recipe => {
			const matchTitle = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());

			const matchIngredients = ingredientFilters.every((filter, index) =>
				filter ? recipe.ingredients.includes(filter) : true
			);

			return matchTitle && matchIngredients;
		})
		.sort((a, b) => a.title.localeCompare(b.title));

		const getUniqueIngredients = () => {
			const allIngredients = recipesData.recipes.reduce(
				(acc, recipe) => [...acc, ...recipe.ingredients],
				[]
			);
		
			return [...new Set(allIngredients)].sort();
		};
		
		const determineIngredientColor = (ingredientTitle) => {
			const ingredient = ingredientsData.ingredients.find(item => item.title === ingredientTitle);
		
			// If the ingredient is found, return 'blue'; otherwise, return 'gray'
			return ingredient ? 'blue' : 'gray';
		};

		const handleShowIngredientsWindow = (ingredient) =>
		{
			setCurrentIngredient(ingredient);
			setShowIngredientWindow(true);
		}

		const handleHideIngredientsWindow = () => {
			setShowIngredientWindow(false);
			setCurrentIngredient(undefined);
		}

	return (
		<div className='App'>

			{
				showIngredientWindow && (
					<div className='App__window'>
						<h3 className="App__window__title">{ selectedIngredient.title }</h3>
						<div className="App__window__text">
							<p>
								Hier findest du diese Zutat:
							</p>
							<ul>
								{
									selectedIngredient?.positions?.map((pos, i) => (
										<li key={i}>{pos}</li>
									))
								}
							</ul>
						</div>
						<button className="App__window__button" onClick={() => handleHideIngredientsWindow()}>Danke</button>
					</div>
				)
			}
			

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
							<p className='App__container__list__item__ingredients'>{recipe.ingredients.map(ingredient => (
								<span 
									key={ingredient} 
									style={{ color: determineIngredientColor(ingredient) }}
									onClick={() => handleShowIngredientsWindow(ingredient)}
								>
									{ingredient}
								</span>
							)).reduce((prev, curr) => [prev, ', ', curr])}</p>
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
