import movies from "./movies.js";

const input = document.getElementById("input");
const optionall = document.getElementById("optionall");
const optionsort = document.getElementById("optionsort");
const moviescontainer = document.getElementById("moviescontainer");

// Фильтруем корректные фильмы
const validMovies = movies.filter(movie => movie.Title && typeof movie.Title === "string");
console.log(`Valid movies count: ${validMovies.length}, Total movies: ${movies.length}`);

// Функция генерации карточек фильмов
function generateMovies(filteredMovies) {
    moviescontainer.innerHTML = ""; // Очищаем контейнер

    filteredMovies.forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="img/movie.png" alt="">
            <div class="card-content">
                <div class="card-title">${movie.Title}</div>
                <div class="card-details">
                    <span>Rating: ${movie.imdb_rating}</span>
                    <span>Year: ${movie.movie_year}</span>
                    <span>Runtime: ${movie.runtime} mins</span>
                    <span class="card-category">${movie.Categories}</span>
                </div>
                <button onclick="alert('${movie.summary}')">More info</button>
            </div>
        `;
        moviescontainer.appendChild(card);
    });
}

// Функция для поиска, фильтрации и сортировки фильмов
// Функция для поиска, фильтрации и сортировки фильмов
// Функция для поиска, фильтрации и сортировки фильмов
function searchMovies() {
    const searchValue = input.value.toLowerCase();
    let filteredMovies = validMovies.filter(movie =>
        movie.Title.toLowerCase().includes(searchValue)
    );

    // Фильтрация по жанру
    const selectedGenre = optionall.value;
    if (selectedGenre !== "all") {
        filteredMovies = filteredMovies.filter(movie =>
            movie.Categories && movie.Categories.toLowerCase().includes(selectedGenre.toLowerCase())
        );
    }

    // Сортировка
    const sortValue = optionsort.value;
    if (sortValue === "A-Z") {
        filteredMovies.sort((a, b) => a.Title.localeCompare(b.Title));
    } else if (sortValue === "Z-A") {
        filteredMovies.sort((a, b) => b.Title.localeCompare(a.Title));
    } else if (sortValue === "10-1") {
        filteredMovies.sort((a, b) => b.imdb_rating - a.imdb_rating);
    } else if (sortValue === "1-10") {
        filteredMovies.sort((a, b) => a.imdb_rating - b.imdb_rating);
    } else if (sortValue === "Max-year 2018-2000") {
        filteredMovies.sort((a, b) => b.movie_year - a.movie_year);
    } else if (sortValue === "Min-year 2000-2018") {
        filteredMovies.sort((a, b) => a.movie_year - b.movie_year);
    }

    generateMovies(filteredMovies);
}

generateMovies(validMovies);

// Обработчики событий
input.addEventListener("input", searchMovies);
optionall.addEventListener("change", searchMovies);
optionsort.addEventListener("change", searchMovies);