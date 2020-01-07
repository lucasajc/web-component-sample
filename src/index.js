import './components/filmCard/filmCard';

async function getCharacters() {
  const res = await fetch('https://swapi.co/api/films/');
  return await res.json();
}

window.addEventListener('load', async () => {
  const {results} = await getCharacters();

  results.forEach(character => {
    const filmCard = document.createElement('film-card');
    filmCard.content = character;
    document.body.appendChild(filmCard);
  });
});
