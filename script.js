// bygg om så att foursquare använder long och lat utifrån weather app så dom alltid visar samma ställe, klistra in 
// hela adress infreomrationen i html där det står TABERG nu. 


//GET THE RIGHT URL WITH FROM INFO WITH SEARCHBAR WITH BUTTON
//button event then do function
var submitBtn = document.querySelector("#buttonSearch");
submitBtn.addEventListener("click", createWeatherUrl);
submitBtn.addEventListener("click", getUrlFour);

let urlWeather = "";
function createWeatherUrl(){
 let searchBar = document.querySelector("#inputText");
let searchRes = searchBar.value;
 const url = new URL("https://api.openweathermap.org/data/2.5/weather");
 url.searchParams.append("appid", "0e6676eb8f42a63bf52f4a6177b3e9ca");
 url.searchParams.append("q", searchRes);
 urlWeather = url.href;
 getWeatherInfo();
}



//WEATHER API//
let weatherObj = {};
let temp = 0;
let tempDescription = "";
  function getWeatherInfo(){
   let xhr = new XMLHttpRequest();
   xhr.open("GET", urlWeather);
   xhr.responeType = "json";
   xhr.send();
   
   xhr.onload = function() {
    let responseJson = xhr.response;
    console.log(responseJson)
    weatherObj = JSON.parse(responseJson);
    temp = weatherObj.main.temp - 272;
    tempDescription = weatherObj.weather[0].description;
    console.log(temp);
    console.log(tempDescription);
    updateWeatherDOM();
};

xhr.onprogress = function(event) {
  if (event.lengthComputable) {
    alert(`Received ${event.loaded} of ${event.total} bytes`);
  } else {
    alert(`Received ${event.loaded} bytes`); // no Content-Length
  }
};

xhr.onerror = function() {
  alert("Request failed");
};
}

//UPPDATERA VÄDER INFORMATION VIA DOM

let tempDOM = document.querySelector("#wTemp");
let tempDescriptionDOM = document.querySelector("#wCondition");

function updateWeatherDOM(){
 tempDOM.innerHTML = temp;
 tempDescriptionDOM.innerHTML = tempDescription;
}


//GET THE URL FOR FOURSQUARE
let urlFourSquare = "";


function getUrlFour(){
  let searchBar = document.querySelector("#inputText");
let searchRes = searchBar.value;
 let urlF = new URL("https://api.foursquare.com/v2/venues/explore");
 urlF.searchParams.append("client_id", "3TQDALDDVBD5JLC1UUUWVUGRKOYFY3COM2Z3YMMWGMAX4W2N");
 urlF.searchParams.append("client_secret", "4QVH4ZCYPYWHB1BX1LTQLITPT41U5MOEKFDPRVX3IDVB11Z1");
 urlF.searchParams.append("near", searchRes);
 urlF.searchParams.append("v", "20210210");
 urlF.searchParams.append("limit", "3");
 urlF.searchParams.append("sortByPopularity", "1");
 
 urlFourSquare = urlF.href;
 getFoursQuareInfo();
}

// FOURSQUARE API
let answearF = {};
let answerMain = [answer1 = {name: "", type: "", adress: "", venue: ""},answer2 = {name: "", type: "", adress: "", venue: ""},answer3 = {name: "", type: "", adress: "", venue: ""} ];
function getFoursQuareInfo(){
 xhrF = new XMLHttpRequest();
 xhrF.open("GET", urlFourSquare);
 xhrF.onload = function(){
  let response = xhrF.response;
  console.log(response);
  answearF = JSON.parse(xhrF.response);
  answearF.response.groups[0].items[0].venue.name
  for(let i = 0; i < answerMain.length; i++){
   answerMain[i].name = answearF.response.groups[0].items[i].venue.name;
   answerMain[i].type = answearF.response.groups[0].items[i].venue.categories[0].name;
   answerMain[i].adress = answearF.response.groups[0].items[i].venue.location.address;
   answerMain[i].venue = answearF.response.groups[0].items[i].venue.id;
  }
  updateFourSquareDom();
 }
 xhrF.send();
 
}

//foursquare picture
let imgUrl = "";
 function ImgUrl(){
  let url = new URL("https://api.foursquare.com/v2/venues/VENUE_ID/photos");
  url.searchParams.append("client_id", "3TQDALDDVBD5JLC1UUUWVUGRKOYFY3COM2Z3YMMWGMAX4W2N");
  url.searchParams.append("client_secret", "4QVH4ZCYPYWHB1BX1LTQLITPT41U5MOEKFDPRVX3IDVB11Z1");
  url.searchParams.append();
 }


 function getFourSquareImg(){

 }


//UPPDATERA INFORMATIONEN VIA DOM foursquare
let c1Title = document.querySelector("#c1Title");
 let c1Type = document.querySelector("#c1Type");
 let c1Adress = document.querySelector("#c1Adress");
 let c2Title = document.querySelector("#c2Title");
 let c2Type = document.querySelector("#c2Type");
 let c2Adress = document.querySelector("#c2Adress");
 let c3Title = document.querySelector("#c3Title");
 let c3Type = document.querySelector("#c3Type");
 let c3Adress = document.querySelector("#c3Adress");
function updateFourSquareDom(){
 


 c1Title.innerHTML = answerMain[0].name;
 c2Title.innerHTML = answerMain[1].name;
 c3Title.innerHTML = answerMain[2].name;

 c1Adress.innerHTML = answerMain[0].adress;
 c2Adress.innerHTML = answerMain[1].adress;
 c3Adress.innerHTML = answerMain[2].adress;

 
 c1Type.innerHTML = answerMain[0].type;
 c2Type.innerHTML = answerMain[1].type;
 c3Type.innerHTML = answerMain[2].type;

}
