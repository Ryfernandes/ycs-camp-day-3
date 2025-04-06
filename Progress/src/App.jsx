import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [pokemon, setPokemon] = useState({id: "16", name: "Ryan"});
  const [answer, setAnswer] = useState("default");
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(45);

  const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

  function addPokemon() {
    let randomNumber = Math.floor(Math.random() * 1024) + 1;
    let idString = randomNumber.toString();

    let url = baseUrl + idString;

    fetch(url, {method: 'GET'}).then((response) => response.json()).then((data) => {
      setAnswer(data['name']);
    })

    let newPokemon = {id: idString, name: "Enter guess..."};

    setPokemon(newPokemon);
  }

  function checkAnswer() {
    if (guess.toLowerCase() == answer.toLowerCase()) {
      setTimeout(() => {
        alert("Correct!");
        setGuess("");
        setScore(score + 1);
        addPokemon();
      }, 50);
    }
  }

  function changeTimer() {
    setTimeout(() => {
      setTimer(timer - 1);
      if (timer <= 1) {
        setTimeout(() => {
          alert("Game over!");
          location.reload();
        }, 50);
      }
    }, 1000);
  }

  useEffect(checkAnswer, [guess]);

  useEffect(changeTimer, [timer]);

  useEffect(addPokemon, []);

  return (
    <>
      <h1>Time: {timer}</h1>
      <h1>Score: {score}</h1>
      <h1>{guess}</h1>
      <PokemonCard name={pokemon['name']} id={pokemon['id']} guess={guess} setGuess={setGuess} />
      <button onClick={addPokemon}>Skip</button>
    </>
  )
}

function PokemonCard(props) {
  let id = props["id"];
  let name = props["name"];
  let guess = props["guess"];
  let setGuess = props["setGuess"];

  function handleChange(e) {
    setGuess(e.target.value);
  }

  return (
    <div className="pokemon-card">
      <img className="pokemon-image" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}></img>
      <input className="pokemon-input" value={guess} placeholder={name} onInput={handleChange}></input>
    </div>
  );
};

export default App