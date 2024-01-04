import { useState } from 'react';
import collectingsData from './../data/collectings.json';
import locationsData from '../data/locations.json';

export const Collecting = () => {
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
                        collectingsData.collectings.map((collecting, i) => (
                            <li
                                key={i}
                                className='App__container__list__item'
                            >
                                <h3 className='App__container__list__item__title'>{collecting.title}</h3>
                            </li>
                        ))
                    }
                    {
                        collectingsData.collectings.length
                    }
                </ul>
            </div>
        </section>
    )
}
