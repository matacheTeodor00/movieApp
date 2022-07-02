import { useEffect, useState } from "react";
import store from "./MovieStore";
import AddMovieForm from "./AddMovieForm"
import Movie from "./Movie";
import FilterMovieForm from "./FilterMovieForm";
import CrewDetails from "./CrewDetails";
import AddCrewForm from "./AddCrewForm";

function MovieList() {

    const [movies, setMovies] = useState([]);
    const [crewMembers, setCrewMembers] = useState([]);
    const [areFiltered, setFiltered] = useState(false);
    const [areSorted, setSorted] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        if(selectedMovie){
            store.getCrewMembers(selectedMovie.id);
            store.emitter.addListener('GET_CREW_SUCCESS', () => {
                setCrewMembers(store.crewData);
            })
        }
        if (areFiltered) {
            store.emitter.addListener('GET_MOVIES_FILTER_SUCCESS', () => {
                setMovies(store.data);
            })
        }
        else if (areSorted) {
            store.getSortedMovies();
            store.emitter.addListener('GET_MOVIES_SORTED_SUCCESS', () => {
                setMovies(store.data);
            })
        }
        else {
            store.getMovies();
            store.emitter.addListener('GET_MOVIES_SUCCESS', () => {
                setMovies(store.data);
            })
        }

    }, [areFiltered, areSorted, selectedMovie])

    const addMovie = (movie) => {
        store.addMovie(movie);
    }

    const addCrew = (name, role, movieId) => {
        store.addCrewMember(name, role, movieId);
    }

    const saveMovie = (id, movie) => {
        store.saveMovie(id, movie);
    }

    const deleteMovie = (id) => {
        store.deleteMovie(id);
    }

    const filterMovie = (category, year) => {
        store.filterMovie(category, year)
        setFiltered(true);
    }

    const onDeleteCrewMember = (id, movieId) => {
        store.deleteCrewMember(id, movieId);
    }

    return (
        <div className="flex-container">
            <div>
                <h3>Add a movie</h3>
                <AddMovieForm onAdd={addMovie} />
                <FilterMovieForm onFilter={filterMovie} setFiltered={setFiltered} setSorted={setSorted} />
            </div>
            <div>
                <h2>Crew Members:</h2>
                {selectedMovie ?
                    crewMembers.map((e) => <CrewDetails key={e.id} item={e} onDeleteCrewMember={onDeleteCrewMember}/>) : <div></div>
                }
                {selectedMovie ? 
                <div><AddCrewForm onAdd={addCrew} movieId={selectedMovie.id} /></div> : <div></div>
                }
            </div>
            <div>
                <h3>list of movies</h3>
                {
                    movies.map((e) => <Movie key={e.id} item={e} onSave={saveMovie} onDelete={deleteMovie} setSelectedMovie={setSelectedMovie} />)
                }
            </div>
            
        </div>
    );
}


//selected
export default MovieList;