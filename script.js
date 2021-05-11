let currentPokemon;

async function loadPokemon(){
    let url = 'https://pokeapi.co/api/v2/pokemon/charmander';
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log(currentPokemon);

    renderPokemonInfo();
}

function renderPokemonInfo(){
    
    renderName();
    renderImg();   
    renderType();
    renderId();
    renderAbout();
}

function renderName(){
    let name = currentPokemon['name'];
    document.getElementById('pokemonName').innerHTML = name.charAt(0).toUpperCase() + name.slice(1);
}

function renderImg(){
    let img = currentPokemon['sprites']['front_default'];
    document.getElementById('pokemonImg').src = img;
}

function renderType(){
    document.getElementById('types').innerHTML =``;
    let types = currentPokemon['types'];
    let type;
    types.forEach(position => {
        type = position['type']['name'];
        document.getElementById('types').innerHTML += `<div class="type">${type.charAt(0).toUpperCase() + type.slice(1)}</div>`;
    });
}

function renderId(){
    let id = currentPokemon['id'];
    id = ('000' + id).substr(-3);
    document.getElementById('id').innerHTML = `#${id}`;
}

async function renderAbout(){
    let species = await getSpeciesData(currentPokemon['id']);
    document.getElementById('species').innerHTML = species['genera']['7']['genus'];
    document.getElementById('height').innerHTML = currentPokemon['height'];
    document.getElementById('weight').innerHTML = currentPokemon['weight'];
    document.getElementById('abilities').innerHTML = currentPokemon;

}

async function getSpeciesData(id){
    let urlSpecies = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;
    let responseSpecies = await fetch(urlSpecies);
    let speciesAsJson = await responseSpecies.json();
    return speciesAsJson;
}

//test comment for git