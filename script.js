let currentPokemon;
let pokemonTypes = [
    {
        "type": "bug",
        "color": "#94BC4A"
    },

    {
        "type": "dark",
        "color": "#736C75"
    },

    {
        "type": "dragon",
        "color": "#6A7BAF"
    },

    {
        "type": "electric",
        "color": "#E5C531"
    },

    {
        "type": "fairy",
        "color": "#E397D1"
    },

    {
        "type": "fighting",
        "color": "#CB5F48"
    },

    {
        "type": "fire",
        "color": "#EA7A3C"
    },

    {
        "type": "flying",
        "color": "#7DA6DE"
    },

    {
        "type": "ghost",
        "color": "#846AB6"
    },

    {
        "type": "grass",
        "color": "#71C558"
    },

    {
        "type": "ground",
        "color": "#CC9F4F"
    },

    {
        "type": "ice",
        "color": "#70CBD4"
    },

    {
        "type": "normal",
        "color": "#AAB09F"
    },

    {
        "type": "poison",
        "color": "#B468B7"
    },

    {
        "type": "psychic",
        "color": "#E5709B"
    },

    {
        "type": "rock",
        "color": "#B2A061"
    },

    {
        "type": "steel",
        "color": "#89A1B0"
    },

    {
        "type": "water",
        "color": "#539AE2"
    }
];

async function loadPokemon(){
    let url = 'https://pokeapi.co/api/v2/pokemon/27';
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log(currentPokemon);
    setBgColor();
    renderPokemonInfo();
}

function renderPokemonInfo(){
    
    renderName();
    renderImg();   
    renderType();
    renderId();
    renderAbout();
}

function setBgColor(){
    let pokemonType = currentPokemon['types']['0']['type']['name']
    pokemonTypes.forEach(info => {
        if(pokemonType === info['type']){
            document.getElementById('pokemon').style.backgroundColor = info['color'];
        }
    });
}

function renderName(){
    let name = currentPokemon['name'];
    document.getElementById('pokemonName').innerHTML = name.charAt(0).toUpperCase() + name.slice(1);
}

function renderImg(){
    
    let img = currentPokemon['sprites']['other']['dream_world']['front_default'];
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
    document.getElementById('height').innerHTML = `${currentPokemon['height'] / 10} m`;
    document.getElementById('weight').innerHTML = `${currentPokemon['weight'] / 10} kg`;
    renderAbilities();
}

async function getSpeciesData(id){
    let urlSpecies = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;
    let responseSpecies = await fetch(urlSpecies);
    let speciesAsJson = await responseSpecies.json();
    return speciesAsJson;
}

function renderAbilities(){
    currentPokemon['abilities'].forEach(position => {
        document.getElementById('abilities').innerHTML += `<span>${position['ability']['name']}</span>`;
        if(currentPokemon['abilities'].indexOf(position) + 1 != currentPokemon['abilities'].length){
            document.getElementById('abilities').innerHTML += `, `;
        }
    });
}

function changeInfo(){
    slideBar();
}

function slideBar(position){

    if(position === 1){
        document.getElementById('slideBar').style.marginLeft = '0';
        document.getElementById('slideBar').style.width = '45px';
    }
    if(position === 2){
        document.getElementById('slideBar').style.marginLeft = '24%';
        document.getElementById('slideBar').style.width = '79px';
    }
    if(position === 3){
        document.getElementById('slideBar').style.marginLeft = '57%';
        document.getElementById('slideBar').style.width = '69px';
    }
    if(position === 4){
        document.getElementById('slideBar').style.marginLeft = '86%';
        document.getElementById('slideBar').style.width = '56px';
    }
    changeOpacity(position);
}

function changeOpacity(position){
    let ids = ['1', '2', '3', '4'];
    ids.forEach(id => {
        if(id == position){
            document.getElementById(id).classList.remove('opacity');
            document.getElementById(id).classList.add('bold');
        }
        if(id != position){
            document.getElementById(id).classList.add('opacity');
            document.getElementById(id).classList.remove('bold');
        }
    });
}