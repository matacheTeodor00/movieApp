import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddMovieForm(props) {
    const { onAdd } = props 
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('ACTION');
    const [releaseDate, setReleaseDate] = useState(new Date());

    const add = (event) => {
        onAdd({
            title, 
            category,
            releaseDate
        })
        setTitle('');
    }

    return (
        <div>
            <div>
                <input type='text' placeholder='title' value={title} onChange={(evt) => setTitle(evt.target.value)} />
                <div>
                    <label for="movie-select">Choose a category:</label>
                    <select id="movie-select"  value={category} onChange={(evt) => setCategory(evt.target.value)}>
                        <option value="ACTION">ACTION</option>
                        <option value="ROMANTIC">ROMANTIC</option>
                        <option value="ANIMATION">ANIMATION</option>
                    </select>
                </div>
                <div>
                    <label for="release">Release Date:</label>

                    <DatePicker selected={releaseDate} onChange={date => setReleaseDate(date)} />
                </div>
                <div>
                    <input type='button' value='add me!' onClick={add}/>
                </div>
            </div>
        </div>
    );
}

export default AddMovieForm;
