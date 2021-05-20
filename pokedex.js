function loadPokemons(){
    for (let i = 0; i < 50; i++) {
        document.getElementById("pokeContent").innerHTML+=`
        <div onclick="loadPokemon(${i})">
            <object type="text/html" data="pokemon.html" ></object>
        </div>`;
    }
}