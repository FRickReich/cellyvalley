import { useState } from 'react';
import animalsData from '../data/animals.json';
import locationsData from '../data/locations.json';

export const Animals = () => {
    const [searchTerm, setSearchTerm] = useState('');
	const [locationFilter, setLocationFilter] = useState('');
	const [typeFilter, setTypeFilter] = useState('');

    const filteredAnimals = animalsData.animals
		.filter(animal => {
			const matchName = animal.name.toLowerCase().includes(searchTerm.toLowerCase());

            const matchCategory = animal.category.includes(typeFilter);
            let matchLocation;
            
            if(locationFilter !== "")
            {
                matchLocation = animal.positions.find(loc => loc === locationFilter) && true;
            }
            else
            {
                matchLocation = true;
            }

			return matchName && matchCategory && matchLocation;
		})
		.sort((a, b) => a.name.localeCompare(b.name));

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
                        <option value="Eichhörnchen">Eichhörnchen</option>
                        <option value="Fuchs">Fuchs</option>
                        <option value="Kaninchen">Kaninchen</option>
                        <option value="Krokodil">Krokodil</option>
                        <option value="Meeresschildkröte">Meeresschildkröte</option>
                        <option value="Nektarvogel">Nektarvogel</option>
                        <option value="Rabe">Rabe</option>
                        <option value="Waschbär">Waschbär</option>
                    </select>
                </div>
            </div>

            <div className='App__container'>
                <ul className='App__container__list'>
                    {
                        filteredAnimals.map((animal, i) => (
                            <li
                                key={i}
                                className='App__container__list__item'
                            >
                                <h3 className='App__container__list__item__title'>{animal.name}</h3>
                                Hier findest du dieses Tier:
                                <ul>
                                    {
                                        animal?.positions?.map((pos, i) => (
                                            <li key={i}>{pos}</li>
                                        ))
                                    }
                                </ul>
                                <p>
                                    Es futtert gerne <b>{animal?.food}</b>, <br />aber am liebsten mag es <b>{animal?.favorite}</b>.
                                </p>
                                <p>
                                    Du kannst es&nbsp;
                                    {
                                        animal?.days?.map((day, i) => {

                                            let currentDay;
                                            if (day === "MO") {
                                                currentDay = "Montags"
                                            }
                                            else if (day === "DI") {
                                                currentDay = "Dienstags"
                                            }
                                            else if (day === "MI") {
                                                currentDay = "Mittwochs"
                                            }
                                            else if (day === "DO") {
                                                currentDay = "Donnerstags"
                                            }
                                            else if (day === "FR") {
                                                currentDay = "Freitags"
                                            }
                                            else if (day === "SA") {
                                                currentDay = "Samstags"
                                            }
                                            else if (day === "SO") {
                                                currentDay = "Sonntags"
                                            }

                                            if (i == animal?.days?.length - 1) {
                                                return "und " + currentDay + " "
                                            }

                                            return currentDay + ", ";
                                        })
                                    }
                                    <br />
                                    zwischen <b>{animal?.time?.from}:00 Uhr</b> und <b>{animal?.time?.to}:00 Uhr</b> treffen.
                                </p>
                            </li>
                        ))
                    }
                </ul>
            </div>


        </section>
    )
}
