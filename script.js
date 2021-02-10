//


// fetch('HTTPS://api.openweathermap.org/data/2.5/weather?q=Taberg&appid=853a9336996a15c9e8c9d504494853d2')
//   .then(response => response.json())
//   .then(data => console.log(data));



//   function reqListener () {
//   console.log(this.responseText);
// }

// var oReq = new XMLHttpRequest();
// oReq.addEventListener("load", reqListener);
// oReq.open("GET", "api.openweathermap.org/data/2.5/weather?q={Jönköping}&appid={0e6676eb8f42a63bf52f4a6177b3e9ca}");
// oReq.send();


//GET THE RIGHT URL WITH FROM INFO WITH SEARCHBAR WITH BUTTON
//button event then do function
var submitBtn = document.querySelector("#buttonSearch");
submitBtn.addEventListener("click", createWeatherUrl);

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






//END OF SEARCHBAR

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




