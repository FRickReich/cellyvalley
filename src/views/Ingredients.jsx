import { useState } from 'react';
import ingredientsData from '../data/ingredients.json';
import locationsData from '../data/locations.json';

export const Ingredients = () => {
    const [searchTerm, setSearchTerm] = useState('');
	const [locationFilter, setLocationFilter] = useState('');
	const [typeFilter, setTypeFilter] = useState('');

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
                    <select>
                        <option value="">Gebiet</option>
                        {
                            locationsData.locations.map((location, i) => (
                                <option key={i} value={location}>
                                    {location}
                                </option>
                            ))
                        }
                    </select>
                    <select disabled={true}>
                        <option value="">Typ</option>
                    </select>
                </div>
            </div>

            <div className='App__container'>
                <ul className='App__container__list'>
                    {
                        ingredientsData.ingredients.map((ingredient, i) => (
                            <li
                                key={i}
                                className='App__container__list__item'
                            >
                                <h3 className='App__container__list__item__title'>{ingredient.title}</h3>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </section>
    )
}
