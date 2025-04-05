import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  /*
  let myPokemon = [
    {name: "Happy", id: "6"},
    {name: "Zappy", id: "25"},
    {name: "Frederick", id: "1"}
  ];
  */

  return (
    <>
      <h1>My Pokémon Team</h1>

      <ul>
        <li>
          <div>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" alt="Pikachu" className="pokemon-image"/>
            <h2>Pikachu</h2>
          </div>

          {/* Replacement for pokemon card */}
          {/* <PokemonCard name="Pikachu" id="25" /> */}
        </li>
      </ul>

      {/* New List Display with Map */}

      {/*
      <ul>
        {myPokemon.map((pokemon) => {
          return (
            <li>
              <PokemonCard name={pokemon.name} id={pokemon.id} />
            </li>
          )
        })}
      </ul>
      */}
    </>
  )
}

//Create PokemonCard custom component
//Add your own styling to the pokemon card!

//function PokemonCard(props) {
//  let myName = props['name'];
//  let myId = props['id'];

//  let imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${myId}.png`

//  return (
//    <div className="pokemon-card">
//      <div className="pokemon-image-container">
//        <img src={imageUrl} alt={myName} className="pokemon-image" />
//      </div>
//      <h2 className="pokemon-name">{myName}</h2>
//    </div>
//  );
//};

export default App
