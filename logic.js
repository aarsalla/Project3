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

markers = [];

d3.csv("DowJonesPlus3_Coordinations.csv", function(error, csvData) {
  if (error) console.log(error);

  console.log(csvData);
/*
  csvData.forEach(function(data){
    headquarterMarker = L.marker([data.Latitude, data.Longitude])
      .bindPopup("<h3>" + data.Name + "</h3>");
    markers.push(headquarterMarker);

  });

  csvData.forEach(function(data){
    headquarterCircle = L.circle([data.Latitude, data.Longitude], {
      stroke: false,
      fillOpacity: .5,
      color: "red",
      fillColor: "red",
      radius : 50000
    }).bindPopup("<h3>" + data.Name + "</h3>");

    markers.push(headquarterCircle);
  });
  var headquarters = L.layerGroup(markers);

  headquarters.addTo(myMap);
*/
  var greenIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 40],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  csvData.forEach(function(data){
    console.log(data)
    var marker = new L.Marker([+data.Latitude, +data.Longitude], {icon: greenIcon});
    marker.desc = data.Name;
    myMap.addLayer(marker);
    oms.addMarker(marker);

  });


});

var oms = new OverlappingMarkerSpiderfier(myMap, {keepSpiderfied: true});

var popup = new L.Popup();

oms.addListener('click', function(marker) {
  popup.setContent(marker.desc);
  popup.setLatLng(marker.getLatLng());
  myMap.openPopup(popup);
});

/*
for (var i = 0; i < corporations.length; i++) {
  var marker = new L.Marker(corporations[i].location);
  marker.desc = corporations[i].name;
  myMap.addLayer(marker);
  oms.addMarker(marker);

};

var oms = new OverlappingMarkerSpiderfier(myMap, {keepSpiderfied: true});

var popup = new L.Popup();

oms.addListener('click', function(marker) {
  popup.setContent(marker.desc);
  popup.setLatLng(marker.getLatLng());
  myMap.openPopup(popup);
});



/*
d3.json(url, function(response) {

  // Create a new marker cluster group
  var markers = L.markerClusterGroup();

  // Loop through data
  for (var i = 0; i < response.length; i++) {

    // Set the data location property to a variable
    var location = response[i].location;

    // Check for location property
    if (location) {

      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
        .bindPopup(response[i].descriptor + "<hr>" + response[i].cross_street_1 + "<br>" + response[i].cross_street_2));
    }

  }

  // Add our marker cluster layer to the map
  myMap.addLayer(markers);

});
*/

/*

// Define a markerSize function that will give each city a different radius based on its population
/*
function markerSize(stockprice) {
  console.log(Math.log(stockprice));
  return Math.log(stockprice) * 5000;
};
*/

/*
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
*/


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