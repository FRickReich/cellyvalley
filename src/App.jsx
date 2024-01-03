import { useEffect, useState } from 'react';

import recipesData from './recipes.json';
import ingredientsData from './ingredients.json';

import './App.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAppleAlt, faBan, faBowlFood, faCarrot, faCloud, faCoins, faIceCream, faMortarPestle, faShrimp, faStopCircle, faWheatAwn } from '@fortawesome/free-solid-svg-icons';

const App = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [ingredientFilters, setIngredientFilters] = useState(Array(5).fill(''));
	const [showIngredientWindow, setShowIngredientWindow] = useState(false);
	const [currentIngredient, setCurrentIngredient] = useState(undefined);
	const [selectedIngredient, setSelectedIngredient] = useState({});

	useEffect(() => {
		if (currentIngredient) {
			setSelectedIngredient(ingredientsData.ingredients.find(ing => ing.title === currentIngredient));
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

	const determineFoodTypeIcon = (ingredientType) => {

		let selectedIcon;

		switch (ingredientType) {
			case "Gemüse":
				selectedIcon = faCarrot;
				break;
			case "Früchte":
				selectedIcon = faAppleAlt;
				break;
			case "Getreide":
				selectedIcon = faWheatAwn;
				break;
			case "Anderes":
				selectedIcon = faBowlFood;
				break;
			case "Gewürze und Kräuter":
				selectedIcon = faMortarPestle;
				break;
			case "Süßigkeiten":
				selectedIcon = faIceCream;
				break;
			case "Meeresfrüchte":
				selectedIcon = faShrimp;
				break;
			default:
				selectedIcon = faBan;
				break;
		}
		return <FontAwesomeIcon icon={selectedIcon} />;
	}

	const handleShowIngredientsWindow = (ingredient) => {
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
						<div className="App__window__wrapper">

							<h3 className="App__window__title">{determineFoodTypeIcon(selectedIngredient.type)} {selectedIngredient.title}</h3>
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
								<p>Typ: {determineFoodTypeIcon(selectedIngredient.type)} {selectedIngredient.type}</p>
								<p>Energie: {selectedIngredient.power} <FontAwesomeIcon icon={faCloud}/></p>
								<p>Verkauf: {selectedIngredient.revenue} <FontAwesomeIcon icon={faCoins}/></p>
							</div>
							<button className="App__window__button" onClick={() => handleHideIngredientsWindow()}>Danke</button>
						</div>
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
								{getUniqueIngredients().map((ingredient, n) => (
									<option key={n} value={ingredient}>
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
							<p className='App__container__list__item__ingredients'>{recipe.ingredients.map((ingredient, r) => (
								<span
									key={r}
									style={{ color: determineIngredientColor(ingredient) }}
									onClick={() => determineIngredientColor(ingredient) === "blue" ? handleShowIngredientsWindow(ingredient) : undefined}
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
