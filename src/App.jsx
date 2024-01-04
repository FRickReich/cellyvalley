import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping, faCat, faCloud, faCoins, faPepperHot, faPizzaSlice } from '@fortawesome/free-solid-svg-icons';

import { determineFoodTypeIcon, getRandomImage, getUniqueIngredients } from './utils';

import { Recipes, Ingredients, Animals, Collecting } from './views'

import recipesData from './data/recipes.json';
import ingredientsData from './data/ingredients.json';

import './App.scss';

const App = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [ingredientFilters, setIngredientFilters] = useState(Array(5).fill(''));
	const [showIngredientWindow, setShowIngredientWindow] = useState(false);
	const [currentIngredient, setCurrentIngredient] = useState(undefined);
	const [selectedIngredient, setSelectedIngredient] = useState({});
	const [activeTab, setActiveTab] = useState(0);

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

	const determineIngredientColor = (ingredientTitle) => {
		const ingredient = ingredientsData.ingredients.find(item => item.title === ingredientTitle);

		return ingredient ? 'black' : 'gray';
	};

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

							<h3 className="App__window__title">{selectedIngredient.title}</h3>
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
								<p>Energie vom Mampfen: {selectedIngredient.power} <FontAwesomeIcon icon={faCloud} /></p>
								<p>Goofie gibt dir hierfür: {selectedIngredient.revenue} <FontAwesomeIcon icon={faCoins} /></p>
							</div>
							<button className="App__window__button" onClick={() => handleHideIngredientsWindow()}>Danke</button>
							<div className="App__window__character">
								<img src={getRandomImage()} alt="" />
							</div>
						</div>
					</div>
				)
			}

			<header className="App__header">
				<div className="App__header__top">
					<div
						className={`App__header__top__item ${activeTab === 0 ? 'App__header__top__item--active' : ''}`}
						onClick={() => setActiveTab(0)}
					>
						<FontAwesomeIcon icon={faPizzaSlice} />
					</div>
					<div
						className={`App__header__top__item ${activeTab === 1 ? 'App__header__top__item--active' : ''}`}
						onClick={() => setActiveTab(1)}
					>
						<FontAwesomeIcon icon={faPepperHot} />
					</div>
					<div
						className={`App__header__top__item ${activeTab === 2 ? 'App__header__top__item--active' : ''}`}
						onClick={() => setActiveTab(2)}
					>
						<FontAwesomeIcon icon={faCat} />
					</div>
					<div
						className={`App__header__top__item ${activeTab === 3 ? 'App__header__top__item--active' : ''}`}
						onClick={() => setActiveTab(3)}
					>
						<FontAwesomeIcon icon={faBasketShopping} />
					</div>
				</div>
				<h2>
					CellyValley {
						activeTab === 1 ? "Zutaten" :
							activeTab === 2 ? "Tierchen" :
								activeTab === 3 ? "Sammeln" : "Rezepte"
					}
				</h2>
			</header>

			{
				activeTab === 0 &&
				(
					<section>
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
											{getUniqueIngredients(recipesData).map((ingredient, n) => (
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
											<div
												key={r}
												style={{ color: determineIngredientColor(ingredient) }}
												onClick={() => determineIngredientColor(ingredient) === "black" ? handleShowIngredientsWindow(ingredient) : undefined}
											>
												{
													ingredientsData.ingredients.find(ing => ing.title === ingredient) ? (
														<div>{determineFoodTypeIcon(ingredientsData.ingredients.find(ing => ing.title === ingredient).type)} {ingredient}</div>)
														:
														(<div>{determineFoodTypeIcon(ingredient)} {ingredient}</div>)
												}
											</div>
										)).reduce((prev, curr) => [prev, curr])}</p>
										<div>
											{[...Array(recipe.rating)].map((star, i) => (
												<span key={i} className="App__container__list__item__star">&#9733;</span>
											)
											)}
										</div>
									</li>
								))}
							</ul>
						</div>
					</section>
				)
			}

			{
				activeTab === 1 &&
				(
					<>
						<Ingredients />
					</>
				)
			}

			{
				activeTab === 2 &&
				(
					<>
						<Animals />
					</>
				)
			}

			{
				activeTab === 3 &&
				(
					<>
						<Collecting />
					</>
				)
			}

		</div>
	);
};

export default App
