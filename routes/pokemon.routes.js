module.exports = app => {
    const pokemon = require('../controllers/pokemon.controllers.js')
  
    var router = require("express").Router();

    router.get("/", pokemon.findAll);
    router.get("/:pokemonName", pokemon.findPokemon);
    
    app.use('/api/pokemons', router);
  };