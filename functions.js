function showMovies(data) {
  console.log('SHOW MOVIES CALLED');
  console.log(data)
  const movieContainer = document.getElementById("movies");
  movieContainer.innerHTML = "";
  data.forEach((jsonObj) => {

    if(Array.isArray(jsonObj)){
      jsonObj = jsonObj[0]
    }
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

async function fetchJSON(url,body,) {
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


async function fetchGETJSON(url) {
  const response = await fetch(url,{
    method: 'GET', 
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const resultJSON = await response.json();
  return resultJSON;
}

// async function fetchRatingsJSON(movies) {
//   const response = await fetch(ratingsURL,{
//     method: 'POST', // *GET, POST, PUT, DELETE, etc.
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: movies // body data type must match "Content-Type" header
//   });
//   const ratings = await response.json();
//   return ratings;
// }

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
  let loader = `<div class="loader"></div>`;
  document.getElementById("movies").innerHTML = loader;
  fetchJSON(url=ratingsURL,body=jsonString).then(movies => {
    matchedBestUser = -1
    matchedBestUserValue = -1.0

    console.log(movies);
    allUserData = transformData(movies,start);
    console.log(allUserData);
    var user_counter;
    var users = Object.keys(allUserData);
    var check = 0;
    var total = 0;
    for (user_counter=0;user_counter < users.length;user_counter++){
      var myuserArray = [];
      var userArray = [];
      var noMatch = 0;
      userID = users[user_counter];
      userRatings = allUserData[users[user_counter]];

      for (var movieID in client) {
        myuserArray.push(client[movieID])
        var flag = true
        for(var i=0;i<userRatings.length;i++){
          userMovieID = userRatings[i]['id']
          if(userMovieID == movieID){
            userArray.push(userRatings[i]['rating'])
            flag = false
            break
          }
        }
        if(flag){
          userArray.push(2.5)
          noMatch++;
        }


      }
    
      if(noMatch<5){
        // console.log('============================================')
        pearson = pearsonCorrelation(new Array(myuserArray,userArray), 0, 1)
        total_movies = Object.keys(client).length
        // console.log('UserID --> ' + userID);
        // console.log('Local user --> ', myuserArray);
        // console.log('Other user --> ' , userArray);
        // console.log('Pearson Result --> ' , pearson)
        // console.log('Match/Total --> ' , (total_movies-noMatch).toString() + '/' + total_movies.toString())
        if (pearson > matchedBestUserValue) {
          matchedBestUser = userID
          matchedBestUserValue = pearson
        } 
        total++
      }
      else{
        check++;
      }
      
    }
    // console.log('---------------------------------------')
    // console.log('total | check');

    // console.log(total,check);
    console.log('Match User --> ' + matchedBestUser)
    console.log('Match Value --> ' + matchedBestUserValue)
    console.log("This is the client array: ");
    console.log(client);
  
    return matchedBestUser;
  }).then(matchedBestUser => {
    var matchedBestURL = ratingsURL + "/" + matchedBestUser;

    fetchGETJSON(url=matchedBestURL).then(movies => {
      console.log('RECOMMENDDDDDDD')
      console.log(Object.keys(client))

      var top10MoviesIDs = [];
      shuffle(movies);
      //movies.sort(GetSortOrder("rating")); 
      for(var i=0 ; i<movies.length ; i++){
        id = movies[i]['movieId'];
        rate = movies[i]['rating'];
        if (rate >= 4){
          if (Object.keys(client).includes(id.toString())){
            console.log('NOT')
          }else{
            top10MoviesIDs.push(id);
            console.log(movies[i],movies[i]['rating'])
          }
         
        }

        if (top10MoviesIDs.length >= 10){
          break;
        }
  
      }
      var top10MoviesData = [];
      top10MoviesIDs.forEach((obj) => {
        top10MoviesData.push(fetchGETJSON(url=movieURL + obj));
      });
      Promise.all(top10MoviesData).then(data => {
        showMovies(data)
      })
    });
  });
}


function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}



function test() {
  console.log(new Array([15,2,7,88,66],[15,2,7,88,66]))
  //console.log(pearsonCorrelation(new Array([1.2,1.2,1.2],[1.0,1.2,1.0]), 0, 1))
  console.log(pearsonCorrelation(new Array([4,3,5,4.5,2],[4,3,5,4.5,5]), 0, 1))
  // console.log(pearsonCorrelation(new Array([1.1,1.,1.1],[1.1,1.,1.1]), 0, 1))
  // console.log(pearsonCorrelation(new Array([0,0,0],[1,1,1]), 0, 1))
  // console.log(pearsonCorrelation(new Array([1,1],[1,1,1]), 0, 1))


}
//Comparer Function    
function GetSortOrder(prop) {    
  return function(a, b) {    
      if (a[prop] < b[prop]) {    
          return 1;    
      } else if (a[prop] > b[prop]) {    
          return -1;    
      }    
      return 0;    
  }    
}    


// takes a json of the form (if i have rate 2 movies):
// { 
//  0 : [ {userId:1,,movieiD:358,rating:2} ],
//  1 : [ {userId:1,,movieiD:467,rating:5},{userId:5,,movieiD:467,rating:3.5},{userId:21,,movieiD:467,rating:2} ]
// }
// and trafnsorm it to: userID:[movieid and rating]
// {
//   1 : [{id:358, rating:2}, {id:467, rating:5}],
//   5 : [{id:467, rating:3.5}],
//   ...
// }
function transformData(allData,start){
  const start_edit = Date.now();
  console.log(allData)
  allData.sort(function (a, b) {
    return a.length - b.length;
  });
  console.log(allData)
  console.log(allData.length)

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
        if (matchUsers == 150){
          break;
        }
       } else {
        if (i <= (allData.length/2)) {
          allUserData[obj["userId"].toString()] = [{id:obj["movieId"],rating:obj["rating"]}];
          if (Math.abs(client[movieId] - obj["rating"]) < 1.1){
            matchUsers++;
          }
          if (matchUsers == 150){
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

}

function pearsonCorrelation(prefs, p1, p2) {
  // console.log('-------------')
  // console.log(prefs)
  // console.log(p1)
  // console.log(p2)
  // console.log('-------------')

  var si = [];
  // console.log('.....')
  // console.log(prefs[p1])
  // console.log('.....')

  for (var key in prefs[p1]) {
    if (prefs[p2][key]) si.push(key);
  }
  // console.log('.....si array.....')

  // console.log(si)

  // console.log(si.length)
  // console.log('.....')

  var n = si.length;

  if (n == 0) return 0;

  var sum1 = 0;
  for (var i = 0; i < si.length; i++) sum1 += prefs[p1][si[i]];
  // console.log('.....sum1 array.....')

  // console.log(sum1)
  // console.log('.....')

  var sum2 = 0;
  for (var i = 0; i < si.length; i++) sum2 += prefs[p2][si[i]];
  // console.log('.....sum2 array.....')

  // console.log(sum2)
  // console.log('.....')

  var sum1Sq = 0;
  for (var i = 0; i < si.length; i++) {
    sum1Sq += Math.pow(prefs[p1][si[i]], 2);
  }
  // console.log('.....sum1Sq array.....')

  // console.log(sum1Sq)
  // console.log('.....')

  var sum2Sq = 0;
  for (var i = 0; i < si.length; i++) {
    sum2Sq += Math.pow(prefs[p2][si[i]], 2);
  }
  // console.log('.....sum2Sq array.....')

  // console.log(sum2Sq)
  // console.log('.....')

  var pSum = 0;
  for (var i = 0; i < si.length; i++) {
    pSum += prefs[p1][si[i]] * prefs[p2][si[i]];
  }

  // console.log('.....pSum array.....')

  // console.log(pSum)
  // console.log('.....')



  var num = pSum - (sum1 * sum2 / n);
  var den = Math.sqrt((sum1Sq - Math.pow(sum1, 2) / n) *
      (sum2Sq - Math.pow(sum2, 2) / n));
  // console.log('.....num array.....')

  // console.log(num)
  // console.log('.....')

  // console.log('.....den array.....')

  // console.log(den)
  // console.log('.....')

  if (den == 0) return 0;

  return num / den;
}