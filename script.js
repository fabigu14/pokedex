let currentPokemon;
let currentEvolutions;
let currentSpecies;
let infoType = ['about', 'stats', 'evolutions'];
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

/**
 * gets urlParam of frompokedex.html & calls loadPokemon()
 */
function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    loadPokemon(id);
}

/**
 * gets & fetches api url, sets currentPokemon, calls render function
 */
async function loadPokemon(id) {
    let url = 'https://pokeapi.co/api/v2/pokemon/' + id;
    /**
 * gets & fetches api url, sets currentPokemon, calls render function
 */

    /**
     * this line is  for testing
     * let url = 'https://pokeapi.co/api/v2/pokemon/21';
    */

    console.log(url);
    let response = await fetch(url);
    currentPokemon = await response.json();
    currentSpecies = await (await fetch(currentPokemon['species']['url'])).json();
    currentEvolutions = await (await fetch(currentSpecies['evolution_chain']['url'])).json();
    console.log(currentEvolutions);
    setBgColor();
    renderPokemonInfo();
}

/**
 * calls diffrent render functions
 */
function renderPokemonInfo() {

    renderBasicInfo();
    renderAbout();
    renderBaseStats();
    fetchEvolutionData();
    loadArrow();
}

/**
 * loads img of arrow-left, to top left corner
 */
function loadArrow() {
    document.getElementById('navBar').innerHTML = `
            <a href="http://fabiangurth.de/pokedex/pokedex.html">
                <img src="img/arrow-left.ico" alt="arrow-left">
            </a>`
}

/**
 * sets BG-Color of pokemon div
 */
function setBgColor() {
    let pokemonType = currentPokemon['types']['0']['type']['name']
    pokemonTypes.forEach(info => {
        if (pokemonType === info['type']) {
            document.getElementById('pokemon').style.backgroundColor = info['color'];
        }
    });
}

/**
 * calls the renderfunctions for basic info
 */
function renderBasicInfo() {
    renderName();
    renderImg();
    renderType();
    renderId();
}

/**
 * renders name of pokemon
 */
function renderName() {
    let name = currentPokemon['name'];
    document.getElementById('pokemonName').innerHTML = name.charAt(0).toUpperCase() + name.slice(1);
}

/**
 * renders img of pokemon
 */
function renderImg() {

    let img = currentPokemon['sprites']['other']['dream_world']['front_default'];
    document.getElementById('pokemonImg').src = img;
}

/**
 * renders type ofthe pokemon
 */
function renderType() {
    document.getElementById('types').innerHTML = ``;
    let types = currentPokemon['types'];
    let type;
    types.forEach(position => {
        type = position['type']['name'];
        document.getElementById('types').innerHTML += `<div class="type">${type.charAt(0).toUpperCase() + type.slice(1)}</div>`;
    });
}

/**
 * renders id of pokemon
 */
function renderId() {
    let id = currentPokemon['id'];
    id = ('000' + id).substr(-3);
    document.getElementById('id').innerHTML = `#${id}`;
}

/**
 * gets current species & renders info about pokemon
 */
async function renderAbout() {
    let species = await getSpeciesData(currentPokemon['id']);
    document.getElementById('species').innerHTML = species['genera']['7']['genus'];
    document.getElementById('height').innerHTML = `${currentPokemon['height'] / 10} m`;
    document.getElementById('weight').innerHTML = `${currentPokemon['weight'] / 10} kg`;
    renderAbilities();
}

/**
 * gets & fetches api url of currentSpecies, returns currentspecies as Json
 */
async function getSpeciesData(id) {
    let urlSpecies = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;
    let responseSpecies = await fetch(urlSpecies);
    let speciesAsJson = await responseSpecies.json();
    return speciesAsJson;
}

/**
 * renders abilities of pokemon
 */
