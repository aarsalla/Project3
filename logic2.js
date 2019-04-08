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

var corporations = [
  {
    name: "Verizon",
    ticker: "VZ",
    location: [40.7546836, -73.9847556],
    stock: 58.99
  },
  {
    name: "JPMorgan Chase",
    ticker: "JPM",
    location: [40.75582, -73.97569],
    stock: 105.56
  },
  {
    name: "Travelers Companies Inc.",
    ticker: "TRV",
    location: [40.7542603, -73.973587],
    stock: 136.52
  },
  {
    name: "Pfizer",
    ticker: "PFE",
    location: [40.7502192, -73.9726673],
    stock: 42.74
  }
];

var greenIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var oms = new OverlappingMarkerSpiderfier(myMap, {keepSpiderfied: true});

var popup = new L.Popup();

oms.addListener('click', function(marker) {
  popup.setContent(marker.desc);
  popup.setLatLng(marker.getLatLng());
  myMap.openPopup(popup);
});


d3.json("https://www.quandl.com/api/v3/datasets/EOD/VZ?start_date=2019-03-06&end_date=2019-04-06&api_key=REHgZFPuj_3cxTxuwvsn", function(error, data) {
  console.log(data.dataset.data)
});

/*
for (var i = 0; i < corporations.length; i++) {
  var marker = new L.Marker(corporations[i].location, {icon: greenIcon});

  var today = new Date()
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  var lastDate_API = yyyy + '-' + mm + '-' + dd;
  var lastDate_JS = mm + '/' + dd + '/' + yyyy;

  var thirty_days_prior = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  var dd2 = String(thirty_days_prior.getDate()-1).padStart(2, '0');
  var mm2 = String(thirty_days_prior.getMonth() + 1).padStart(2, '0');
  var yyyy2 = thirty_days_prior.getFullYear();
  var thirty_days_prior_API = yyyy2 + '-' + mm2 + '-' + dd2;
  var thirty_days_prior_JS = mm2 + '/' + dd2 + '/' + yyyy2;

  console.log(lastDate_API)
  console.log(thirty_days_prior_API)

  var stock_ticker = corporations[i].ticker;
  
  console.log(stock_ticker)

  var apiKey = "REHgZFPuj_3cxTxuwvsn";
  var url = `https://www.quandl.com/api/v3/datasets/EOD/${stock_ticker}?start_date=${thirty_days_prior_API}&end_date=${lastDate_API}&api_key=${apiKey}`;
  
  console.log(url)

  d3.json(url, function(error, data){
    console.log(data)
  });

  marker.desc = corporations[i].name;
  myMap.addLayer(marker);
  oms.addMarker(marker);

};

// var marker = new L.Marker([+data.Latitude, +data.Longitude], {icon: greenIcon});
*/