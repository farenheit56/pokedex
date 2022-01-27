const axios = require('axios');
/**
* @swagger
* tags:
*   name: Pokemons
*   description: Pokemon retrievals
*/

/**
* @swagger
* /:
*   get:
*       description: Use to request all pokemons
*       tags: [Pokemons]
*       responses: 
            200:
                description: Successfull response
*/

exports.findAll = async (req, res) => {
    try {
        let pokemon = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=5')
        let pokemonList = []

        for (let i = 0; i < pokemon.data.results.length; i++) {
            let pokemonData = await axios.get(pokemon.data.results[i].url)

            pokemon.data.results[i].abilities = pokemonData.data.abilities
            pokemon.data.results[i].moves = pokemonData.data.moves
            pokemon.data.results[i].types = pokemonData.data.types
            pokemon.data.results[i].weight = pokemonData.data.weight
            pokemon.data.results[i].sprites = pokemonData.data.sprites

            pokemonList.push(pokemon.data.results[i])
        }
        
        res.status(200).send(pokemonList)
    } catch (error) {
        res.status(500).send({
            message: error.message || "Hubo un problema consultando los pokemons"
        });
    }
}

/**
* @swagger
* /:pokemonName:
*   get:
*       description: Request a single Pokemon
*       tags: [Pokemons]
*       content: application/json 
*       parameters:
*           name: Pokemon Name
*           required: true
*       responses: 
            200:
                description: A successfull response
*/

exports.findPokemon = async (req,res) => {
    try {
        let pokemonData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.pokemonName}`)

        res.status(200).send(pokemonData.data)
    } catch (error) {
        res.status(500).send({
            message: error.message || "Hubo un problema consultando la información del pokemon"
        });
    }
}