// bygg om så att foursquare använder long och lat utifrån weather app så dom alltid visar samma ställe, klistra in 
// Kanske redirecta changeTitle till att använda sig av weatherApp information.
// Bygg felhantering utifall platsen inte hittas. 


//GET THE RIGHT URL WITH FROM INFO WITH SEARCHBAR WITH BUTTON
//button event then do function

var submitBtn = document.querySelector("#buttonSearch");
submitBtn.addEventListener("click", createWeatherUrl);


submitBtn.addEventListener("click", changeVisibility);


let title = document.querySelector("#cityHeader");
function changeTitle(){
  let searchBar = document.querySelector("#inputText");
  let searchRes = searchBar.value;
  title.innerHTML = nameLocation + ", " + countryLocation;  
}


function changeTitleOnError(msg){
  title.innerHTML = msg;
  attractionsContent.classList.add("hide");
  weatherContent.classList.add("hide");
}


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
let nameLocation = "";
let countryLocation = "";
  function getWeatherInfo(){
   let xhr = new XMLHttpRequest();
   xhr.open("GET", urlWeather);
   xhr.responeType = "json";
   xhr.send();
   
   xhr.onload = function() {
    let responseJson = xhr.response;
    
    weatherObj = JSON.parse(responseJson);
    if(weatherObj.cod != "200"){
      changeTitleOnError(weatherObj.message);
    }else{
      attractionsContent.classList.remove("hide");
  weatherContent.classList.remove("hide");
    }
    temp = weatherObj.main.temp - 272;
    temp = temp.toFixed(1);
    tempDescription = weatherObj.weather[0].description;
    nameLocation = weatherObj.name;
    countryLocation = weatherObj.sys.country;
    changeTitle();
    updateWeatherDOM();
    getUrlFour(weatherObj);
};

xhr.onprogress = function(event) {
  if (event.lengthComputable) {
    console.log(`Received ${event.loaded} of ${event.total} bytes`);
  } else {
    console.log(`Received ${event.loaded} bytes`); // no Content-Length
  }
};

xhr.onerror = function() {
  
  changeTitleOnError("Request failed");
};
}

//UPPDATERA VÄDER INFORMATION VIA DOM

let tempDOM = document.querySelector("#wTemp");
let tempDescriptionDOM = document.querySelector("#wCondition");

function updateWeatherDOM(){
 tempDOM.innerHTML = temp + "°";
 tempDescriptionDOM.innerHTML = tempDescription;
}


//GET THE URL FOR FOURSQUARE
let urlFourSquare = "";


function getUrlFour(obj){
  let searchBar = document.querySelector("#inputText");
let searchRes = searchBar.value;
 let urlF = new URL("https://api.foursquare.com/v2/venues/explore");
 urlF.searchParams.append("client_id", "3TQDALDDVBD5JLC1UUUWVUGRKOYFY3COM2Z3YMMWGMAX4W2N");
 urlF.searchParams.append("client_secret", "4QVH4ZCYPYWHB1BX1LTQLITPT41U5MOEKFDPRVX3IDVB11Z1");
 urlF.searchParams.append("ll", obj.coord.lat + "," +  obj.coord.lon);
 urlF.searchParams.append("v", "20210210");
 urlF.searchParams.append("limit", "3");
 urlF.searchParams.append("sortByPopularity", "1");
 urlF.searchParams.append("radius", "3000");
 
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
  
  answearF = JSON.parse(xhrF.response);
  answearF.response.groups[0].items[0].venue.name
  for(let i = 0; i < answerMain.length; i++){
   answerMain[i].name = answearF.response.groups[0].items[i].venue.name;
   answerMain[i].type = answearF.response.groups[0].items[i].venue.categories[0].name;
   answerMain[i].adress = answearF.response.groups[0].items[i].venue.location.address;
   answerMain[i].venue = answearF.response.groups[0].items[i].venue.id;
  }
  
  //imgUrlFunc();
  updateFourSquareDom();
 }
 xhrF.send();
 
}

//foursquare picture
let imgUrl = "";
  function imgUrlFunc(){
    for(let i = 0; i < answerMain.length; i++){
        let url = new URL(`https://api.foursquare.com/v2/venues/${answerMain[i].venue}/photos`);
     url.searchParams.append("client_id", "3TQDALDDVBD5JLC1UUUWVUGRKOYFY3COM2Z3YMMWGMAX4W2N");
     url.searchParams.append("client_secret", "4QVH4ZCYPYWHB1BX1LTQLITPT41U5MOEKFDPRVX3IDVB11Z1");
     url.searchParams.append("limit", "2");
    url.searchParams.append("v", "20210210");
    imgUrl = url.href;
    getFourSquareImg();
    }
    
 }

 let fqImg = {};
 function getFourSquareImg(){
   let xhr = new XMLHttpRequest();
   xhr.open("GET", imgUrl);
   xhr.onload = function(){
    let response = xhr.response;
    console.log(xhr.response);
    fqImg = JSON.parse(response);
    
      console.log(xhr.response)
    
      createPicUrl();
    
      
    
   }
   xhr.send();
 }
 let picUrl = [];
 let picUrlCount = 0;
 function createPicUrl(){
   
    picUrl[picUrlCount] = fqImg.response.photos.items[0].prefix + "300x300" + fqImg.response.photos.items[0].suffix;
    
    picUrlCount++; 
 }
//UPPDATERA INFORMATIONEN VIA DOM foursquare
let c1Title = document.querySelector("#c1Title");
 let c1Type = document.querySelector("#c1Type");
 let c1Adress = document.querySelector("#c1Adress");
 let c1Img = document.querySelector("#c1Img");

 let c2Title = document.querySelector("#c2Title");
 let c2Type = document.querySelector("#c2Type");
 let c2Adress = document.querySelector("#c2Adress");
 let c2Img = document.querySelector("#c2Img");

 let c3Title = document.querySelector("#c3Title");
 let c3Type = document.querySelector("#c3Type");
 let c3Adress = document.querySelector("#c3Adress");
 let c3Img = document.querySelector("#c3Img");
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

 //c1Img.src = picUrl[picUrlCount - 2];
 //c2Img.src = picUrl[picUrlCount - 1];
 //c3Img.src = picUrl[picUrlCount];

}


//ÄNDRA VISABILITY

let onlyWeather = document.querySelector("#onlyWeather");
let onlyAtractions = document.querySelector("#onlyAtractions");
let showAll = document.querySelector("#showAll");

let weatherContent = document.querySelector("#weatherContent");
let attractionsContent = document.querySelector("#attractionsContent");
onlyWeather.addEventListener("input", changeVisibility);
onlyAtractions.addEventListener("input", changeVisibility);
showAll.addEventListener("input", changeVisibility);


function changeVisibility(){
  if(showAll.checked){
    weatherContent.classList.remove("hide");
    attractionsContent.classList.remove("hide");
  }
  if(onlyWeather.checked){
    weatherContent.classList.remove("hide");
    attractionsContent.classList.add("hide");
  }else if (onlyAtractions.checked){
    attractionsContent.classList.remove("hide");
    weatherContent.classList.add("hide");
  }

}