import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Movie(props) {

    const { item, onSave, onDelete, setSelectedMovie } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(item.title);
    const [category, setCategory] = useState(item.category);
    const [releaseDate, setReleaseDate] = useState(new Date(item.releaseDate));

    const seeCrew = (event) => {
        setSelectedMovie(item);
    }

    const formatReleaseDate = (d) => {
        return d.substring(0, 10);
    }

    const deleteMovie = (event) => {
        onDelete(item.id);
    }

    const edit = () => {
        setIsEditing(true);
    }

    const cancel = () => {
        setIsEditing(false);
    }

    const saveMovie = () => {
        onSave( item.id, {
            title,
            category, 
            releaseDate
        })
        setIsEditing(false);
    }
    return (
        <div>
            {
                isEditing ? (
                    <>
                        I am editing right now
                        <div>
                            <input type='text' placeholder='title' value={title} onChange={(evt) => setTitle(evt.target.value)} />
                            <div>
                                <label for="movie-select">Choose a category:</label>
                                <select id="movie-select" value={category} onChange={(evt) => setCategory(evt.target.value)}>
                                    <option value="ACTION">ACTION</option>
                                    <option value="ROMANTIC">ROMANTIC</option>
                                    <option value="ANIMATION">ANIMATION</option>
                                </select>
                            </div>
                            <div>
                                <label for="release">Release Date:</label>

                                <DatePicker selected={releaseDate} onChange={date => setReleaseDate(date)} />
                            </div>
                        </div>
                        <input type='button' value='cancel' onClick={cancel} />
                        <input type='button' value='save' onClick={saveMovie} />
                    </>
                ) :
                    (
                        <>
                            <div>
                                i have the title <a className="movie-title">{item.title}</a>  and my genre is <span className="movie-category">{item.category} </span> and I was released on {formatReleaseDate(item.releaseDate)}
                            </div>
                            <div>
                                <input type='button' value='delete' onClick={deleteMovie} />
                                <input type='button' value='edit' onClick={edit} />
                                <input type='button' value='seeCrew' onClick={seeCrew} />
                            </div>
                        </>
                    )
            }
        </div>
    )
}

export default Movie