// Create a map object
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 4
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);
apiKey=process.env.quandlkey;
API_KEY=process.env.mapboxkey;
/*
// This would replace mapbox. Replace "toner" here with "terrain" or "watercolor" for other options.
var layer = new L.StamenTileLayer("toner");
var myMap = new L.Map("map", {
    center: new L.LatLng(37.09, -95.71),
    zoom: 5
});

myMap.addLayer(layer);
*/


// Create an array that contains Lat & Long for thirty Dow Companies + Amazon/FB/Google 
var corporations = [
  {
    name: "3M",
    ticker: "MMM",
    location: [44.9507206, -92.9954105]
  },
  {
    name: "American Express",
    ticker: "AXP",
    location: [40.7134455, -74.0152721]
  },
  {
    name: "Apple",
    ticker: "AAPL",
    location: [37.33182, -122.03118]
  },
  {
    name: "Boeing",
    ticker: "BA",
    location: [41.8841353, -87.6388427]
  },
  {
    name: "Caterpillar",
    ticker: "CAT",
    location: [40.688667, -89.597323]
  },
  {
    name: "Chevron",
    ticker: "CVX",
    location: [37.7587, -121.95905]
  },
  {
    name: "Cisco",
    ticker: "CSCO",
    location: [37.4083591, -121.9540715]
  },
  {
    name: "Exxon Mobil",
    ticker: "XOM",
    location: [32.89026, -96.94936]
  },
  {
    name: "Goldman Sachs",
    ticker: "GS",
    location: [40.714828, -74.0144025]
  },
  {
    name: "Home Depot",
    ticker: "HD",
    location: [33.8654896, -84.4814083]
  },
  {
    name: "IBM",
    ticker: "IBM",
    location: [41.108918, -73.718875]
  },
  {
    name: "Intel",
    ticker: "INTC",
    location: [37.3875909, -121.9637869]
  },
  {
    name: "Johnson & Johnson",
    ticker: "JNJ",
    location: [40.4978883, -74.4430916]
  },
  {
    name: "JPMorgan Chase",
    ticker: "JPM",
    location: [40.75582, -73.97569]
  },
  {
    name: "McDonald's",
    ticker: "MCD",
    location: [41.8836322, -87.6538373]
  },
  {
    name: "Merck",
    ticker: "MRK",
    location: [40.679799, -74.275249]
  },
  {
    name: "Microsoft",
    ticker: "MSFT",
    location: [47.63962, -122.13061]
  },
  {
    name: "Nike",
    ticker: "NKE",
    location: [45.5077764, -122.8281466]
  },
  {
    name: "Pfizer",
    ticker: "PFE",
    location: [40.7502192, -73.9726673]
  },
  {
    name: "Procter & Gamble",
    ticker: "PG",
    location: [39.1032195, -84.5052772]
  },
  {
    name: "Travelers Companies Inc.",
    ticker: "TRV",
    location: [40.7542603, -73.973587]
  },
  {
    name: "United Health",
    ticker: "UNH",
    location: [44.8973859, -93.4032532]
  },
  {
    name: "United Technologies",
    ticker: "UTX",
    location: [41.7122183, -72.8040708]
  },
  {
    name: "Verizon",
    ticker: "VZ",
    location: [40.7546836, -73.9847556]
  },
  {
    name: "Visa",
    ticker: "V",
    location: [37.5592521, -122.2763649]
  },
  {
    name: "Walmart",
    ticker: "WMT",
    location: [36.3648645, -94.2176775]
  },
  {
    name: "Walgreens",
    ticker: "WBA",
    location: [42.1555553, -87.868761]
  },
  {
    name: "Walt Disney",
    ticker: "DIS",
    location: [34.1583481, -118.3249137]
  },
  {
    name: "Amazon",
    ticker: "AMZN",
    location: [47.6222881, -122.3364939]
  },
  {
    name: "Google",
    ticker: "GOOGL",
    location: [37.4219999, -122.0840575]
  },
  {
    name: "Facebook",
    ticker: "FB",
    location: [37.48493, -122.1482]
  }
];

/*
// Create a function to control the size of the marker, based on stock price fluctuation
function scalarMultiply(arr, multiplier) {
  for (var i = 0; i < arr.length; i++)
  {
     arr[i] *= multiplier;
  }
  return arr;
};
*/

