 
const header = document.createElement("h1"); // for title
header.innerHTML = "MyAnimeList";

// to create search box
const searchBox = document.createElement("div");
searchBox.setAttribute("class", "search-box");

searchBox.innerHTML = `<form id="search_form">
<input placeholder="Search Anime..." name="search" id="search" type="text">
<button class=”search-btn” type=”submit”>Search</button> </form>
<h3 id="search-title">Top Anime list</h3>
<div id="output"></div>`;
document.body.append(header, searchBox);

// function for top Anime list
async function topAnime() {
  const response = await fetch(
    `https://api.jikan.moe/v3/top/anime/1/bypopularity`
  );
  const topanime_data = await response.json();
  topanime_data.top.forEach((anime) => createtopAnime(anime));
}
topAnime();

// function to create TopAnime list
// Date format(mm-yyyy)
function createtopAnime(anime) {
  const searchResults = document.createElement("div");
  searchResults.setAttribute("class", "anime-group");
  searchResults.innerHTML = ` 
          <h4>${anime.title}</h4>
      <img src=${anime.image_url} >
      <p>Episodes : ${anime.episodes}</p>
      <p>Start Date: ${anime.start_date} </p> 
      <p>End Date: ${anime.end_date}</p>
      <p>IMDB Rate : ${anime.score}</p>
      <p>Type : ${anime.type}</p>
      `;

  const output = document.querySelector("#output");
  output.append(searchResults);
}

//function to search Anime and fetch API
async function getAnime(event) {
  event.preventDefault();
  const searchValue = document.querySelector("#search").value; // get value from seach box
  const topresults = document.querySelector("#output");
  topresults.innerHTML = " "; // Clear Anime list

  const searchTitle = document.querySelector("#search-title");
  searchTitle.innerHTML = ` ${searchValue}  list`; // title for search results

  const response = await fetch(
    `https://api.jikan.moe/v3/search/anime?q=${searchValue}&page=1`
  );
  const data = await response.json();
  data.results.forEach((anime) => createAnime(anime));
}

// function to create Anime list
function createAnime(anime) {
  const searchResults = document.createElement("div");
  searchResults.setAttribute("class", "anime-group");
  searchResults.innerHTML = ` 
          <h4>${anime.title}</h4>
      <img src=${anime.image_url} >
      <p>Episodes : ${anime.episodes}</p>
      <p>Start Date: ${new Date(anime.start_date).toDateString()} </p>
      <p>End Date: ${new Date(anime.end_date).toDateString()}</p>
      <p>IMDB Rate : ${anime.score}</p>
      <p>Type : ${anime.type}</p>
      `;

  const output = document.querySelector("#output");
  output.append(searchResults);
}

function pageLoad() {
  document.querySelector("#search_form").addEventListener("submit", getAnime);
}
window.addEventListener("load", pageLoad);
