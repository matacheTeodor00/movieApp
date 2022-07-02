import { useState } from "react";

 function FilterMovieForm(props) {

    const { onFilter, setFiltered, setSorted } = props 
    const [category, setCategory] = useState('ACTION');
    const [year, setYear] = useState('');

    const filter = (event) => {
        onFilter(
            category,
            year
        )
    }

    const clearFilter = (event) => {
        setSorted(false);
        setFiltered(false);
    }

    const sortTitles = (event) => {
        setFiltered(false);
        setSorted(true);
    }

    return (
        <div>
            <div>
                <div>
                    <h3>Filter Movies</h3>
                    <label for="movie-select">Choose a category:</label>
                    <select id="movie-select"  value={category} onChange={(evt) => setCategory(evt.target.value)}>
                        <option value="ACTION">ACTION</option>
                        <option value="ROMANTIC">ROMANTIC</option>
                        <option value="ANIMATION">ANIMATION</option>
                    </select>
                </div>
                <div>
                    <label for="release">Choose movies released after year:</label>

                    <input type='number' placeholder='year' value={year} onChange={(evt) => setYear(evt.target.value)} />
                </div>
                <div>
                    <input type='button' value='filer me!' onClick={filter}/>
                    <input type='button' value='clear filter' onClick={clearFilter} />
                    <input type='button' value='sort alphabetically' onClick={sortTitles} />
                </div>
            </div>
        </div>
    )

 }

 export default FilterMovieForm;