import { useState } from 'react';
import recipesData from './../data/recipes.json';

export const Recipes = () => {
    const [searchTerm, setSearchTerm] = useState('');

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
                    Zutat1, Zutat2, Zutat3, Zutat4, Zutat5
                </div>
            </div>

            <div className='App__container'>
                <ul className='App__container__list'>
                    {
                        recipesData.recipes.map((recipe, i) => (
                            <li key={i}>
                                {recipe.title}
                            </li>
                        ))
                    }
                </ul>
            </div>
        </section>
    )
}
