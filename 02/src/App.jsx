import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>My Pokémon Team</h1>

      {/*First list display*/}

      {/*<ul>
        <li>
          Pikachu
        </li>
        <li>
          Charmander
        </li>
        <li>
          Snivy
        </li>
      </ul>*/}

      {/* Improved item display */}
      
      {/*
      <ul>
        <li>
          <div>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" alt="Pikachu" className="pokemon-image"/>
            <h2>Pikachu</h2>
          </div>
        </li>
      </ul>
      */}
    </>
  )
}

export default App