function renderAbilities() {
    currentPokemon['abilities'].forEach(position => {
        document.getElementById('abilities').innerHTML += `<span>${position['ability']['name']}</span>`;
        if (currentPokemon['abilities'].indexOf(position) + 1 != currentPokemon['abilities'].length) {
            document.getElementById('abilities').innerHTML += `, `;
        }
    });
}

/**
 * renders base stats of pokemon, calls function which draws graphs
 */
function renderBaseStats() {
    currentPokemon['stats'].forEach(position => {
        document.getElementById(position['stat']['name']).innerHTML = `${position['base_stat']}`;
        renderGraphs(position['stat']['name'], position['base_stat']);
    });
}

/**
 * calculates and draws graphs, sets color depending on value
 */
function renderGraphs(name, value) {
    let element = document.getElementById(`${name}-graph`);
    if (value >= 100) {

        element.style.width = `100%`;
        element.style.backgroundColor = '#50cb50';
    }
    else if (value > 50 && value < 100) {
        element.style.width = `${value}%`;
        element.style.backgroundColor = '#50cb50';
    }
    else {
        element.style.width = `${value}%`;
        element.style.backgroundColor = '#fa5e52';
    }
}

/**
 * gets data for evolutions, calls render function or displays message
 */
async function fetchEvolutionData() {

    let names = getNames();
    
    let firstUrl = `https://pokeapi.co/api/v2/pokemon/${names[0]}`;
    let firstPokemon = await (await fetch(firstUrl)).json();
    let secondUrl = `https://pokeapi.co/api/v2/pokemon/${names[1]}`;
    let secondPokemon = await (await fetch(secondUrl)).json();
    if (names.length > 2) {
        let thirdUrl = `https://pokeapi.co/api/v2/pokemon/${names[2]}`;
        let thirdPokemon = await (await fetch(thirdUrl)).json();
        renderTwoEvolutions(firstPokemon, secondPokemon, thirdPokemon);
    }
    else {
        renderOneEvolutions(firstPokemon, secondPokemon);
    }
}

/**
 * gets names of pokemons in evolution-chain
 */
function getNames() {
    let names = [];
    let firstName = currentEvolutions['chain']['species']['name'];
    let secondName = currentEvolutions['chain']['evolves_to']['0']['species']['name'];
    let thirdName;

    try {
        thirdName = currentEvolutions['chain']['evolves_to']['0']['evolves_to']['0']['species']['name'];
        names.push(firstName, secondName, thirdName);
    }
    catch (e) {
        try {
            thirdName = currentEvolutions['chain']['evolves_to']['1']['species']['name'];
            names.push(firstName, secondName, thirdName);
        }
        catch (e) {
            names.push(firstName, secondName);
        }
    }
    
    return names;

}

/**
 * renders evolutions with three pokemon in chain
 */
function renderTwoEvolutions(firstPokemon, secondPokemon, thirdPokemon) {
    let pokemon = [firstPokemon, secondPokemon, thirdPokemon];

    for (let i = 0; i < pokemon.length; i++) {
        const currentPkm = pokemon[i];
        let name = currentPkm['name'];

        /**
    	* following code is checks if a pokemon has two diffrent first evolutions
        */
        let secondName = pokemon[1]['name'];
        let firstName = pokemon[0]['name'];
        document.getElementById(`name${i}`).innerHTML = name.charAt(0).toUpperCase() + name.slice(1)
        document.getElementById(`pokemon${i}`).src = currentPkm['sprites']['other']['dream_world']['front_default'];
        if (checkEvolution()) {
            document.getElementById('secondName').innerHTML = secondName.charAt(0).toUpperCase() + secondName.slice(1);
            document.getElementById(`secondPokemon`).src = pokemon[1]['sprites']['other']['dream_world']['front_default'];
        }
        else {
            document.getElementById('secondName').innerHTML = firstName.charAt(0).toUpperCase() + firstName.slice(1);
            document.getElementById(`secondPokemon`).src = pokemon[0]['sprites']['other']['dream_world']['front_default'];
        }
    }
    renderLvl(pokemon);
}

