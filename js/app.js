const poke_container = document.querySelector(".poke-container");
const search = document.querySelector(".search");
const searchBtn = document.querySelector(".searchBtn");
const searchInput = document.querySelector(".searchInput");

const pokemon_count = 151;

const bg_color = {
  grass: "#88D369",
  fire: "#FF603F",
  water: "#3399FF",
  bug: "#AABB22",
  normal: "#AAAA99",
  flying: "#9AA8FA",
  poison: "#B76EA4",
  electric: "#FFD34E",
  ground: "#E2C56A",
  fairy: "#F1A8EC",
  psychic: "#FF6EA4",
  fighting: "#C56E5C",
  rock: "#C5B679",
  dragon: "#7766EE",
  ice: "#66CCFF",
};

searchBtn.addEventListener("click", function () {
  search.classList.toggle("active");
});

searchInput.addEventListener("input", function (e) {
  // console.log(searchInput.value)
  const searchValue = searchInput.value.toLocaleLowerCase();
  const pokemonNames = document.querySelectorAll(".poke-name");

  pokemonNames.forEach((pokemonName) => {
    if (pokemonName.innerHTML.toLocaleLowerCase().includes(searchValue)) {
      pokemonName.parentElement.parentElement.style.display = "block";
    } else {
      pokemonName.parentElement.parentElement.style.display = "none";
    }
  });
  // ! İD İLE ARANMAK İSTERSE
  // const searchValueid = searchInput.value;
  // const pokemonNamesId = document.querySelectorAll(".poke-id");

  // pokemonNamesId.forEach((pokemonId) => {
  //   if (pokemonId.innerHTML.toLocaleLowerCase().includes(searchValueid)) {
  //     pokemonId.parentElement.parentElement.style.display = "block";
  //   } else {
  //     pokemonId.parentElement.parentElement.style.display = "none";
  //   }
  // });
});

const fetchPokemons = async () => {
  for (let i = 1; i < pokemon_count; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data);
  createPokemonCard(data);
};

const createPokemonCard = (pokemon) => {
  const pokemonDiv = document.createElement("div");
  pokemonDiv.classList.add("pokemon");

  const pokemonId = pokemon.id.toString().padStart(3, "0");
  const pokemonName = pokemon.name.toString();
  const pokemonWeight = pokemon.weight.toString();
  const pokemonType = pokemon.types[0].type.name.toString();
  const pokemonExp = pokemon.base_experience.toString();
  const pokemonBg = bg_color[pokemonType];
  pokemonDiv.style.backgroundColor = `${pokemonBg}`;
  const pokemonDivInnerHTML = `<div class="image-container">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"
            alt="First_Pokemon"
          />
        </div>
        <div class="poke-info">
          <span class="poke-id">#${pokemonId}</span>
          <h3 class="poke-name">${pokemonName}</h3>
          <div class="small">
            <small class="poke-exp">
              <i class="fa-solid fa-flask"> ${pokemonExp} EXP</i>
            </small>
            <small class="poke-weight">
              <i class="fa-solid fa-flask"> ${pokemonWeight} KG</i>
            </small>
          </div>
          <div class="poke-type">
            <i class="fa-brands fa-uncharted"> ${pokemonType}</i>
          </div>
        </div>`;

  pokemonDiv.innerHTML = pokemonDivInnerHTML;
  poke_container.appendChild(pokemonDiv);
};
fetchPokemons();