// Looping through the array to get the URL
for (var i =0; i <corporations.length; i++){
  var stock_ticker = corporations[i].ticker;

  //console.log(stock_ticker)

  // Setting up today's date
  var today = new Date()
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  var lastDate_API = yyyy + '-' + mm + '-' + dd;
  var lastDate_JS = mm + '/' + dd + '/' + yyyy;

  // Setting up thirty days prior to today
  var thirty_days_prior = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  var dd2 = String(thirty_days_prior.getDate()-1).padStart(2, '0');
  var mm2 = String(thirty_days_prior.getMonth() + 1).padStart(2, '0');
  var yyyy2 = thirty_days_prior.getFullYear();
  var thirty_days_prior_API = yyyy2 + '-' + mm2 + '-' + dd2;
  var thirty_days_prior_JS = mm2 + '/' + dd2 + '/' + yyyy2;

  /*
  // Setting up four days prior to today 
  var four_days_prior = new Date(Date.now() - 4 * 24 * 60 * 60 * 1000);
  var dd2 = String(four_days_prior.getDate()-1).padStart(2, '0');
  var mm2 = String(four_days_prior.getMonth() + 1).padStart(2, '0');
  var yyyy2 = four_days_prior.getFullYear();
  var four_days_prior_API = yyyy2 + '-' + mm2 + '-' + dd2;
  var four_days_prior_JS = mm2 + '/' + dd2 + '/' + yyyy2;
  */

  //API key for quandl.com - paid by Aimal
  apiKey=process.env.quandlkey

  //Building the URL to use for JSON
  var url = `https://www.quandl.com/api/v3/datasets/EOD/${stock_ticker}?start_date=${thirty_days_prior_API}&end_date=${lastDate_API}&api_key=${apiKey}`;

  //console.log(url)

  //Getting JSON data
  d3.json(url)
    .then(function(response) {
      //console.log("DANIEL -- DO YOUR THING HERE");

      //company_ticker will be used to match JSON data to the array of Lat & Long
      var company_ticker = response.dataset.dataset_code;

      //endDate is the last date available in the JSON
      var endDate = response.dataset.end_date;

      //startDate is the first date available in the JSON file returned - which is not always same as Today (Stock Market closed on Weekends / Holidays)
      var startDate = response.dataset.start_date;

      //This contains all the stock info
      var stock_information = response.dataset.data; 

      var openingPrices = [];

      //Capturing all the Opening Price returned from JSON
      for(i = 0; i < stock_information.length; i++){
        var openingPrice = stock_information[i][1];
        openingPrices.push(openingPrice);
      }; 

      //If I don't convert it using Number(), I get NaN as a return
      var lastDate_opening_stock_price = Number(openingPrices[0]);
      var thirty_days_prior_opening_stock_price = Number(openingPrices[(openingPrices.length-1)]);
      var stock_price_difference = lastDate_opening_stock_price - thirty_days_prior_opening_stock_price;
      var stock_price_difference_percentage = ((stock_price_difference/lastDate_opening_stock_price) * 100).toFixed(2);

      //console.log(response.dataset.name)
      //console.log(company_ticker)
      //console.log(endDate)
      //console.log(startDate)
      //console.log(openingPrices)
      //console.log(lastDate_opening_stock_price)
      //console.log(thirty_days_prior_opening_stock_price)
      //console.log(stock_price_difference)
      
      //for loop to get the lat & long
      for (var i =0; i <corporations.length; i++){
        if (company_ticker == corporations[i].ticker){
          var lat_and_long = corporations[i].location;
          var company_name = corporations[i].name;
        }
      };


      /*
      //Controlling the size of the icon
      var size_factor = (1 - (stock_price_difference/lastDate_opening_stock_price))*1.5;
      */


      /*
      //https://github.com/pointhi/leaflet-color-markers/blob/master/README.md (custom Marker)
      var greenIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png$',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: scalarMultiply([25, 40], size_factor),
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      var yellowIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: scalarMultiply([25, 40], size_factor),
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      
      var redIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: scalarMultiply([25, 40], size_factor),
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      */

      // Assigning Color of the Marker based on stock performance
      function stockColor(stock_price) {
        switch (true) {
        case (1 < stock_price):
          return greenMarker
        case (-1 < stock_price && stock_price < 1):
          return yellowMarker
        case (-1 > stock_price):
          return redMarker
        //defualt:
          //return redIcon;
        }
      };

      // Pulling the company ticker and turning into lower case
      var image_variable = company_ticker.toLowerCase();

      // Creating a link to the company log.png file
      var rotating_image = `<img class='stock-icon' src='static/js/Images/${image_variable}.png'/>`;

      // Custom Markers
      var redMarker = L.ExtraMarkers.icon({
        icon: 'fa-coffee',
        innerHTML: rotating_image,
        markerColor: 'orange-dark',
        shape: 'star',
        prefix: 'fa'
      });
    
      var greenMarker = L.ExtraMarkers.icon({
        icon: 'fa-coffee',
        innerHTML: rotating_image,
        markerColor: 'green-light',
        shape: 'star',
        prefix: 'fa'
      });

      var yellowMarker = L.ExtraMarkers.icon({
        icon: 'fa-coffee',
        innerHTML: rotating_image,
        markerColor: 'yellow',
        shape: 'star',
        prefix: 'fa'
      });
      
      /*
      var logoMarkerStyle = L.Icon.extend({
        options: {
        iconSize: [25, 40],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
        }
      }); 

      var logo_3M = new logoMarkerStyle({iconUrl: 'Images/mmm.png'});
      */

      // Creating a marker
      var marker = new L.marker(lat_and_long, {icon: stockColor(stock_price_difference_percentage)});

      var [yyyy, mm, dd] = endDate.split("-");
      var [yyyy2, mm2, dd2] = startDate.split("-");
      var endDate_reformtted = `${mm}-${dd}-${yyyy}`;
      var startDate_reformatted = `${mm2}-${dd2}-${yyyy2}`;

      // Description for a popup
      marker.desc = "<h2>" + company_name + "</h2> <hr> Stock Price on " + endDate_reformtted + ":   $<b>" + lastDate_opening_stock_price + "</b>" +
        "<br> Stock Price on " + startDate_reformatted + ":   $<b>" + thirty_days_prior_opening_stock_price + "</b>" +
        "<br> Percent Change over last 30 days:   " + "<b>" + stock_price_difference_percentage + "%</b>";
      
      //var tdate = [endDate.slice(-4), endDate.slice(0,5)].join('-');
      

      //console.log(revdate)

      myMap.addLayer(marker);
      oms.addMarker(marker);
  });
};

// This is to use Spiderfier 
var oms = new OverlappingMarkerSpiderfier(myMap, {keepSpiderfied: true});

var popup = new L.Popup();

oms.addListener('click', function(marker) {
  popup.setContent(marker.desc);
  popup.setLatLng(marker.getLatLng());
  myMap.openPopup(popup);
});
