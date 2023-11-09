/*
import { detailsAllMovies } from "../components/displayAllMovies.js";
import { randomMovies } from "../components/displaySuggest.js";

const url = `https://api.noroff.dev/api/v1/square-eyes`;

export async function fetchApiSquareEyes() {
  try {
    const response = await fetch(url);
    // If the url is wrong, then this (throw new Error) will make an error
    if (!response.ok) {
      throw new Error(`API request failed with status: ` + response.status);
    }
    const json = await response.json();
    // For all movies page
    const allMovies = json;
    console.log(allMovies);

    detailsAllMovies(allMovies);
    randomMovies(allMovies);

    // For suggested movies
  } catch (error) {
    console.log(`Error:` + error);
  }
}
fetchApiSquareEyes();

*/