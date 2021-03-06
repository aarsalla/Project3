//All the buttons
var dow_thirty_days = d3.select("#dowthirty");
var dow_ninety_days = d3.select("#downinety");
var dow_hundred_eighty_days = d3.select("#dowhalfyr");

  // Create a legend to display information about our map
  var dow_info = L.control({
    position: "bottomleft"
  });

  // When the layer control is added, insert a div with the class of "legend"
  dow_info.onAdd = function() {
    var div2 = L.DomUtil.create("div", "legend2");
    return div2;
  };

function dowMap(input_date){
    // Create the tile layer that will be the background of our map
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: 'sk.eyJ1Ijoia2ltODY2IiwiYSI6ImNqdWJnOGhxNzA4MnYzeXF5eHN4aDBrcXgifQ.jkpEQO7HSRwn6DcqFG25Gg'
  });//.addTo(myMap);

  var dowLayers = {
    Industrials: new L.LayerGroup(),
    Health_Care: new L.LayerGroup(),
    Information_Technology: new L.LayerGroup(),
    Communication_Services: new L.LayerGroup(),
    Consumer_Discretionary: new L.LayerGroup(),
    Financials: new L.LayerGroup(),
    Materials: new L.LayerGroup(),
    Consumer_Staples: new L.LayerGroup(),
    Energy: new L.LayerGroup()
  };

  // Create a map object
  var dowMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 4,
      layers: [
      dowLayers.Industrials,
      dowLayers.Health_Care,
      dowLayers.Information_Technology,
      dowLayers.Communication_Services,
      dowLayers.Consumer_Discretionary,
      dowLayers.Financials,
      dowLayers.Materials,
      dowLayers.Consumer_Staples,
      dowLayers.Energy
    ], 
    zoomControl: false
  });


  var zoomHome = L.Control.zoomHome();
  zoomHome.addTo(dowMap);

  // Add our 'lightmap' tile layer to the map
  streetmap.addTo(dowMap);

  // Create an overlays object to add to the layer control
  var dowOverlays = {
    "Industrials (4)": dowLayers.Industrials,
    "Health Care (4)": dowLayers.Health_Care,
    "Information Technology (6)": dowLayers.Information_Technology,
    "Communication Services (4)": dowLayers.Communication_Services,
    "Consumer Discretionary (4)": dowLayers.Consumer_Discretionary,
    "Financials (4)": dowLayers.Financials,
    "Materials (1)": dowLayers.Materials,
    "Consumer Staples (4)": dowLayers.Consumer_Staples,
    "Energy (2)": dowLayers.Energy
  };

  // Create a control for our layers, add our overlay layers to it
  L.control.layers(null, dowOverlays, {
    collapsed:false,
    position: "bottomright"
  }).addTo(dowMap);



  // Add the info legend to the map
  dow_info.addTo(dowMap);

  var performanceCount = {
    Ten_percent_increase: 0,
    Five_to_Ten_percent_increase:0,
    Zero_to_Five_percent_increase:0,
    Zero_to_Five_percent_decrease:0,
    Five_to_Ten_percent_decrease:0,
    Ten_percent_decrease:0
  };


  d3.csv("static/data/DowJonesPlus3_Coordinations.csv").then(function(csvData) {
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
      
      //var thirty_days_prior = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      var thirty_days_prior = input_date;
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

        for (i = 0; i < stock_information.length; i++) {
          var openingPrice = stock_information[i][1];
          openingPrices.push(openingPrice);
        };

        var lastDate_opening_stock_price = Number(openingPrices[0]);
        var thirty_days_prior_opening_stock_price = Number(openingPrices[(openingPrices.length - 1)]);
        var stock_price_difference = lastDate_opening_stock_price - thirty_days_prior_opening_stock_price;
        var stock_price_difference_percentage = ((stock_price_difference/lastDate_opening_stock_price) * 100).toFixed(2);

  
      

        //console.log(response.dataset.name)
        //console.log(endDate)
        //console.log(startDate)
        //console.log(openingPrices)
        //console.log(lastDate_opening_stock_price)
        //console.log(four_days_prior_opening_stock_price)
        //console.log(stock_price_difference)
        //console.log(company_tickser);
        //console.log(stock_ticker);

        var company_name = data.Name;
        var company_sector = data["GICS Sector"];
        //console.log(company_name);

        var image_variable = stock_ticker.toLowerCase();

        var rotating_image = `<img class="stock-icon" src="static/js/Images/${image_variable}.png"/>`;

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


        var dow_testMarker = L.ExtraMarkers.icon({
          icon: 'fa-coffee',
          innerHTML: rotating_image,
          markerColor: stockColor(stock_price_difference_percentage),
          shape: 'star',
          prefix: 'fa'
        });

        //stock_price = lastDate_opening_stock_price;
        var dowMarker = new L.Marker([+data.Latitude, +data.Longitude], {icon: dow_testMarker });

        //Whenever a user clicks on a marker, it will zoom in to level 6
        /*
        marker.on("click", function(event) {
          myMap.setView(marker.getLatLng(), 6);
        }, marker);
        */

        //Date Formatting
        var [yyyy, mm, dd] = endDate.split("-");
        var [yyyy2, mm2, dd2] = startDate.split("-");
        var endDate_reformtted = `${mm}-${dd}-${yyyy}`;
        startDate_reformatted = `${mm2}-${dd2}-${yyyy2}`;

        dowMarker.desc = "<h2>" + company_name + "</h2> Opening Stock Price on " + endDate_reformtted + ":   $<b>" + lastDate_opening_stock_price + "</b>" +
        "<br> Opening Stock Price on " + startDate_reformatted + ":   $<b>" + thirty_days_prior_opening_stock_price + "</b>" +
        "<br> Percent Change over last 30 days:   " + "<b>" + stock_price_difference_percentage + "%</b>" +
        "<br> Company Sector:   " + "<b>" + company_sector + "</b>";
        //"<br> Slow Moving Averages over last 30 days:   $" + "<b>" + slow_moving_averages + "</b>";

        company_sector_layer_name = company_sector.replace(/ /g,"_");

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
          }
        };

        var stockStatus = stockPerformance(stock_price_difference_percentage);

        performanceCount[stockStatus]++;
        //console.log({stockStatus, dowLayers})
        // Add the new marker to the appropriate layer
        dowMarker.addTo(dowLayers[company_sector_layer_name]);

        dow_oms.addMarker(dowMarker);

        var popup = new L.Popup();

        dow_oms.addListener('click', function (dowMarker) {
          popup.setContent(dowMarker.desc);
          popup.setLatLng(dowMarker.getLatLng());
          dowMap.openPopup(popup);
        });

        dow_startDate_reformatted = startDate_reformatted;

        // Call the updateLegend function, which will... update the legend!
        dow_updateLegend(endDate_reformtted, performanceCount);
      });
    });
  });

  var dow_startDate_reformatted;

  // Update the legend's innerHTML with the last updated times and how companies are faring
  function dow_updateLegend(time, performanceCount) {
    document.querySelector(".legend2").innerHTML = [
      "<p> Number of Companies: </p>", 
      "<p class='ten-percent-increase'>>10% increase: " + performanceCount.Ten_percent_increase + "</p>",
      "<p class='five-to-ten-increase'>5 to 9.99% increase: " + performanceCount.Five_to_Ten_percent_increase + "</p>",
      "<p class='zero-to-five-increase'>0 to 4.99% increase: " + performanceCount.Zero_to_Five_percent_increase + "</p>",
      "<p class='zero-to-five-decrease'>-4.99 to 0% decrease: " + performanceCount.Zero_to_Five_percent_decrease + "</p>",
      "<p class='five-to-ten-decrease'>-9.99 to -5% decrease: " + performanceCount.Five_to_Ten_percent_decrease + "</p>",
      "<p class='ten-percent-decrease'>>10% decrease: " + performanceCount.Ten_percent_decrease + "</p>",
      "<p> ("+ dow_startDate_reformatted + "-" + time + ")</p>"
    ].join("");
  }

  var dow_oms = new OverlappingMarkerSpiderfier(dowMap, { keepSpiderfied: true });
};

