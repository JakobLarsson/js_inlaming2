var a = document.querySelector("#buttonSearch");

a.innerHTML = "Hello";


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


let weatherObj = {};

let xhr = new XMLHttpRequest();
xhr.open("GET", 'HTTPS://api.openweathermap.org/data/2.5/weather?q=Taberg&appid=853a9336996a15c9e8c9d504494853d2');
xhr.responeType = "json";
xhr.send();
xhr.onload = function() {
  let responseJson = xhr.response;
 console.log(responseJson)
 weatherObj = JSON.parse(responseJson);
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






