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
  iconSize: scalarMultiply([25, 40], 1),
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function scalarMultiply(arr, multiplier) {
  for (var i = 0; i < arr.length; i++)
  {
     arr[i] *= multiplier;
  }
  return arr;
};

//var a = scalarMultiply([1, 2, 3], 5);

function stockColor(stock_price) {
  switch (true) {
  case (0 < stock_price):
    return greenIcon
  case (0 > stock_price):
    return redIcon
  //defualt:
    //return redIcon;
  }
}



d3.csv("DowJonesPlus3_Coordinations.csv").then(function(csvData) {

  for(i = 0; i < csvData.length; i++)
  {
  //csvData.forEach(function(data){
    data = csvData[i];

    //var stock_price = -0.25;

    //var marker = new L.Marker([+data.Latitude, +data.Longitude], {icon: stockColor(stock_price)});

    var today = new Date()
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var lastDate_API = yyyy + '-' + mm + '-' + dd;
    var lastDate_JS = mm + '/' + dd + '/' + yyyy;

    /*
    var thirty_days_prior = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    var dd2 = String(thirty_days_prior.getDate()-1).padStart(2, '0');
    var mm2 = String(thirty_days_prior.getMonth() + 1).padStart(2, '0');
    var yyyy2 = thirty_days_prior.getFullYear();
    var thirty_days_prior_API = yyyy2 + '-' + mm2 + '-' + dd2;
    var thirty_days_prior_JS = mm2 + '/' + dd2 + '/' + yyyy2;
    var stock_ticker = data["Stock Ticker"];
    */

    var four_days_prior = new Date(Date.now() - 4 * 24 * 60 * 60 * 1000);
    var dd2 = String(four_days_prior.getDate()-1).padStart(2, '0');
    var mm2 = String(four_days_prior.getMonth() + 1).padStart(2, '0');
    var yyyy2 = four_days_prior.getFullYear();
    var four_days_prior_API = yyyy2 + '-' + mm2 + '-' + dd2;
    var four_days_prior_JS = mm2 + '/' + dd2 + '/' + yyyy2;
    var stock_ticker = data["Stock Ticker"];

    var apiKey = "REHgZFPuj_3cxTxuwvsn";
    var url = `https://www.quandl.com/api/v3/datasets/EOD/${stock_ticker}?start_date=${four_days_prior_API}&end_date=${lastDate_API}&api_key=${apiKey}`;

    //console.log(url)

    var stock_price_difference;

    d3.json(url)
    .then(function(response) {

      //console.log("DANIEL -- DO YOUR THING HERE");
      //console.log(data.dataset.data); // work with this as you see fit

      var endDate = response.dataset.end_date;
      var startDate = response.dataset.start_date;

      var stock_information = response.dataset.data; 

      var openingPrices = [];

      for(i = 0; i < stock_information.length; i++){
        var openingPrice = stock_information[i][1];
        openingPrices.push(openingPrice);
      }; 

      var lastDate_opening_stock_price = Number(openingPrices[0]);
      var four_days_prior_opening_stock_price = Number(openingPrices[(openingPrices.length-1)]);
      stock_price_difference = lastDate_opening_stock_price - four_days_prior_opening_stock_price;
      
      console.log(response.dataset.name)
      console.log(endDate)
      console.log(startDate)
      console.log(openingPrices)
      console.log(lastDate_opening_stock_price)
      console.log(four_days_prior_opening_stock_price)
      console.log(stock_price_difference)


    });

    var stock_price = -0.25;
    var marker = new L.Marker([+data.Latitude, +data.Longitude], {icon: stockColor(stock_price)});
    console.log(stock_price_difference)

    marker.desc = data.Name;
    myMap.addLayer(marker);
    oms.addMarker(marker);

  }

});

var oms = new OverlappingMarkerSpiderfier(myMap, {keepSpiderfied: true});

var popup = new L.Popup();

oms.addListener('click', function(marker) {
  popup.setContent(marker.desc);
  popup.setLatLng(marker.getLatLng());
  myMap.openPopup(popup);
});

/*
var jsondata;

function doSomethingWithData() {
  console.log(jsondata);
}

d3.json(dataPath, function(dataFromServer) {
  jsondata = dataFromServer;
  doSomethingWithData();
})

function doSomethingWithData(jsondata) {
  console.log(jsondata);
}

d3.json(dataPath, doSomethingWithData);

*/