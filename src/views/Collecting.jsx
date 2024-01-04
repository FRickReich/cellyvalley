import { useState } from 'react';
import collectingsData from './../data/collectings.json';
import locationsData from '../data/locations.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';

export const Collecting = () => {
    const [searchTerm, setSearchTerm] = useState('');
	const [locationFilter, setLocationFilter] = useState('');
	const [typeFilter, setTypeFilter] = useState('');

    const filteredCollectings = collectingsData.collectings
		.filter(collecting => {
			const matchTitle = collecting.title.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchCategory = collecting.category.includes(typeFilter);
            let matchLocation;

            if(locationFilter !== "")
            {
                matchLocation = collecting.positions.find(loc => loc === locationFilter) && true;
            }
            else
            {
                matchLocation = true;
            }

			return matchTitle && matchCategory && matchLocation;
		})
		.sort((a, b) => a.title.localeCompare(b.title));

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
                        <option value="Blume">Blume</option>
                        <option value="Edelstein">Edelstein</option>
                        <option value="Material">Material</option>
                    </select>
                </div>
            </div>

            <div className='App__container'>
                <ul className='App__container__list'>
                    {
                        filteredCollectings.map((collecting, i) => (
                            <li
                                key={i}
                                className='App__container__list__item'
                            >
                                <h3 className='App__container__list__item__title'>{collecting.title}</h3>
                                Hier zu finden:
                                <ul>
                                    {
                                        collecting?.positions?.map((pos, i) => (
                                            <li key={i}>{pos}</li>
                                        ))
                                    }
                                </ul>
                                <p>Goofie gibt dir hierfür: {collecting.revenue} <FontAwesomeIcon icon={faCoins} /></p>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </section>
    )
}
