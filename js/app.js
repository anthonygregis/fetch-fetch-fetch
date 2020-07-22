const pokemonGeneration = "https://pokeapi.co/api/v2/pokemon/"

const displayPokemon = (pokemon) => {
    fetch(pokemon.url).then(response => {
        if (response.ok) {
            return response.json()
        }
    })
        .then(pokemonData => {
            let pokeCard = document.createElement('div').classList.add('card')

            let profilePic = pokemonData.sprites.front_default
            let pokeName = pokemonData.name
            let pokeTypes = ""
            let pokeHeight = pokemonData.height
            let pokeWeight = pokemonData.weight
            let pokeMoves = "Moves: "

            let pokeMoveLimit = 4

            pokemonData.types.forEach(typeObject => {
                pokeTypes += typeObject.type.name + " "
            })

            for(let i = 0; i < pokeMoveLimit; i++) {
                let pokeMove = pokemonData.moves[i].move

                if (i < 3) {
                    pokeMoves += pokeMove.name + ", "
                } else {
                    pokeMoves += pokeMove.name
                }

            }

            console.log(pokeMoves)
        })
}

fetch(pokemonGeneration).then(response => {
        if (response.ok) {
            return response.json()
        }
    })
    .then(responseData => {
        const pokemonResults = responseData.results
        pokemonResults.forEach(displayPokemon)
    })