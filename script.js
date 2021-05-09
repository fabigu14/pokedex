let currentPokemon;

async function loadPokemon(){
    let url = 'https://pokeapi.co/api/v2/pokemon/charmander';
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log(currentPokemon);

    renderPokemonInfo();
}

function renderPokemonInfo(){
    let name = currentPokemon['name'];
    let img = currentPokemon['sprites']['front_default'];
    console.log(img);
    document.getElementById('pokemonName').innerHTML = name;
    document.getElementById('pokemonImg').src = img;
    
}