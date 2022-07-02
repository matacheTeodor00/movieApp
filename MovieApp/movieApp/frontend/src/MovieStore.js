import { EventEmitter } from 'fbemitter';

const SERVER = 'http://localhost:3001';

class MovieStore {
    constructor () {
        this.data = []
        this.crewData = []
        this.emitter = new EventEmitter()
    }

    async getMovies() {
        try{
            const response = await fetch(`${SERVER}/movies`)
            if(!response.ok){
                throw response
            }
            this.data=await response.json()
            this.emitter.emit('GET_MOVIES_SUCCESS')
        } catch(err) {
            console.warn(err)
            this.emitter.emit('GET_MOVIES_ERROR')
        }
    }

    async getSortedMovies() {
        try{
            const response = await fetch(`${SERVER}/moviesSorted`)
            if(!response.ok){
                throw response
            }
            this.data=await response.json()
            this.emitter.emit('GET_MOVIES_SORTED_SUCCESS')
        } catch(err) {
            console.warn(err)
            this.emitter.emit('GET_MOVIES_SORTED_ERROR')
        }
    }

    async addMovie(movie) {
        try{
            const response = await fetch(`${SERVER}/movies`,{
                method:'POST',headers: {'Content-Type' : 'application/json'}, body: JSON.stringify(movie)
            })
            if(!response.ok){
                throw response
            }
            this.getMovies()
        } catch(err) {
            console.warn(err)
            this.emitter.emit('ADD_MOVIE_ERROR')
        }
    }
    
    async saveMovie(id,movie) {
        try{
            const response = await fetch(`${SERVER}/movies/${id}`,{
                method:'PUT',headers: {'Content-Type' : 'application/json'}, body: JSON.stringify(movie)
            })
            if(!response.ok){
                throw response
            }
            this.getMovies()
        } catch(err) {
            console.warn(err)
            this.emitter.emit('SAVE_MOVIE_ERROR')
        }
    }

    async deleteMovie(id) {
        try{
            const response = await fetch(`${SERVER}/movies/${id}`,{
                method:'DELETE'
            })
            if(!response.ok){
                throw response
            }
            this.getMovies()
        } catch(err) {
            console.warn(err)
            this.emitter.emit('DELETE_MOVIE_ERROR')
        }
    }

    async filterMovie(category, year) {
        try{
            const response = await fetch(`${SERVER}/moviesFilter/${category}/${year}`)
            if(!response.ok){
                throw response
            }
            this.data=await response.json()
            this.emitter.emit('GET_MOVIES_FILTER_SUCCESS')
        } catch(err) {
            console.warn(err)
            this.emitter.emit('GET_MOVIES_FILTER_ERROR')
        }
    }

    async getCrewMembers(movieId) {
        try{
            const response = await fetch(`${SERVER}/movies/${movieId}/crew`)
            if(!response.ok){
                throw response
            }
            this.crewData=await response.json()
            this.emitter.emit('GET_CREW_SUCCESS')
        } catch(err) {
            console.warn(err)
            this.emitter.emit('GET_CREW_ERROR')
        }
    }

    async deleteCrewMember(id, movieId) {
        try{
            const response = await fetch(`${SERVER}/crew/${id}`,{
                method:'DELETE'
            })
            if(!response.ok){
                throw response
            }
            this.getCrewMembers(movieId);
        } catch(err) {
            console.warn(err)
            this.emitter.emit('DELETE_MOVIE_ERROR')
        }
    }

    async addCrewMember(name, role, movieId) {
        try{
            var crew = { name, role, movieId }
            const response = await fetch(`${SERVER}/movies/${movieId}/crew`,{
                method:'POST',headers: {'Content-Type' : 'application/json'}, body: JSON.stringify(crew)
            })
            if(!response.ok){
                throw response
            }
            this.getCrewMembers(movieId);
        } catch(err) {
            console.warn(err)
            this.emitter.emit('ADD_MOVIE_ERROR')
        }
    }
}


const store = new MovieStore();

export default store;