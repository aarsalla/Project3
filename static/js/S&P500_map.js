// Create the tile layer that will be the background of our map
var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: 'sk.eyJ1Ijoia2ltODY2IiwiYSI6ImNqdWJnOGhxNzA4MnYzeXF5eHN4aDBrcXgifQ.jkpEQO7HSRwn6DcqFG25Gg'
});//.addTo(myMap);

// Initialize all of the LayerGroups we'll be using
var layers = {
  Industrials: new L.LayerGroup(),
  Health_Care: new L.LayerGroup(),
  Information_Technology: new L.LayerGroup(),
  Communication_Services: new L.LayerGroup(),
  Consumer_Discretionary: new L.LayerGroup(),
  Utilities: new L.LayerGroup(),
  Financials: new L.LayerGroup(),
  Materials: new L.LayerGroup(),
  Real_Estate: new L.LayerGroup(),
  Consumer_Staples: new L.LayerGroup(),
  Energy: new L.LayerGroup()
};

// Create a map object
var myMap = L.map("map2", {
  center: [38.816419, -41.512769],
  zoom: 3,
  layers: [
    //layers.Industrials,
    layers.Health_Care,
    layers.Information_Technology,
    //layers.Communication_Services,
    //layers.Consumer_Discretionary,
    //layers.Utilities,
    layers.Financials,
    //layers.Materials,
    //layers.Real_Estate,
    //layers.Consumer_Staples,
    //layers.Energy
  ], 
  zoomControl: false
});

var zoomHome = L.Control.zoomHome();
zoomHome.addTo(myMap);

// Add our 'lightmap' tile layer to the map
streetmap.addTo(myMap);

// Create an overlays object to add to the layer control
var overlays = {
  "Industrials (66)": layers.Industrials,
  "Health Care (58)": layers.Health_Care,
  "Information Technology (62)": layers.Information_Technology,
  "Communication Services (22)": layers.Communication_Services,
  "Consumer Discretionary (60)": layers.Consumer_Discretionary,
  "Utilities (28)": layers.Utilities,
  "Financials (62)": layers.Financials,
  "Materials (25)": layers.Materials,
  "Real Estate (32)": layers.Real_Estate,
  "Consumer Staples (28)": layers.Consumer_Staples,
  "Energy (26)": layers.Energy
};

// Create a control for our layers, add our overlay layers to it
L.control.layers(null, overlays, {
  collapsed:false,
  position: "bottomright"
}).addTo(myMap);

// Create a legend to display information about our map
var info = L.control({
  position: "bottomleft"
});

// When the layer control is added, insert a div with the class of "legend"
info.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  return div;
};
// Add the info legend to the map
info.addTo(myMap);

var industryCount = {
  Ten_percent_increase: 0,
  Five_to_Ten_percent_increase:0,
  Zero_to_Five_percent_increase:0,
  Zero_to_Five_percent_decrease:0,
  Five_to_Ten_percent_decrease:0,
  Ten_percent_decrease:0
};

