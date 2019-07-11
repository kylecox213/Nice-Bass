
// create var map to contain response from google maps api call
// standard google maps api ajax call in accordance with google maps api docs
// function initMap appends the response from the google maps api call to the map div
// centering the map to longitude and latitude and setting zoom 

let map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 37.5241, lng: -77.4223 },
    zoom: 12

  });
}


// running the initialize map function

initMap();



// created function for calling the currentWeather api 
// set api key to var key
// api call in accordance with openweather api docs
// function for converting the response data from api call to json format

function currentWeather() {
  let key = '184eb6450fef976a167dbae5ef669d22';
  fetch('https://api.openweathermap.org/data/2.5/weather?lat=37.5241&lon=-77.4223&appid=' + key)
    .then(function (resp) { return resp.json() }) // Convert data to json
    .then(function (data) {
      drawWeather(data);
    })
    .catch(function () {
      // catch any errors
    });
}

window.onload = function () {
  currentWeather();
}

function drawWeather(d) {
  // let celcius = Math.round(parseFloat(d.main.temp)-273.15);
  let fahrenheit = Math.round(((parseFloat(d.main.temp) - 273.15) * 1.8) + 32);

  document.getElementById('description').innerHTML = titleCase(d.weather[0].description);
  document.getElementById('temp').innerHTML = fahrenheit + '&deg;';
  document.getElementById('location').innerHTML = d.name;
}

function titleCase(string) {
  string = string.toLowerCase().split(" ").map(function (word) {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(" ");

  return string
}

console.log(">hello");


// setting default zoom properties for the map layer tiles
// setting the map to variable radar



update('temp_new')
function update(layer){
let zoom = 13;
let radar = L.map('radar').setView([37.5241, -77.4223], zoom);


// defining custom row and column properties for the map tiles as the default tile properties appeared offset when
  //superimposed over the map

let rows = Math.pow(2, zoom);
let cols = rows;


// setting url components to variables to reduce redundancy in multiple openweather api ajax calls
// setting url to var url 

let key = '184eb6450fef976a167dbae5ef669d22';
// let layer = `temp_new`;
let z = zoom;
let x = Math.floor(rows / 2);
let y = Math.floor(cols / 2);
let url = `https://tile.openweathermap.org/map/{layer}/{z}/{x}/{y}.png?appid={api_key}`;


// setting api key for mapbox to var mapboxKey
// ajax call to the mapbox api utilizing leaflet api plug-in format
// defining minimum and maximum zoom properties for the map
// appending the map to the radar div

let mapboxKey = 'pk.eyJ1Ijoia3lsZWNveDIxMyIsImEiOiJjanh3Z2liNnQwMzQ1M2xvemRuM2RvcWRqIn0.Q5gET69Q50YjzXLj1zRp7g';
L.tileLayer(`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${mapboxKey}`, {
  minZoom: 0,
  maxZoom: 18,
  //z: zoom,
  id: 'mapbox.streets'
}).addTo(radar);
console.log(url);


// assigning default tile layer (temperature layer) to var radarTemp
// utilizing global variables specific to the url
// appending the tile layer to the radar div which now contains the map

let radarTemp = L.tileLayer(url, {
  layer: layer,
  api_key: key,
  //z: z,
  //x: x,
  //y: y,
  minZoom: 0,
  maxZoom: 18
}
).addTo(radar);
console.log(url);
};

$('body').on('click', '.layer-update', function(){
  $('#radar').remove();
  newLayer = ($(this).attr("data-name"));
  console.log(newLayer);

  $('.radar-map-container').append("<div id='radar'</div>");
  update(newLayer)
});


// Each map tile is a 256x256 point square. At zoom level 0, the entire world is 
// rendered in a single tile. Each zoom level increases the magnification by a 
// factor of two. So, at zoom level 1 the map will be rendered as a 2x2 grid of 
// tiles, or a 4x4 grid at zoom level 2, a 8x8 grid at zoom level 3, and so on. If 
// you are creating images for a tile layer, you will need to create a new 256x256 
// point image for each tile at each zoom level that you wish to support.

