// seleccion de elementos
const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-contaienr]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');

// Colores segun el 'tipo' del pokemon
const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#423A3A',
};

// funciones
const searchPokemon = event => {
    event.preventDefault();
    const {value} = event.target.pokemon;
    fetch (`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`) //API
    .then (data => data.json())
    .then(response => renderPokemonData(response))
    .catch(error => renderNotFound())
}

const renderPokemonData = data => {
    const sprite = data.sprites.front_default; //front_default es un url con una img
    const {stats, types} = data;
    
    pokeName.textContent = data.name;
    pokeImg.setAttribute('src', sprite);
    pokeId.textContent = `Nº ${data.id}`;
    setColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
}

//fondos dinamicos
const setColor = types => {
    const colorOne = typeColors[types[0].type.name] // Seleccion de los colores antes establecidos
    const colorTwo = types[1] ? typeColors[types[1].name] : typeColors.default; //en caso de tener dos elementos usar el default
    pokeImg.style.background = `radial-gradient(${colorTwo} 34%, ${colorOne} 34%)`;
    pokeImg.style.backgroundSize = '5px 5px';
}

//color de tipos
const renderPokemonTypes = types => {
    pokeTypes.innerHTML = ''; // borra los datos anteriores
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

//stats de los pokemon
const renderPokemonStats = stats => {
    pokeStats.innerHTML = ''; // borra los datos anteriores
    stats.forEach(stat => {
        const statElement = document.createElement("div")
        const statElementName = document.createElement("div")
        const statElementAmount = document.createElement("div")

        statElement.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement)
    });
}

const renderNotFound = () => {
    pokeName.textContent = 'Pokemon no encontrado';
    pokeImg.setAttribute(alert("intenta de nuevo"));
    pokeImg.style.background = '#fff'
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
}