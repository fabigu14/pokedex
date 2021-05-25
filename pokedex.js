let currentPokemon;
let id;
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

async function loadPokemon() {
    for (let i = 0; i < 10; i++) {
        id = i + 1;
        let url = `https://pokeapi.co/api/v2/pokemon/` + id;
        let response = await fetch(url);
        currentPokemon = await response.json();
        console.log(currentPokemon);
        renderPokemon();
        setBgColor();
    }
}

function setBgColor() {
    let pokemonType = currentPokemon['types']['0']['type']['name']
    pokemonTypes.forEach(info => {
        if (pokemonType === info['type']) {
            document.getElementById(`pokemon${id}`).style.backgroundColor = info['color'];
        }
    });
}

function renderPokemon() {
    let pokeContent = document.getElementById('pokeContent');
    pokeContent.innerHTML += getHtml();
    renderName();
    renderImg();
    renderType();
    renderId();
}

function getHtml() {
    let htmlContent = `<a href="http://fabian-gurth.developerakademie.com/pokedex/index.html?id=${id}"><div class="pokemon" id="pokemon${id}">
        <div class="headline">
            <h2 id="pokemonName${id}"></h2>
            <div class="id" id="id${id}"></div>
        </div>

        <div class="basic-info">
            <div class="types" id="types${id}"></div>
            <img class="pokemonImg" id="pokemonImg${id}" src="" alt="img of pokemon">
        </div>
    </div> </a>`;

    return htmlContent;
}

function renderName() {
    let name = currentPokemon['name'];
    document.getElementById(`pokemonName${id}`).innerHTML = name.charAt(0).toUpperCase() + name.slice(1);
}

function renderImg() {

    let img = currentPokemon['sprites']['other']['dream_world']['front_default'];
    document.getElementById(`pokemonImg${id}`).src = img;
}

function renderType() {
    document.getElementById(`types${id}`).innerHTML = ``;
    let types = currentPokemon['types'];
    let type;
    types.forEach(position => {
        type = position['type']['name'];
        document.getElementById(`types${id}`).innerHTML += `<div class="type">${type.charAt(0).toUpperCase() + type.slice(1)}</div>`;
    });
}

function renderId() {
    let pokeId = currentPokemon['id'];
    pokeId = ('000' + pokeId).substr(-3);
    document.getElementById(`id${id}`).innerHTML = `#${pokeId}`;
}






