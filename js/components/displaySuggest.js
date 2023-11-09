/*
import { randomArray } from "./randomFunc.js";
import { fetchApiSquareEyes } from "../api/squareeyesData.js";

export function randomMovies(allMovies) {
  const suggestionContainer = document.getElementById("suggestionContainer");
  // Create 4 random movies, for suggestion section
  if (allMovies) {
    randomArray(allMovies);
    const randomObjects = allMovies.slice(0, 4);
    console.log(randomObjects);
    for (let rM = 0; rM < randomObjects.length; rM++) {
      console.log(randomObjects[rM].title);
      suggestionContainer.innerHTML += `
      <a href="/products/movie_details.html?id=${allMovies[rM].id}">
        <figure class="moviephotosimg">
          <img
            src="${allMovies[rM].image}"
            alt="${allMovies[rM].description}"
          />
        </figure>
      </a>;
      `;
    }
  } else {
    console.log("AllMovies is undefined. Something went wrong.");
  }
}

randomMovies;

*/