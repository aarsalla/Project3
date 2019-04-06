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

// Define a markerSize function that will give each city a different radius based on its population

// Each city object contains the city's name, location and population
var corporations = [
  {
    name: "Verizon",
    location: [40.7546836, -73.9847556],
    stock: 58.99
  },
  {
    name: "JPMorgan Chase",
    location: [40.75582, -73.97569],
    stock: 105.56
  },
  {
    name: "Travelers Companies Inc.",
    location: [40.7542603, -73.973587],
    stock: 136.52
  },
  {
    name: "Pfizer",
    location: [40.7502192, -73.9726673],
    stock: 42.74
  }
];

/*
for (var i = 0; i < corporations.length; i++) {
  L.marker(corporations[i].location, {
  }).bindPopup("<h1>" + corporations[i].name + "</h1> <hr> <h3>Stock Price : $" + corporations[i].stock + "</h3>").addTo(myMap);
};
*/

var oms = new OverlappingMarkerSpiderfier(myMap, {keepSpiderfied: true});

var popup = new L.Popup();

oms.addListener('click', function(marker) {
  popup.setContent(marker.desc);
  popup.setLatLng(marker.getLatLng());
  myMap.openPopup(popup);
});
/*
oms.addListener('spiderfy', function(markers) {
  myMap.closePopup();
});
*/

/*
for (var i = 0; i < window.mapData.length; i ++) {
  var datum = window.mapData[i];
  var loc = new L.LatLng(datum.lat, datum.lon);
  var marker = new L.Marker(loc);
  marker.desc = datum.d;
  map.addLayer(marker);
  oms.addMarker(marker);  // <-- here
}
*/

for (var i = 0; i < corporations.length; i++) {
  var marker = new L.Marker(corporations[i].location);
  marker.desc = corporations[i].name;
  myMap.addLayer(marker);
  oms.addMarker(marker);

};

options = {
  icon: 'leaf',
  iconShape: 'marker'
};
L.marker([43.7502192, -75.9726673], {
  icon: L.BeautifyIcon.(options),
  draggable: true
}).addTo(myMap).bindPopup("popup").bindPopup("This is a BeautifyMarker");


