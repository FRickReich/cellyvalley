import { useState } from 'react';
import ingredientsData from '../data/ingredients.json';
import locationsData from '../data/locations.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faCoins } from '@fortawesome/free-solid-svg-icons';
import { determineFoodTypeIcon } from './../utils';

export const Ingredients = () => {
    const [searchTerm, setSearchTerm] = useState('');
	const [locationFilter, setLocationFilter] = useState('');
	const [typeFilter, setTypeFilter] = useState('');

    const filteredIngredients = ingredientsData.ingredients
		.filter(ingredient => {
            const matchTitle = ingredient.title.toLowerCase().includes(searchTerm.toLowerCase());

            const matchCategory = ingredient.category.includes(typeFilter);
            let matchLocation;

            if(locationFilter !== "")
            {
                matchLocation = ingredient.positions.find(loc => loc === locationFilter) && true;
            }
            else
            {
                matchLocation = true;
            }

			return matchTitle && matchCategory && matchLocation;
        
        }).sort((a, b) => a.title.localeCompare(b.title));

    return (
        <section>
            <div className='App__menu'>
                <input
                    className='App__menu__input'
                    type="text"
                    placeholder="Suche"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <div className='App__menu__select'>
                <select
                        onChange={e => {
                            setLocationFilter(e.target.value);
                        }}
                    >
                        <option value="">Gebiet</option>
                        {
                            locationsData.locations.map((location, i) => (
                                <option key={i} value={location}>
                                    {location}
                                </option>
                            ))
                        }
                    </select>
                    <select
                        onChange={e => {
                            setTypeFilter(e.target.value);
                        }}
                    >
                        <option value="">Typ</option>
                        <option value="Gemüse">Gemüse</option>
                        <option value="Frucht">Frucht</option>
                        <option value="Getreide">Getreide</option>
                        <option value="Fisch">Fisch</option>
                        <option value="Meeresfrüchte">Meeresfrüchte</option>
                        <option value="Gewürz">Gewürz</option>
                        <option value="Süßigkeit">Süßigkeit</option>
                        <option value="Anderes">Anderes</option>
                    </select>
                </div>
            </div>

            <div className='App__container'>
                <ul className='App__container__list'>
                    {
                        filteredIngredients.map((ingredient, i) => (
                            <li
                                key={i}
                                className='App__container__list__item'
                            >
                                <h3 className='App__container__list__item__title'>{ingredient.title}</h3>
                                <div className="App__window__text">
								<p>
									Hier findest du diese Zutat:
								</p>
								<ul>
									{
										ingredient?.positions?.map((pos, i) => (
											<li key={i}>{pos}</li>
										))
									}
								</ul>
								<p>Typ: {determineFoodTypeIcon(ingredient.category)} {ingredient.category}</p>
								<p>Energie vom Mampfen: {ingredient.power} <FontAwesomeIcon icon={faCloud} /></p>
								<p>Goofie gibt dir hierfür: {ingredient.revenue} <FontAwesomeIcon icon={faCoins} /></p>
							</div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </section>
    )
}
