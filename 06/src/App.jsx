import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);

  const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

  const correctAnswer = {
    id: 'correct',
    name: 'correct',
    imageUrl: '../public/correct.png'
  }

  useEffect(() => {
    changePokemon();
  }, []);

  useEffect(() => {
    setTimeout(
      checkAnswer,
      100
    );
  }, [answer]);

  function checkAnswer() {
    if (!currentPokemon || currentPokemon.id === 'correct') {
      return;
    }

    if (answer.toLowerCase() === currentPokemon.name.toLowerCase()) {
      setCurrentPokemon(correctAnswer);

      setTimeout(
        () => {
          setScore(score + 1);
          changePokemon();
        },
        500
      );
    }
  }

  function handleSkip() {
    setScore(score - 1);
    changePokemon();
  }

  function changePokemon() {
    let randomId = Math.floor(Math.random() * 1025 + 1).toString();

    // Get the data for this pokemon from PokeAPI
    let url = baseUrl + randomId;

    fetch(url, {
      method: 'GET'
    }).then((response) => response.json())
      .then((data) => {
        let name = data['name'];
        let imageUrl = data['sprites']['other']['official-artwork']['front_default'];

        let nextPokemon = {
          id: randomId,
          name: name,
          imageUrl: imageUrl
        }

        setCurrentPokemon(nextPokemon);
        setAnswer('');
      });
  }

  function getHint() {
    if (currentPokemon) {
      setAnswer(currentPokemon.name.slice(0, 1).toUpperCase() + currentPokemon.name.slice(1, 3));
    }
  }

  return (
    <>
      <h1 className='title' >Guess that Pokémon!</h1>
      {currentPokemon && (
        <PokemonCard name={currentPokemon.name} url={currentPokemon.imageUrl} answer={answer} setAnswer={setAnswer}/>
      )}
      <div className='bottom-container'>
        <button className='bottom-button' onClick={getHint}>Hint</button>
        <button className='bottom-button' onClick={handleSkip}>Skip (-1)</button>
      </div>
      <h2 className='score'>Score: {score}</h2>
    </>
  )
}

// PokemonCard component

function PokemonCard(props) {
  let myName = props['name'];
  let url = props['url'];
  let answer = props['answer'];
  let setAnswer = props['setAnswer'];

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  return (
    <div className="pokemon-card">
      <div className="pokemon-image-container">
        <img src={url} alt={myName} className = "pokemon-image"/>
      </div>
      <input ref={inputRef} placeholder="Guess!" value={answer} onInput={e => setAnswer(e.target.value)} type="text" className="pokemon-name"></input>
    </div>
  );
};

export default App