d3.csv("static/data/S&P500_Coordinations.csv").then(function(csvData) {
  csvData.forEach((data) => {

    var today = new Date()
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var lastDate_API = yyyy + '-' + mm + '-' + dd;
    var lastDate_JS = mm + '/' + dd + '/' + yyyy;

    /*
    var four_days_prior = new Date(Date.now() - 4 * 24 * 60 * 60 * 1000);
    var dd2 = String(four_days_prior.getDate()-1).padStart(2, '0');
    var mm2 = String(four_days_prior.getMonth() + 1).padStart(2, '0');
    var yyyy2 = four_days_prior.getFullYear();
    var four_days_prior_API = yyyy2 + '-' + mm2 + '-' + dd2;
    var four_days_prior_JS = mm2 + '/' + dd2 + '/' + yyyy2;
    */
    
    var thirty_days_prior = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    var dd2 = String(thirty_days_prior.getDate()-1).padStart(2, '0');
    var mm2 = String(thirty_days_prior.getMonth() + 1).padStart(2, '0');
    var yyyy2 = thirty_days_prior.getFullYear();
    var thirty_days_prior_API = yyyy2 + '-' + mm2 + '-' + dd2;
    var thirty_days_prior_JS = mm2 + '/' + dd2 + '/' + yyyy2;

    var stock_ticker = data["Stock Ticker"];

    var apiKey = "REHgZFPuj_3cxTxuwvsn";
    var url = `https://www.quandl.com/api/v3/datasets/EOD/${stock_ticker}?start_date=${thirty_days_prior_API}&end_date=${lastDate_API}&api_key=${apiKey}`;

    d3.json(url).then(function (response, csvData) {

      var endDate = response.dataset.end_date;
      var startDate = response.dataset.start_date;

      var stock_information = response.dataset.data;

      var openingPrices = [];

      //var company_ticker = response.dataset.dataset_code;

      //var slow_moving_averages_total = 0;

      for (i = 0; i < stock_information.length; i++) {
        var openingPrice = stock_information[i][1];
        //slow_moving_averages_total = slow_moving_averages_total + Number(openingPrice)
        openingPrices.push(openingPrice);
      };
  

      var lastDate_opening_stock_price = Number(openingPrices[0]);
      var thirty_days_prior_opening_stock_price = Number(openingPrices[(openingPrices.length - 1)]);
      var stock_price_difference = lastDate_opening_stock_price - thirty_days_prior_opening_stock_price;
      var stock_price_difference_divided = stock_price_difference/lastDate_opening_stock_price;
      var stock_price_difference_percentage = ((stock_price_difference/lastDate_opening_stock_price) * 100).toFixed(2);

      //var slow_moving_averages = (slow_moving_averages_total / (openingPrices.length)).toFixed(2);
      //console.log(slow_moving_averages);
      //console.log(slow_moving_averages_total)
      //var slow_moving_averages = slow_moving_averages_total / slow_moving_averages_pieces;

      var company_name = data.Name;
      var company_sector = data["GICS Sector"];
      //console.log(company_name);
      //console.log(company_sector);

      //Assigning icon to a marker based on stock's industry
      function companyIcon(sector){
        switch(true){
        case (sector == "Industrials"):
          return 'fa-industry'
        case (sector == "Health Care"):
          return 'fa-plus-square'
        case (sector == "Information Technology"):
          return 'fa-info-circle'
        case (sector == "Communication Services"):
          return 'fa-satellite-dish'
        case (sector == "Consumer Discretionary"):
          return 'fa-ad'
        case (sector == "Utilities"):
          return 'fa-lightbulb'
        case (sector == "Financials"):
          return 'fa-dollar-sign'
        case (sector == "Materials"):
          return 'fa-flask'
        case (sector == "Real Estate"):
          return 'fa-sign'
        case (sector == "Consumer Staples"):
          return 'fa-utensils'
        case (sector == "Energy"):
          return 'fa-sun'
        }
      };

      //Assigning a color to the Marker based on Stock performance
      function stockColor(stock_price) {
        switch (true) {
        case (10 < stock_price):
          return 'violet'
        case (10 >= stock_price && stock_price >= 5):
          return 'cyan'
        case (5 > stock_price && stock_price >= 0):
          return 'green-light'
        case (0 > stock_price && stock_price >= -5):
          return 'yellow'
        case (-5 > stock_price && stock_price >= -10):
          return 'orange-dark'
        case (-10 > stock_price):
          return 'red'
        }
      };

      //ExtraMaker with a custom color & icon based on industry & performance
      var testMarker = L.ExtraMarkers.icon({
        icon: companyIcon(company_sector),
        markerColor: stockColor(stock_price_difference_percentage),
        shape: 'star',
        prefix: 'fa'
      });

      //stock_price = lastDate_opening_stock_price;
      var marker = new L.Marker([+data.Latitude, +data.Longitude], { icon: testMarker });

      //Whenever a user clicks on a marker, it will zoom in to level 6
      marker.on("click", function(event) {
        myMap.setView(marker.getLatLng(), 6);
      }, marker);

      //Date Formatting
      var [yyyy, mm, dd] = endDate.split("-");
      var [yyyy2, mm2, dd2] = startDate.split("-");
      var endDate_reformtted = `${mm}-${dd}-${yyyy}`;
      startDate_reformatted = `${mm2}-${dd2}-${yyyy2}`;

      //Marker description
      marker.desc = "<h2>" + company_name + "</h2> Opening Stock Price on " + endDate_reformtted + ":   $<b>" + lastDate_opening_stock_price + "</b>" +
      "<br> Opening Stock Price on " + startDate_reformatted + ":   $<b>" + thirty_days_prior_opening_stock_price + "</b>" +
      "<br> Percent Change over last 30 days:   " + "<b>" + stock_price_difference_percentage + "%</b>" +
      "<br> Company Sector:   " + "<b>" + company_sector + "</b>";
      //"<br> Slow Moving Averages over last 30 days:   $" + "<b>" + slow_moving_averages + "</b>";
      
      //to replace a space with an underscore sign
      company_sector_layer_name = company_sector.replace(/ /g,"_");
      //console.log(company_sector_layer_name);

      //Assign a stock price difference to one of the groups
      function stockPerformance(stock_price) {
        switch (true) {
        case (10 < stock_price):
          return 'Ten_percent_increase'
        case (10 >= stock_price && stock_price >= 5):
          return 'Five_to_Ten_percent_increase'
        case (5 > stock_price && stock_price >= 0):
          return 'Zero_to_Five_percent_increase'
        case (0 > stock_price && stock_price >= -5):
          return 'Zero_to_Five_percent_decrease'
        case (-5 > stock_price && stock_price >= -10):
          return 'Five_to_Ten_percent_decrease'
        case (-10 > stock_price):
          return 'Ten_percent_decrease'
        //defualt:
          //return redIcon;
        }
      };

      /*
      if (stock_price_difference_percentage > 10) {
        var stockStatus = "Ten_percent_increase";
      }
      */

      var stockStatus = stockPerformance(stock_price_difference_percentage)
      //console.log(stockStatus)

      industryCount[stockStatus]++;

      // Add the new marker to the appropriate layer
      marker.addTo(layers[company_sector_layer_name]);

      //myMap.addLayer(marker);

      oms.addMarker(marker);

      var popup = new L.Popup();

      oms.addListener('click', function (marker) {
        popup.setContent(marker.desc);
        popup.setLatLng(marker.getLatLng());
        myMap.openPopup(popup);
      });

      sp_startDate_reformatted = startDate_reformatted;

         // Call the updateLegend function, which will... update the legend!
      updateLegend(endDate_reformtted, industryCount);
    });
  });
});

var sp_startDate_reformatted;

// Update the legend's innerHTML with the last updated times and how companies are faring
function updateLegend(time, industryCount) {
  document.querySelector(".legend").innerHTML = [
    "<p>" + sp_startDate_reformatted + " to " + time + "</p>" +
    "<p class='ten-percent-increase'>>10% increase: " + industryCount.Ten_percent_increase + "</p>",
    "<p class='five-to-ten-increase'>5 to 9.99% increase: " + industryCount.Five_to_Ten_percent_increase + "</p>",
    "<p class='zero-to-five-increase'>0 to 4.99% increase: " + industryCount.Zero_to_Five_percent_increase + "</p>",
    "<p class='zero-to-five-decrease'>-4.99 to 0% decrease: " + industryCount.Zero_to_Five_percent_decrease + "</p>",
    "<p class='five-to-ten-decrease'>-9.99 to -5% decrease: " + industryCount.Five_to_Ten_percent_decrease + "</p>",
    "<p class='ten-percent-decrease'>>10% decrease: " + industryCount.Ten_percent_decrease + "</p>",
  ].join("");
}

var oms = new OverlappingMarkerSpiderfier(myMap, { keepSpiderfied: true });