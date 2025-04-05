import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [play, setPlay] = useState(false);
  const [lastScore, setLastScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const storedHighScore = Number(localStorage.getItem('highScore'));

    if (storedHighScore === null) {
      localStorage.setItem('highScore', '0');
      setHighScore(0);
      return;
    }

    if (lastScore > storedHighScore) {
      localStorage.setItem('highScore', lastScore.toString());
      setHighScore(lastScore);
    } else {
      setHighScore(storedHighScore);
    }

  }, [lastScore]);

  function handlePlay() {
    setPlay(true);
  }

  return (
    <>
      {play ? (
        <PokemonQuiz setPlay={setPlay} setLastScore={setLastScore} />
        ) : (
        <div>
          <h1 className='title'>Guess that Pokémon!</h1>
          <div className='score-container'>
            <div>
              <h2>High Score</h2>
              <h2>{highScore}</h2>
            </div>
            <div>
              <h2>Last Score</h2>
              <h2>{lastScore}</h2>
            </div>
          </div>
          <button className='play-button' onClick={handlePlay}>Play!</button>
        </div>
      )}
    </>
  )
}

// Quiz display and functionality

function PokemonQuiz(props) {
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(60);
  const [skip, setSkip] = useState(false);

  const setPlay = props['setPlay'];
  const setLastScore = props['setLastScore'];

  const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

  const correctAnswer = {
    id: 'correct',
    name: 'correct',
    imageUrl: '/correct.png'
  }

  useEffect(() => {
    let intervalId;

    changePokemon();

    intervalId = setInterval(() => {
      setTime(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setTimeout(
      checkAnswer,
      100
    );
  }, [answer]);

  useEffect(() => {
    if (time <= 0) {
      setLastScore(score);
      setPlay(false);
    }
  }, [time]);

  function checkAnswer() {
    if (!currentPokemon || currentPokemon.id === 'correct' || skip) {
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
    setSkip(true);

    setAnswer(currentPokemon.name.slice(0, 1).toUpperCase() + currentPokemon.name.slice(1));

    setTimeout(
      () => {
        setScore(score - 1);
        changePokemon();
      },
      1000
    );
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
        setSkip(false);
      });
  }

  function getHint() {
    if (currentPokemon) {
      setAnswer(currentPokemon.name.slice(0, 1).toUpperCase() + currentPokemon.name.slice(1, 3));
    }
  }

  return (
    <>
      <h2 className='time' >Time: {time}</h2>
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