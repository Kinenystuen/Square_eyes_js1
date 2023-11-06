import { detailsSelectedMovie } from "../components/displayMovieInfo.js";

let movieDetailContainer = document.getElementById("movieDetailContainer");

// Finds the id in the queryString
const queryString = document.location.search;
const params = new URLSearchParams(queryString);

const id = params.get("id");

const urlId = `https://api.noroff.dev/api/v1/square-eyes/` + id;

//console.log(url);

export async function fetchApiSelectedMovie() {
  try {
    const responseSM = await fetch(urlId);
    // If the url is wrong, then this (throw new Error) will make an error
    if (!responseSM.ok) {
      throw new Error(`API request failed with status: ` + responseSM.status);
    }
    const jsonSM = await responseSM.json();
    const movieInfo = jsonSM;
    //console.log(movieInfo);

    detailsSelectedMovie(movieInfo);
  } catch (error) {
    console.log("This is a error", error);
    //alert("Data not found");
    console.log("Error selectedMovie: " + error);
  }
}
fetchApiSelectedMovie();
