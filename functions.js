function showMovies(data) {
  const movieContainer = document.getElementById("movies");
  movieContainer.innerHTML = "";
  data.forEach((jsonObj) => {
    
    const content = `
    <div class="container">
      <div class="card__container">
        <div class="card">
          <div class="card__content">
            <h3 class="card__header">${jsonObj["title"]}</h3>
            <p>${jsonObj["genres"]}</p>
            <div class="rate">
              <input type="radio" id="star10_${jsonObj["movieId"]}" name="rate" onclick=getRate(${jsonObj["movieId"]},5) />
              <label for="star10_${jsonObj["movieId"]}" title="10 stars">10 stars</label>

              <input type="radio" id="star9_${jsonObj["movieId"]}" name="rate" onclick=getRate(${jsonObj["movieId"]},4.5) />
              <label for="star9_${jsonObj["movieId"]}" title="9 stars">9 stars</label>

              <input type="radio" id="star8_${jsonObj["movieId"]}" name="rate" onclick=getRate(${jsonObj["movieId"]},4) />
              <label for="star8_${jsonObj["movieId"]}" title="8 stars">8 stars</label>

              <input type="radio" id="star7_${jsonObj["movieId"]}" name="rate" onclick=getRate(${jsonObj["movieId"]},3.5) />
              <label for="star7_${jsonObj["movieId"]}" title="7 stars">7 stars</label>

              <input type="radio" id="star6_${jsonObj["movieId"]}" name="rate" onclick=getRate(${jsonObj["movieId"]},3) />
              <label for="star6_${jsonObj["movieId"]}" title="6 stars">6 stars</label>

              <input type="radio" id="star5_${jsonObj["movieId"]}" name="rate" onclick=getRate(${jsonObj["movieId"]},2.5) />
              <label for="star5_${jsonObj["movieId"]}" title="5 stars">5 stars</label>

              <input type="radio" id="star4_${jsonObj["movieId"]}" name="rate" onclick=getRate(${jsonObj["movieId"]},2) />
              <label for="star4_${jsonObj["movieId"]}" title="4 stars">4 stars</label>

              <input type="radio" id="star3_${jsonObj["movieId"]}" name="rate"  onclick=getRate(${jsonObj["movieId"]},1.5) />
              <label for="star3_${jsonObj["movieId"]}" title="3 stars">3 stars</label>

              <input type="radio" id="star2_${jsonObj["movieId"]}" name="rate" onclick=getRate(${jsonObj["movieId"]},1) />
              <label for="star2_${jsonObj["movieId"]}" title="2 stars">2 stars</label>

              <input type="radio" id="star1_${jsonObj["movieId"]}" name="rate" onclick=getRate(${jsonObj["movieId"]},0.5) />
              <label for="star1_${jsonObj["movieId"]}" title="1 star">1 star</label>
            </div>
          </div>
        </div>
      </div>
    </div>
      `;
    // Append newly created card element to the container
    movieContainer.innerHTML += content;

  });
}

async function fetchJSON(url,body) {
  const response = await fetch(url,{
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: body 
  });
  const resultJSON = await response.json();
  return resultJSON;
}

async function fetchRatingsJSON(movies) {
  const response = await fetch(ratingsURL,{
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    },
    body: movies // body data type must match "Content-Type" header
  });
  const ratings = await response.json();
  return ratings;
}

function setAttributes(element, attributes) {
  for(var key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function getRate(id,rate) {
  console.log(id,rate);
  client[id]=rate;
}

function recommend(){
  console.log(Object.keys(client));
  console.log("This is the client array: ");
  console.log(client);

  var movieIDs = [];
  var rates = []
  for (const movieID in client) {
    movieIDs.push(parseInt(movieID));
    rates.push(client[movieID]);
  }
  var jsonString = JSON.stringify({
    movieList: movieIDs
  });
  const start = Date.now();
  fetchJSON(url=ratingsURL,body=jsonString).then(movies => {
    console.log(movies);
    transformData(movies,rates,movieIDs,start);
    //pearsonCorrelation(new Array(userRates,TODO), 0, 1)
  });
}

function transformData(allData,userRates,movieIdArray,start){
  const start_edit = Date.now();
  allData.sort(function (a, b) {
    return a.length - b.length;
  });
  var i;
  var allUserData = {}
  
  for(i=0; i<allData.length; i++){
    var j;
    var movieId =  allData[i][0]["movieId"]
    console.log('Checking movie ID ' + movieId)
    var matchUsers = 0;
    for(j=0; j<allData[i].length;j++){
      obj = allData[i][j];

      
      if (Object.keys(allUserData).includes(obj["userId"].toString())) {
         allUserData[obj["userId"].toString()].push({id:obj["movieId"],rating:obj["rating"]});
         if (Math.abs(client[movieId] - obj["rating"]) < 1.1){
          matchUsers++;
        }
        if (matchUsers == 50){
          break;
        }
       } else {
        if (i <= (allData.length/2)) {
          allUserData[obj["userId"].toString()] = [{id:obj["movieId"],rating:obj["rating"]}];
          if (Math.abs(client[movieId] - obj["rating"]) < 1.1){
            matchUsers++;
          }
          if (matchUsers == 50){
            break;
          }
        }
      }
    }
    console.log('matchUsers ' + matchUsers)
  }
  const end = Date.now();
  console.log(end-start);
  console.log(end-start_edit);
  return allUserData
  //pearsonCorrelation(new Array(userRates,TODO), 0, 1)

}

function pearsonCorrelation(prefs, p1, p2) {
  var si = [];

  for (var key in prefs[p1]) {
    if (prefs[p2][key]) si.push(key);
  }

  var n = si.length;

  if (n == 0) return 0;

  var sum1 = 0;
  for (var i = 0; i < si.length; i++) sum1 += prefs[p1][si[i]];

  var sum2 = 0;
  for (var i = 0; i < si.length; i++) sum2 += prefs[p2][si[i]];

  var sum1Sq = 0;
  for (var i = 0; i < si.length; i++) {
    sum1Sq += Math.pow(prefs[p1][si[i]], 2);
  }

  var sum2Sq = 0;
  for (var i = 0; i < si.length; i++) {
    sum2Sq += Math.pow(prefs[p2][si[i]], 2);
  }

  var pSum = 0;
  for (var i = 0; i < si.length; i++) {
    pSum += prefs[p1][si[i]] * prefs[p2][si[i]];
  }

  var num = pSum - (sum1 * sum2 / n);
  var den = Math.sqrt((sum1Sq - Math.pow(sum1, 2) / n) *
      (sum2Sq - Math.pow(sum2, 2) / n));

  if (den == 0) return 0;

  return num / den;
}