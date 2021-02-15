// bygg om så att foursquare använder long och lat utifrån weather app så dom alltid visar samma ställe, klistra in 
// Kanske redirecta changeTitle till att använda sig av weatherApp information.
// Bygg felhantering utifall platsen inte hittas. 


//GET THE RIGHT URL WITH FROM INFO WITH SEARCHBAR WITH BUTTON
//button event then do function

var submitBtn = document.querySelector("#buttonSearch");
submitBtn.addEventListener("click", createWeatherUrl);


submitBtn.addEventListener("click", changeVisibility);

//ändra titel till sökt stad
let title = document.querySelector("#cityHeader");
function changeTitle(){
  let searchBar = document.querySelector("#inputText");
  let searchRes = searchBar.value;
  title.innerHTML = nameLocation + ", " + countryLocation;  
}

//ändra titel till error medelande
function changeTitleOnError(msg){
  title.innerHTML = msg;
  attractionsContent.classList.add("hide");
  weatherContent.classList.add("hide");
}

//skapa en url för att hämta information ifrån openweathermap, parametrar med appid och q för sökning av stad
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
let icon = "";
/*funktion som skapar ett xmlhttprequest objekt för att skicka URL som skapades tidigare. Parametrar som ställs
in är GET: att jag vill hämta information. Även response type sätts till json*/
  function getWeatherInfo(){
   let xhr = new XMLHttpRequest();
   xhr.open("GET", urlWeather);
   xhr.responeType = "json";
   //avslutas med ett send kommando
   xhr.send();
   
   //ONLOAD funktion som körs när hämtningen är klar och hela objektet är nerladdat
   xhr.onload = function() {
    let responseJson = xhr.response; //spara ner response i en variabel. (som i detta falet är en string av json format)
    
    weatherObj = JSON.parse(responseJson); //förvandla stringen av json till ett riktigt javascitp objekt
    /*Om inget felmedelande sker så körs else satsen annars kommer 
    titlen att ändras till ett error message */
    if(weatherObj.cod != "200"){
      changeTitleOnError(weatherObj.message);
    }else{
      attractionsContent.classList.remove("hide");
  weatherContent.classList.remove("hide");
    }
    /*Här skickar jag in information från mitt objekt in i enskilda variabler */
    temp = weatherObj.main.temp - 272;
    temp = temp.toFixed(1);
    tempDescription = weatherObj.weather[0].description;
    nameLocation = weatherObj.name;
    countryLocation = weatherObj.sys.country;
    icon = weatherObj.weather[0].icon;
    changeTitle();
    updateWeatherDOM();
    getUrlFour(weatherObj);
};

/*ONprogress jag lite osäker på hur detta funkar men tror det är ett sätt för att kunna printa ut 
tillexempel hur långt gången nerladdningen är om man hämtar stora objekt osv, alltså körs denna under pågående nerladdning */
xhr.onprogress = function(event) {
  if (event.lengthComputable) {
    console.log(`Received ${event.loaded} of ${event.total} bytes`);
  } else {
    console.log(`Received ${event.loaded} bytes`); // no Content-Length
  }
};

/*ONERROR funktion som körs om något med hämtningen går fel, tex användaren har inget internet
eller om openweather ligger nere */
xhr.onerror = function() {
  
  changeTitleOnError("Request failed");
};
}

//UPPDATERA VÄDER INFORMATION VIA DOM

let tempDOM = document.querySelector("#wTemp");
let tempDescriptionDOM = document.querySelector("#wCondition");
let iconDOM = document.querySelector("#wIcon") ;

function updateWeatherDOM(){
 tempDOM.innerHTML = temp + "°";
 tempDescriptionDOM.innerHTML = tempDescription;
 iconDOM.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;  
}


//GET THE URL FOR FOURSQUARE
let urlFourSquare = ""; // spara ner slutgiltliga urlen här
 

function getUrlFour(obj){
  let searchBar = document.querySelector("#inputText"); //input text (stad, används inte längre här)
let searchRes = searchBar.value;
 let urlF = new URL("https://api.foursquare.com/v2/venues/explore"); //fq standard länk till api
 urlF.searchParams.append("client_id", "3TQDALDDVBD5JLC1UUUWVUGRKOYFY3COM2Z3YMMWGMAX4W2N"); //implementera client_id til urlen
 urlF.searchParams.append("client_secret", "4QVH4ZCYPYWHB1BX1LTQLITPT41U5MOEKFDPRVX3IDVB11Z1"); //client secret
 /*Sök efter ett ställe via kordinater som jag plockar ifrån weather resultatet. Detta för att garantera resultat på samma ställe som weather visar */
 urlF.searchParams.append("ll", obj.coord.lat + "," +  obj.coord.lon); 
 urlF.searchParams.append("v", "20210210");//Datum som fq kräver, hämtar inget "dagens datum" vilket jag igentligen borde
 urlF.searchParams.append("limit", "3"); //Hämta hem endast 3 resultat
 urlF.searchParams.append("sortByPopularity", "1"); //sort by popularity 1 = true
 urlF.searchParams.append("radius", "3000"); //sök storlek utifrå¨n kordinaterna
 
 urlFourSquare = urlF.href; //placera den slutgiltliga urlen i variblen skapade tidigare
 getFoursQuareInfo(); //kör funktionen där ja skickar apit
}

// FOURSQUARE API
let answearF = {}; //ställe att spara hela slut objektet

//spara ner dom 4 resultaten från varje ställe jag vil åt i en array av objekt.
let answerMain = [answer1 = {name: "", type: "", adress: "", venue: ""},answer2 = {name: "", type: "", adress: "", venue: ""},answer3 = {name: "", type: "", adress: "", venue: ""} ]; 


function getFoursQuareInfo(){
 xhrF = new XMLHttpRequest();       //skapa request objekt
 xhrF.open("GET", urlFourSquare);   //ställ in GET och länka in urlen jag vill skicka
 xhrF.onload = function(){        
  let response = xhrF.response;       //onload när hämtningen är färdig sparas det ner i en variabel
  
  answearF = JSON.parse(xhrF.response); //från json till ett javascript objekt
  
  for(let i = 0; i < answerMain.length; i++){ //loopa egenom dom tre venuesen och spara ner dom olika delarna i objektet som skapades tidigare
   answerMain[i].name = answearF.response.groups[0].items[i].venue.name;
   answerMain[i].type = answearF.response.groups[0].items[i].venue.categories[0].name;
   answerMain[i].adress = answearF.response.groups[0].items[i].venue.location.address;
   answerMain[i].venue = answearF.response.groups[0].items[i].venue.id;
  }
  
  imgUrlFunc(); //Kör img url koden
  updateFourSquareDom(); //uppdatera DOM nu när objektet är uppdaterat med den senaste sökningen
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
   if(picUrlCount == 3){
     picUrlCount == 0;
   }
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

 c1Img.src = picUrl[picUrlCount];
 c2Img.src = picUrl[picUrlCount];
 c3Img.src = picUrl[picUrlCount];

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