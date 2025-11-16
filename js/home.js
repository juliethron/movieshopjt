const container = document.querySelector("#movie-list");
const genreFilter = document.querySelector("#genre-filter");
const API_URL = "https://api.noroff.dev/api/v1/square-eyes";

let allMovies = [];

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
    const image = movie.image?.url || "https://via.placeholder.com/300x450?text=Image+Unavailable";
    
    container.innerHTML += `
      <div class="movie-card">
        <img src="${image}" alt="${movie.title}" />

        <div class="movie-info">
          <h3>${movie.title}</h3>
          <p>${movie.genre || "Unknown genre"}</p>
          <p>$${(movie.price / 5).toFixed(2)}</p> <!-- adjusted price -->

          <a href="./product/index.html?id=${movie.id}" class="btn">
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
