import { useState } from "react";

function AddCrewForm(props) {
    const { onAdd, movieId } = props 
    const [name, setName] = useState('');
    const [role, setRole] = useState('DIRECTOR');

    const add = (event) => {
        onAdd(
            name, 
            role,
            movieId
        )
        setName('');
        setRole('DIRECTOR')
    }

    return (
        <div>
            <div>
                <input type='text' placeholder='name' value={name} onChange={(evt) => setName(evt.target.value)} />
                <div>
                    <label for="movie-select">Choose a category:</label>
                    <select id="movie-select"  value={role} onChange={(evt) => setRole(evt.target.value)}>
                        <option value="DIRECTOR">DIRECTOR</option>
                        <option value="GRIP">GRIP</option>
                        <option value="ACTOR">ACTOR</option>
                    </select>
                </div>
                <div>
                    <input type='button' value='add me!' onClick={add}/>
                </div>
            </div>
        </div>
    );
}

export default AddCrewForm;
