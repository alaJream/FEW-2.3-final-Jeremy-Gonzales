import React, { useState, useEffect } from 'react';
import { fetchCharacter, fetchHomeworld, fetchFilms } from './api';

function StarWars() {
  const [inputValue, setInputValue] = useState('');
  const [character, setCharacter] = useState(null);
  const [homeworld, setHomeworld] = useState(null);
  const [films, setFilms] = useState([]);
  const [savedCharacters, setSavedCharacters] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const characterData = await fetchCharacter(inputValue);
      setCharacter(characterData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = () => {
    if (character) {
      setSavedCharacters((prevState) => [...prevState, character]);
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (character) {
        try {
          const homeworldData = await fetchHomeworld(character.homeworld);
          setHomeworld(homeworldData);
        } catch (error) {
          console.error(error);
        }
  
        const filmPromises = character.films.map((url) => fetch(url).then((response) => response.json()));
        Promise.all(filmPromises).then((filmData) => setFilms(filmData));
      }
    }
  
    fetchData();
  }, [character]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Search for a Star Wars character:
          <input type="text" value={inputValue} onChange={handleInputChange} />
        </label>
        <button type="submit">Search</button>
      </form>
      {character && (
        <div>
          <h2>{character.name}</h2>
          <ul>
            <li>Height: {character.height}</li>
            <li>Mass: {character.mass}</li>
            <li>Hair Color: {character.hair_color}</li>
            <li>Eye Color: {character.eye_color}</li>
          </ul>
          <h3>Homeworld: {homeworld && homeworld.name}</h3>
          <h3>Films:</h3>
          <ul>
            {films.map((film) => (
              <li key={film.url}>{film.title}</li>
            ))}
          </ul>
          <button onClick={handleSave}>Save Character</button>
        </div>
      )}
      <h2>Saved Characters:</h2>
      <ul>
        {savedCharacters.map((character) => (
          <li key={character.url}>{character.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default StarWars;
