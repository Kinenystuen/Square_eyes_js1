import { fetchApiSquareEyes } from "../api/squareeyesData.js";

const all_movies_section = document.getElementById("all_movies_section");

export function detailsAllMovies(allMovies) {
  all_movies_section.innerHTML = ""; //removed the loader div
  for (let i = 0; i < allMovies.length; i++) {
    //console.log(allMovies[i].title);

    all_movies_section.innerHTML += `
      <div class="movie_card">
          <div class="movie_cover">
              <a href="/products/movie_details.html?id=${allMovies[i].id}">
                  <img
                   class="cover_img"
                  src="${allMovies[i].image}"
                   />
              </a>
          </div>
          <div class="movie_info">
              <h2><a href="/products/movie_details.html?id=${allMovies[i].id}">${allMovies[i].title}</a></h2>
              <p class="movie_descrition">
                ${allMovies[i].description}
              </p>
              <p class="movie_price">${allMovies[i].price} kr</p>
              <div class="icons">
                
              </div>
              <div class="buttons">
                <a
                  href="/products/movie_details.html?id=${allMovies[i].id}"
                  class="more_info_button"
                  >More info</a
                >
              </div>
          </div>
      </div>
      
      `;
  }
}
