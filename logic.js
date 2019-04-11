// Create a map object
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);


// Each city object contains the city's name, location and population
var corporations = [
  {
    name: "Apple",
    location: [37.3230, -122.0322],
    stock: 189.95
  },
  {
    name: "Amazon",
    location: [47.6062, -122.3321],
    stock: 1780.75
  },
  {
    name: "Facebook",
    location: [37.484116, -122.148244],
    stock: 166.69
  },
];

var redMarker = L.ExtraMarkers.icon({
  icon: 'fa-coffee',
  markerColor: 'red',
  shape: 'square',
  prefix: 'fa'
});

L.marker([37.484116, -122.148244], {icon: redMarker}).addTo(myMap);



/*
for (var i = 0; i < corporations.length; i++) {
  L.circle(corporations[i].location, {
    fillOpacity: 0.75,
    color: "white",
    fillColor: "purple",
    // Setting our circle's radius equal to the output of our markerSize function
    // This will make our marker's size proportionate to its population
    radius: markerSize(corporations[i].stock)
  }).bindPopup("<h1>" + corporations[i].name + "</h1> <hr> <h3>Stock Price : $" + corporations[i].stock + "</h3>").addTo(myMap);
};
*/