const movieURL = "http://62.217.127.19:8010/movie/";
const ratingsURL = "http://62.217.127.19:8010/ratings";

const form = document.getElementById("form");
const movieName = document.getElementById("movieName");
const client = {};



form.addEventListener("submit", (e) => {
  e.preventDefault();
  var bodyJSON = JSON.stringify({
    keyword: movieName.value,
  });
  let loader = `<div class="loader"></div>`;
  document.getElementById("movies").innerHTML = loader;
  fetchPOSTJSON((url = movieURL), (body = bodyJSON))
    .then((movies) => {
      if (movies.length == 0){

        const movieContainer = document.getElementById("movies");
        movieContainer.innerHTML = `<h1 style="text-align: center ; color: white; padding-top: 30px;">No movies found, search for another term...</h1>`;

      }else {
        showMovies(shuffle(movies).slice(0, 100));
      }
      
    })
    .catch((error) => {
      document.getElementById("movies").innerHTML = `<h1 style="text-align: center ; color: white; padding-top: 30px;">There was an error.. please try again..</h1>`;

      console.error(error);
    });
});
