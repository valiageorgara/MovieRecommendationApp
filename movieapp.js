const movieURL = "http://62.217.127.19:8010/movie/";
const ratingsURL = "http://62.217.127.19:8010/ratings";

const form = document.getElementById("form");
const movieName = document.getElementById("movieName");
const client = {}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  var bodyJSON = JSON.stringify({
    keyword: movieName.value,
  });
  fetchJSON(url=movieURL,body=bodyJSON).then(movies => {
    showMovies(movies); 
  });
});