input_date = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
dowMap(input_date);

dow_thirty_days.on("click", function() {
  console.log("hello!")
  var new_date = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  var dd = String(new_date.getDate()).padStart(2, '0');
  var mm = String(new_date.getMonth() + 1).padStart(2, '0');
  var yyyy = new_date.getFullYear();
  var new_date_formtted = yyyy + '-' + mm + '-' + dd;

  var dd = String(input_date.getDate()).padStart(2, '0');
  var mm = String(input_date.getMonth() + 1).padStart(2, '0');
  var yyyy = input_date.getFullYear();
  var input_date_formatted = yyyy + '-' + mm + '-' + dd;

  if (new_date_formtted == input_date_formatted){
    console.log("same date!")
  } else if (new_date_formtted != input_date_formatted){
      var container = L.DomUtil.get('map');
      if(container != null){
        container._leaflet_id = null;
      }

      input_date = new_date;
      dowMap(input_date);
  }
});

dow_ninety_days.on("click", function() {
  var new_date = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
  var dd = String(new_date.getDate()).padStart(2, '0');
  var mm = String(new_date.getMonth() + 1).padStart(2, '0');
  var yyyy = new_date.getFullYear();
  var new_date_formtted = yyyy + '-' + mm + '-' + dd;

  var dd = String(input_date.getDate()).padStart(2, '0');
  var mm = String(input_date.getMonth() + 1).padStart(2, '0');
  var yyyy = input_date.getFullYear();
  var input_date_formatted = yyyy + '-' + mm + '-' + dd;

  if (new_date_formtted == input_date_formatted){
    console.log("same date!")
  } else if (new_date_formtted != input_date_formatted){
      var container = L.DomUtil.get('map');
      if(container != null){
        container._leaflet_id = null;
      }

      input_date = new_date;
      dowMap(input_date);
  }
});

dow_hundred_eighty_days.on("click", function() {
  var new_date = new Date(Date.now() - 180 * 24 * 60 * 60 * 1000);
  var dd = String(new_date.getDate()).padStart(2, '0');
  var mm = String(new_date.getMonth() + 1).padStart(2, '0');
  var yyyy = new_date.getFullYear();
  var new_date_formtted = yyyy + '-' + mm + '-' + dd;

  var dd = String(input_date.getDate()).padStart(2, '0');
  var mm = String(input_date.getMonth() + 1).padStart(2, '0');
  var yyyy = input_date.getFullYear();
  var input_date_formatted = yyyy + '-' + mm + '-' + dd;

  if (new_date_formtted == input_date_formatted){
    console.log("same date!")
  } else if (new_date_formtted != input_date_formatted){
      var container = L.DomUtil.get('map');
      if(container != null){
        container._leaflet_id = null;
      }

      input_date = new_date;
      dowMap(input_date);
  }
});