const { Op } = require("sequelize");

const cors=require('cors')
// Express Initialisation
const express = require("express");
const app = express();
app.use(cors())
const port = 3001;

// Sequelize Initialisation
const sequelize = require("./sequelize.js");

const Movie = require("./models/movie");
const CrewMember = require("./models/crewMember");

Movie.hasMany(CrewMember, { as: "CrewMembers", foreignKey: "movieId" });
CrewMember.belongsTo(Movie, { foreignKey: "movieId" })

// Express middleware
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

// Kickstart the Express aplication
app.listen(port, () => {
    console.log("The server is running on http://localhost:" + port);
});

// Create a middleware to handle 500 status errors.
app.use((err, req, res, next) => {
    console.error("[ERROR]:" + err);
    res.status(500).json({ message: "500 - Server Error" });
});

app.get('/sync', async (req, res) => {
    try {
        await sequelize.sync({ force: true })
        res.status(201).json({ message: 'table created' })
    } catch {
        console.warn(err);
        res.status(500).json({ message: 'some error occured' })
    }
})

//utils functions
const sortMovies = (a, b) => {
    var nameA = a.title.toUpperCase(); // ignore upper and lowercase
    var nameB = b.title.toUpperCase(); // ignore upper and lowercase
    if (nameA <= nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }

    // names must be equal
    return 0;
}

//api calls for the primary entity
app.get('/movies', async (req, res) => {
    try {
        const movies = await Movie.findAll()
        res.status(200).json(movies)
    } catch {
        console.warn(err);
        res.status(500).json({ message: 'some error occured' })
    }
})

app.get('/moviesSorted', async (req, res) => {
    try {
        const movies = await Movie.findAll()
        movies.sort(sortMovies)
        res.status(200).json(movies)
    } catch {
        console.warn(err);
        res.status(500).json({ message: 'some error occured' })
    }
})

app.post('/movies', async (req, res, next) => {
    try {

        await Movie.create(req.body)
        res.status(201).json({ message: 'created' })
    } catch {
        console.warn(err);
        res.status(500).json({ message: 'some error occured' })
    }
})

app.put('/movies/:mid', async (req, res) => {
    try {
        const movie = await Movie.findByPk(req.params.mid)
        if (movie) {
            await movie.update(req.body, { fields: ['title', 'category', 'releaseDate'] })
            res.status(202).json({ message: "accepted" })

        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})


app.delete('/movies/:mid', async (req, res) => {
    try {
        const movie = await Movie.findByPk(req.params.mid)
        if (movie) {
            await movie.destroy()
            res.status(202).json({ message: "accepted" })

        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})

app.get('/movies/:mid', async (req, res) => {
    try {
        const movie = await Movie.findByPk(req.params.mid)
        if (movie) {
            res.status(200).json(movie)

        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})



//api calls for the secondary entity
app.get('/crew', async (req, res) => {
    try {
        const crewMember = await CrewMember.findAll()
        //books.sort(sortBooks)
        res.status(200).json(crewMember)
    } catch {
        console.warn(err);
        res.status(500).json({ message: 'some error occured' })
    }
})

app.post('/crew', async (req, res, next) => {
    try {

        await CrewMember.create(req.body)
        res.status(201).json({ message: 'created' })
    } catch {
        console.warn(err);
        res.status(500).json({ message: 'some error occured' })
    }
})

app.put('/crew/:cid', async (req, res) => {
    try {
        const crew = await CrewMember.findByPk(req.params.cid)
        if (crew) {
            await crew.update(req.body, { fields: ['name', 'role', 'movieId'] })
            res.status(202).json({ message: "accepted" })

        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})


app.delete('/crew/:cid', async (req, res) => {
    try {
        const crew = await CrewMember.findByPk(req.params.cid)
        if (crew) {
            await crew.destroy()
            res.status(202).json({ message: "accepted" })

        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})


app.get('/crew/:cid', async (req, res) => {
    try {
        const crew = await CrewMember.findByPk(req.params.cid)
        if (crew) {
            res.status(200).json(crew)

        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})

//api calls that modify secondary entities based on their foreign key
app.get('/movies/:mid/crew', async (req, res) => {
    try {
        const movie = await Movie.findByPk(req.params.mid)
        if (movie) {
            const crew = await movie.getCrewMembers()
            res.status(200).json(crew)
        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})

app.post('/movies/:mid/crew', async (req, res) => {
    try {
        const movie = await Movie.findByPk(req.params.mid)
        if (movie) {
            const crewMember = req.body
            crewMember.movieId = movie.id
            await CrewMember.create(crewMember)
            res.status(200).json({ message: 'created' })
        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})

app.put('/movies/:mid/crew/:cid', async (req, res) => {
    try {
        const movie = await Movie.findByPk(req.params.mid)
        if (movie) {
            const crewMembers = await movie.getCrewMembers({ id: req.params.cid })
            var crew = null
            for (var i = 0; i < crewMembers.length; i++) {
                if (crewMembers[i].id == req.params.cid) {
                    crew = crewMembers[i];
                }
            }
            if (crew) {
                crew.name = req.body.name;
                crew.role = req.body.role;
                await crew.save();
                res.status(202).json({ message: "accepted" })
            } else {
                res.status(404).json({ message: "not found" })
            }
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})

app.delete('/movies/:mid/crew/:cid', async (req, res) => {
    try {
        const movie = await Movie.findByPk(req.params.mid)
        if (movie) {
            const crewMembers = await movie.getCrewMembers({ id: req.params.cid })
            var crew = null
            for (var i = 0; i < crewMembers.length; i++) {
                if (crewMembers[i].id == req.params.cid) {
                    crew = crewMembers[i];
                }
            }
            if (crew) {
                await crew.destroy()
                res.status(202).json({ message: "accepted" })
            } else {
                res.status(404).json({ message: "not found" })
            }
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})

// filtering movies - return all the movies that came out after a certain date and belong to a certain category
app.get('/actionPast2012', async (req, res) => {


    const referenceDate = new Date(2012, 1, 1);
    try {
        const movies = await Movie.findAll(
            {
                where: {
                    category: 'ROMANTIC',
                    releaseDate: {
                        [Op.gt]: referenceDate
                    }
                }
            }
        )
        movies.sort(sortMovies)
        res.status(200).json(movies)
    } catch {
        console.warn(err);
        res.status(500).json({ message: 'some error occured' })
    }
})

app.get('/moviesFilter/:mcategory/:myear', async (req, res) => {

    const referenceDate = new Date(`${req.params.myear}-01-01`);
    try {
        const movies = await Movie.findAll(
            {
                where: {
                    category: req.params.mcategory,
                    releaseDate: {
                        [Op.gt]: referenceDate
                    }
                }
            }
        )
        movies.sort(sortMovies)
        res.status(200).json(movies)
    } catch {
        console.warn(err);
        res.status(500).json({ message: 'some error occured' })
    }
})