/**
 * renders evolutions with two pokemon in chain
 */
function renderOneEvolutions(firstPokemon, secondPokemon) {
    let pokemon = [firstPokemon, secondPokemon];
    console.log('two pokemon');
    for (let i = 0; i < pokemon.length; i++) {
        const currentPkm = pokemon[i];
        let name = currentPkm['name'];

        document.getElementById(`name${i}`).innerHTML = name.charAt(0).toUpperCase() + name.slice(1)
        document.getElementById(`pokemon${i}`).src = currentPkm['sprites']['other']['dream_world']['front_default'];
    }
    renderLvl(pokemon);
    hideScndEvolution();
}

function hideScndEvolution(){
    document.getElementById('secondEvolution').style.display ='none';
}

/**
 * checks for next evolution
 */
function checkEvolution() {

    let secondEvolution = currentEvolutions['chain']['evolves_to']['0']['evolves_to'];
    if (secondEvolution.length == 0) {
        return false;
    }

    else {
        return true;
    }
}
/**
 * renders min level for evolution
 */
function renderLvl(pokemon) {
    let evolutionLvl = getLvl(pokemon);
    for (let i = 0; i < evolutionLvl.length; i++) {
        const lvl = evolutionLvl[i];
        if (Number.isInteger(lvl)) {
            document.getElementById(`level${i}`).innerHTML = `Lvl ${lvl}`;
        }
        else {
            document.getElementById(`level${i}`).innerHTML = lvl;
        }
    }
}

/**
 * gets & returns min levels for evolution to happen
 */
function getLvl(pokemon) {
    let pokemonInChain = pokemon;
    let evolutionLvl = [];
    let firstMinLvl = currentEvolutions['chain']['evolves_to']['0']['evolution_details']['0']['min_level'];
    let secondMinLvl;
    if(pokemonInChain.length > 2){
        try {
            secondMinLvl = currentEvolutions['chain']['evolves_to']['0']['evolves_to']['0']['evolution_details']['0']['min_level'];
        }
    
        catch (e) {
            secondMinLvl = currentEvolutions['chain']['evolves_to']['1']['evolution_details']['0']['item']['name'];
        }
        evolutionLvl.push(firstMinLvl, secondMinLvl);
    }
    else{
        evolutionLvl.push(firstMinLvl);
    }
    
    return evolutionLvl;
}

/**
 * changes position of info-table
 */
function changeInfo(id, position) {
    resolveSlideBar(position);

    infoType.forEach(info => {

        if (id == info) {
            
            document.getElementById(info).classList.remove('hide-info');
            document.getElementById(info).classList.add('show-info');  
        }

        else if (id !== info) {
            
            document.getElementById(info).classList.remove('show-info');
            document.getElementById(info).classList.add('hide-info');
        }
        
    });
}

/**
 * slides bar to the right position
 */
function resolveSlideBar(position) {

    if (position === 1) {
        document.getElementById('slideBar').style.marginLeft = '0';
        document.getElementById('slideBar').style.width = '45px';
    }
    if (position === 2) {
        document.getElementById('slideBar').style.marginLeft = '37%';
        document.getElementById('slideBar').style.width = '79px';
    }
    if (position === 3) {
        document.getElementById('slideBar').style.marginLeft = '83%';
        document.getElementById('slideBar').style.width = '66px';
    }
    changeOpacity(position);
}

/**
 * changes opacity of stats that are shown or not shown
 */
function changeOpacity(position) {
    let ids = ['1', '2', '3'];
    ids.forEach(id => {
        if (id == position) {
            document.getElementById(id).classList.remove('opacity');
            document.getElementById(id).classList.add('bold');
        }
        if (id != position) {
            document.getElementById(id).classList.add('opacity');
            document.getElementById(id).classList.remove('bold');
        }
    });
}