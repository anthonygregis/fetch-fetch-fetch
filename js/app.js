const pokemonGeneration = "https://pokeapi.co/api/v2/pokemon/"
const container = document.querySelector('.container')

// Function returns the proper classes based on the poke type
const getPokeTypeColor = (pokeTypes) => {
    console.log(pokeTypes)
    if (pokeTypes.includes("fire")) {
        return "btn btn-outline-danger"
    } else if (pokeTypes.includes("grass") || pokeTypes.includes("bug")) {
        return "btn btn-outline-success"
    } else if (pokeTypes.includes("water")) {
        return "btn btn-outline-primary"
    } else if (pokeTypes.includes("poison")) {
        return "btn btn-outline-dark"
    } else if (pokeTypes.includes("normal")) {
        return "btn btn-outline-secondary"
    }
}

// Takes all the information from the pokemon fetch and turns it into an html card that gets added into our base container
const createCard = (pokeName, pokePic, pokeTypes, pokeHeight, pokeWeight, pokeMoves) => {
    let pokeCard = document.createElement('div')
    pokeCard.setAttribute('class', 'card m-2')
    pokeCard.style.width = "18rem"

    const pokeImage = document.createElement('img')
    pokeImage.src = pokePic
    pokeImage.classList.add('card-img-top')
    pokeImage.alt = pokeName

    let pokeCardBody = document.createElement('div')
    pokeCardBody.classList.add('card-body')

    let pokeCardName = document.createElement('h5')
    pokeCardName.classList.add('card-title')
    pokeCardName.textContent = pokeName

    let pokeCardTypes = document.createElement('a')
    pokeCardTypes.setAttribute('class', getPokeTypeColor(pokeTypes))
    pokeCardTypes.textContent = pokeTypes

    let pokeCardList = document.createElement('ul')
    pokeCardList.setAttribute('class','list-group list-group-flush')

    let pokeCardHeight = document.createElement('li')
    pokeCardHeight.classList.add('list-group-item')
    pokeCardHeight.textContent = pokeHeight

    let pokeCardWeight = document.createElement('li')
    pokeCardWeight.classList.add('list-group-item')
    pokeCardWeight.textContent = pokeWeight

    let pokeCardMoves = document.createElement('li')
    pokeCardMoves.classList.add('list-group-item')
    pokeCardMoves.textContent = pokeMoves

    pokeCardBody.append(pokeCardName, pokeCardTypes)
    pokeCardList.append(pokeCardHeight, pokeCardWeight, pokeCardMoves)
    pokeCard.append(pokeImage, pokeCardBody, pokeCardList)

    container.appendChild(pokeCard)
}

// Loops through all the first 20 pokemon to then fetch each ones information and sends it to become a card
const displayPokemon = (pokemon) => {
    fetch(pokemon.url).then(response => {
        if (response.ok) {
            return response.json()
        }
    })
        .then(pokemonData => {
            let profilePic = pokemonData.sprites.front_default
            let pokeName = pokemonData.name
            let pokeNameCapitalized = pokeName.charAt(0).toUpperCase() + pokeName.slice(1)
            let pokeTypes = ""
            let pokeHeight = "Height: " + pokemonData.height
            let pokeWeight = "Weight: " + pokemonData.weight
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

            createCard(pokeNameCapitalized, profilePic, pokeTypes, pokeHeight, pokeWeight, pokeMoves)
        })
}

// Fetches the first 20 pokemon from the PokeApi
fetch(pokemonGeneration).then(response => {
        if (response.ok) {
            return response.json()
        }
    })
    .then(responseData => {
        const pokemonResults = responseData.results
        pokemonResults.forEach(displayPokemon)
    })