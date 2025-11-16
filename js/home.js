const container = document.querySelector("#movie-list");
const genreFilter = document.querySelector("#genre-filter");
const API_URL = "https://api.noroff.dev/api/v1/square-eyes";

let allMovies = [];


const customImages = {
  "Fast & Furious Presents: Hobbs & Shaw": "img/hobbs-shaw.jpg",
  "Avengers: Endgame": "img/avengers-endgame.jpg",
  "Godzilla: King of the Monsters": "img/godzilla-king-of-the-monsters.jpg"
};

async function fetchProducts() {
  container.innerHTML = `<p class="loading">Loading movies...</p>`;

  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch products.");

    const products = await res.json();

    allMovies = products;
    populateFilter(products);
    displayMovies(products);

  } catch (error) {
    container.innerHTML = `<p class="error">⚠️ ${error.message}</p>`;
  }
}

function populateFilter(movies) {
  const genres = [...new Set(movies.map(movie => movie.genre).filter(Boolean))];

  genres.forEach(genre => {
    const option = document.createElement("option");
    option.value = genre;
    option.textContent = genre;
    genreFilter.appendChild(option);
  });
}

function displayMovies(movies) {
  container.innerHTML = "";

  if (movies.length === 0) {
    container.innerHTML = `<p class="error">No movies found for this genre.</p>`;
    return;
  }

  movies.forEach(movie => {

    
    const cleanedTitle = movie.title.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const defaultPath = `img/${cleanedTitle}.jpg`;

    
    const image = customImages[movie.title] || defaultPath;

    const altText = `Poster for ${movie.title}`;

    container.innerHTML += `
      <div class="movie-card">
        <img src="${image}" alt="${altText}" />

        <div class="movie-info">
          <h3>${movie.title}</h3>
          <p>${movie.genre || "Unknown genre"}</p>
          <p>$${movie.price?.toFixed(2) || "N/A"}</p>

          <a href="product/index.html?id=${movie.id}" class="btn">
            View Details
          </a>
        </div>
      </div>
    `;
  });
}

genreFilter.addEventListener("change", (e) => {
  const filtered = e.target.value
    ? allMovies.filter(movie => movie.genre === e.target.value)
    : allMovies;

  displayMovies(filtered);
});

document.addEventListener("DOMContentLoaded", fetchProducts);
