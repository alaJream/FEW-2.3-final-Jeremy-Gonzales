export function fetchCharacter(id) {
    return fetch(`https://swapi.dev/api/people/${id}/`).then((response) => response.json());
}

export function fetchHomeworld(url) {
    return fetch(url).then((response) => response.json());
}

export function fetchFilms(urls) {
    const filmPromises = urls.map((url) => fetch(url).then((response) => response.json()));
    return Promise.all(filmPromises);
}
  