/*
// files for all movies page
import { fetchApiSquareEyes } from "./api/squareeyesData.js";
import { detailsAllMovies } from "./components/displayAllMovies.js";

//files for selected movie pages
import { fetchApiSelectedMovie } from "./api/selectedMovieData.js";
import { detailsSelectedMovie } from "./components/displayMovieInfo.js";

// Suggested movies
import { randomMovies } from "./components/displaySuggest.js";

// Sign in out page
import { goto_your_profile } from "./components/signInOut.js";
// Contact us page

*/

const allMoviesContainer = document.getElementById("all_movies_section");

const apiSquareEyes = `https://api.noroff.dev/api/v1/square-eyes`;

let allMovies;

async function fetchApiSquareEyes() {
  try {
    const response = await fetch(apiSquareEyes);
    if (!response.ok) {
      throw new Error(`API request failed with status:  ${response.status}`);
    }
    allMovies = await response.json();
    //console.log(allMovies);
    renderMovies(allMovies);
    displayMovies(allMovies);
    displayPopularMovie(allMovies);
  } catch (error) {
    console.log(error);
  }
}

fetchApiSquareEyes();
/* ///////////////////////////////
Display all movies
////////////////////////////////*/ 
//console.log(allMovies);
async function renderMovies(allMovies) {
  allMoviesContainer.innerHTML = "";
  for (let i = 0; i < allMovies.length; i++) {
    //console.log(allMovies[i].title);

    allMoviesContainer.innerHTML += `
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
/* ///////////////////////////
    Most popular movie 
    ////////////////////////////*/
    function displayPopularMovie(allMovies) {
        const mostPopularNow = document.getElementById("mostPopularNow");
    
        mostPopularNow.innerHTML = "";
        // Find the movie with the highest rating
        const highestRatedMovie = allMovies.reduce((prev, current) => {
          return (prev.rating > current.rating) ? prev : current;
        });
    
        console.log(highestRatedMovie.title);
        mostPopularNow.innerHTML = `
          <div class="section5_image">
              <img
                  src="${highestRatedMovie.image}"
                  class="mostPopular"
                  alt="${highestRatedMovie.description}"
              />
          </div>
          <div class="background_gradient"></div>
          <div class="section5_info">
              <h2 class="AbrilFatface">Most popular right now:</h2>
              <h3>${highestRatedMovie.title}</h3>
              <a href="/products/movie_details.html?id=${highestRatedMovie.id}">More info</a>
          </div>
        `;
      }
      
    

/* ///////////////////////////
Suggested movies 
////////////////////////////*/

// function for random picking
function randomArray(array) {
  for (let r = array.length - 1; r > 0; r--) {
    const random = Math.floor(Math.random() * (r + 1));
    [array[r], array[random]] = [array[random], array[r]];
  }
}

async function displayMovies(allMovies) {
  // forloop for suggested movies
  if (allMovies) {
    randomArray(allMovies);
    const randomObjects = allMovies.slice(0, 4);
    const suggestionContainer = document.getElementById("suggestionContainer");
    suggestionContainer.innerHTML = "";
    //console.log(randomObjects);
    for (let rM = 0; rM < randomObjects.length; rM++) {
      //console.log(randomObjects[rM].title);
      // Display random movie cards
      const aElement = document.createElement("a");
      const movieImage = document.createElement("img");
      aElement.href = `/products/movie_products.html?id=${randomObjects[rM].id}`;
      movieImage.src = `${randomObjects[rM].image}`;
      movieImage.alt = `${randomObjects[rM].title}`;
      movieImage.title = `${randomObjects[rM].title}`;

      aElement.appendChild(movieImage);
      suggestionContainer.appendChild(aElement);
    }
  } else {
    console.log("allMovies is undefined. Something went wrong.");
  }
}

/*
//////////////////////////////
    Display selected movie 
////////////////////////////*/
const head = document.querySelector("head");
const movieDetailContainer = document.getElementById("movieDetailContainer");

// Finds the id in the queryString
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const urlId = `https://api.noroff.dev/api/v1/square-eyes/` + id;

let movieInfo;
async function fetchApiSelectedMovie() {
  try {
    const responseSM = await fetch(urlId);
    // If the url is wrong, then this (throw new Error) will make an error
    if (!responseSM.ok) {
      throw new Error(`API request failed with status: ` + responseSM.status);
    }
    const jsonSM = await responseSM.json();
    movieInfo = jsonSM;
    displaySelectedMovie(movieInfo);
  } catch (error) {
    console.log("Error selectedMovie: " + error);
  }
}
fetchApiSelectedMovie();

function displaySelectedMovie(movieInfo) {
  document.title = "SquareEyes | " + `${movieInfo.title}`;
  //console.log(movieInfo.title);
  movieDetailContainer.innerHTML = `<section class="content_wrap" id="movieImage">
  <img class="movieImage" src="${movieInfo.image}"/>
  <div class="headerpic_gradient">
      <div class="content_wrap ">
          <div class="movie_info">
              <div class="movie_info_top">
                  <h1>${movieInfo.title}</h1>
                  <div class="imdb_rating_mobile">
                      <span>IMDb RATING</span>
                      <span>${movieInfo.rating}</span>
                  </div>
              </div>
              <p class="movie_descrition">${movieInfo.description}</p>
              <p class="movie_price">${movieInfo.price} kr</p>
              <div class="button_icon_area">
                  <div class="watchButtonArea"></div>
                  <div class="icons">
                      <input type="checkbox" name="favorites1" id="favorites1">
                      <label for="favorites1" class="icon_heart" aria-label="Add to your favorites"></label>
                      <input type="checkbox" name="your_list1" id="your_list1">
                      <label for="your_list1" class="icon_pluss" aria-label="Add to your list"></label>
                  </div>
              </div>
              <input type="checkbox" name="shopping_bag_button1" id="shopping_bag_button1">
              <label for="shopping_bag_button1" class="shopping_bag_button"
                  aria-label="Add to shopping bag"><span class="shopping_bag_icon"></span></label>
              <div class="shoppingbag_options">
                  <a href="/movie-pages/all-movies.html"><span class="leftarrow"></span>Continue
                          shopping</a>
                  <a href="/checkout.html">Go to shopping bag<span
                              class="rightarrow"></span></a>
              </div>
          </div>
      </div>
  </div>
</section>
<section class="movie_details_section content_wrap">
  <h2>Movie details:</h2>
  <div class="movie_details">
      <div class="details_more">
          <div class="movie_details_more">
              <p class="what">Title</p>
              <p class="it_is">${movieInfo.title}</p>
          </div>    
          <div class="movie_details_more">
              <p class="what">Genre</p>
              <p class="it_is">${movieInfo.genre}</p>
          </div>
          <div class="movie_details_more">
              <p class="what">Released</p>
              <p class="it_is">${movieInfo.released}</p>
          </div>
      </div>
      <div class="imdb_rating">
          <span>IMDb RATING</span>
          <span>${movieInfo.rating}</span>
      </div>
  </div>
</section>`;
}

/* /////////////////////////////////////
Shopping bag 
//////////////////////////////////////*/
const shoppingBagContainer = document.getElementById("shoppingBagContainer");

const inShopBag = getExistingFavs();

allMovies.forEach((movie) => {
  let colorClass = "gray";

  // check through favs array
  // does the product id exist in the favs array
  const doesObjectExist = inShopBag.find(function (shopBag) {
      console.log(shopBag);

      return parseInt(shopBag.id) === movie.id;
  });

  console.log(doesObjectExist);

  // if is in the array, change the style of the i element
  if (doesObjectExist) {
      colorClass = "yellow";
  }
  `<div class="product">
//    <h4>${product.name}</h4>
//  <i class="${colorClass} fa-heart" data-id="${product.id}" data-name="${product.name}"></i>
//   </div>` 
  shoppingBagContainer.innerHTML += 
                              `<div class="chosen_moviecover">
                              <a href="/products/movie_details.html?="${allMovies.title}"
                                ><img
                                  class="batman_cover"
                                  src="/images/Movie_batman.jpeg"
                                  alt="Batman movie cover"
                              /></a>
                            </div>
                            <div class="movie_details">
                              <a href="/movie-pages/all-movies.html">
                                <h3>The Batman</h3>
                              </a>
                              <h4 class="movie_details_h4">34kr</h4>
                              <div class="details_more">
                                <div class="movie_details_more">
                                  <p class="what">Age restriction</p>
                                  <p class="it_is">12</p>
                                </div>
                                <div class="movie_details_more">
                                  <p class="what">Play time</p>
                                  <p class="it_is">2h 56m</p>
                                </div>
                              </div>
                            </div>
                            <div class="divtrash">
                              <figure
                                class="trashcan"
                                aria-label="Remove movie from list"
                              ></figure>
                            </div>`;
});

const shopping_bag_button = document.querySelectorAll(".shopping_bag_button");

shopping_bag_button.forEach((button) => {
    button.addEventListener("click", handleClick);
});

function handleClick() {
    this.classList.toggle("gray");
    this.classList.toggle("yellow");
    
    const id = this.dataset.id;
    const name = this.dataset.name;

    const currentFavs = getExistingFavs();

    const productExists = currentFavs.find(function (fav) {
        return fav.id === id;
    });

    if (productExists === undefined) {
        const product = { id: id, name: name };
        currentFavs.push(product);
        saveFavs(currentFavs);
    } else {
        const newFavs = currentFavs.filter((fav) => fav.id !== id);
        saveFavs(newFavs);
    }
}