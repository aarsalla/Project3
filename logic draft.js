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

var greenIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var redIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function stockColor(stock_price) {
  switch (true) {
  case (0 < stock_price):
    return greenIcon
  defualt:
    return redIcon;
  }
}

d3.csv("DowJonesPlus3_Coordinations.csv").then(function(csvData) {

  for(i = 0; i < csvData.length; i++)
  {
  //csvData.forEach(function(data){
    data = csvData[i];

    var marker = new L.Marker([+data.Latitude, +data.Longitude], {icon: greenIcon});

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
    var stock_ticker = data["Stock Ticker"];

    var apiKey = "REHgZFPuj_3cxTxuwvsn";
    var url = `https://www.quandl.com/api/v3/datasets/EOD/${stock_ticker}?start_date=${thirty_days_prior_API}&end_date=${lastDate_API}&api_key=${apiKey}`;

    d3.json("https://www.quandl.com/api/v3/datasets/EOD/MMM?start_date=2019-03-07&end_date=2019-04-07&api_key=REHgZFPuj_3cxTxuwvsn")
    .then(function(data) {

      console.log("DANIEL -- DO YOUR THING HERE");
      console.log(data); // work with this as you see fit
      console.log(data.dataset.data); // work with this as you see fit

    });

    marker.desc = data.Name;
    myMap.addLayer(marker);
    oms.addMarker(marker);

  }

  /*
  var apiKey = "REHgZFPuj_3cxTxuwvsn";
  var url2 = `https://www.quandl.com/api/v3/datasets/EOD/FB?start_date=2019-03-06&end_date=2019-04-06&api_key=REHgZFPuj_3cxTxuwvsn`;

  console.log(url2)
  d3.json(url2).then;

  function foo(foo)
  {
    console.log('hi');
     console.log(foo)
    //var dates = unpack(jsonData.dataset.data, 0);
    //var closingPrices = unpack(jsonData.dataset.data, 4);
  }
  */

});

var oms = new OverlappingMarkerSpiderfier(myMap, {keepSpiderfied: true});

var popup = new L.Popup();

oms.addListener('click', function(marker) {
  popup.setContent(marker.desc);
  popup.setLatLng(marker.getLatLng());
  myMap.openPopup(popup);
});
