const sequalize = require('../sequelize')
const { DataTypes } = require('sequelize');


const Movie = sequalize.define('movie', {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3,200]
        }
    },
    category: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['ACTION', 'ROMANTIC', 'ANIMATION']
    },
    releaseDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

module.exports = Movie;
