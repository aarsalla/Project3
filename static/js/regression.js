var AAapiKey = "Z02M5GHXIOQ1A6YI";
var QapiKey = "REHgZFPuj_3cxTxuwvsn";

// Pull stock name (symbol) – drop down from Charts page or let them enter text (need to know symbol)

/**
 * Helper function to select stock data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 * index 0 - Date
 * index 1 - Open
 * index 2 - High
 * index 3 - Low
 * index 4 - Volume
 */
function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  });
}

// Calling closing stock price from Qandl
function getstock(stock, surprise) {
  var start_date = moment()
    .subtract(5, "days")
    .format("YYYY-MM-DD");
    var end_date = moment()
    .subtract(1, "days")
    .format("YYYY-MM-DD")
  var url = `https://www.quandl.com/api/v3/datasets/EOD/${stock}?start_date=${start_date}&end_date=${end_date}&api_key=${QapiKey}`;

  d3.json(url).then(function(data) {
    var closingPrices = unpack(data.dataset.data, 1)[0];
    console.log({ closingPrices });

    // Calling 20 day simple moving average value from Alpha Avantage
    var url_20 = `https://www.alphavantage.co/query?function=SMA&symbol=${stock}&interval=daily&time_period=20&series_type=close&apikey=${AAapiKey}`;

    d3.json(url_20).then(function(data) {
      var sma20_data = data["Technical Analysis: SMA"];
      console.log({ sma20_data });

      var sma20_value = sma20_data[end_date]["SMA"];

      if (typeof (sma20_value == undefined)) {
        var newDate = moment()
          .subtract(1, "days")
          .format("YYYY-MM-DD");
        var sma20_value = sma20_data[newDate]["SMA"];
      } else {
        var sma20_value = sma20_data[end_date]["SMA"];
      }
      console.log({ sma20_value });

      // Calling 5 day simple moving average value from Alpha Avantage
      var url_5 = `https://www.alphavantage.co/query?function=SMA&symbol=${stock}&interval=daily&time_period=5&series_type=close&apikey=${AAapiKey}`;

      d3.json(url_5).then(function(data) {
        var sma5_data = data["Technical Analysis: SMA"];
        console.log({ sma5_data });

        var sma5_value = sma5_data[end_date]["SMA"];

        if (typeof (sma5_value == undefined)) {
          var newDate = moment()
            .subtract(1, "days")
            .format("YYYY-MM-DD");
          var sma5_value = sma5_data[newDate]["SMA"];
        } else {
          var sma5_value = sma5_data[end_date]["SMA"];
        }
        console.log({ sma5_value });

        // Calling Bollinger bands values from Alpha Avantage
        var url_bBands = `https://www.alphavantage.co/query?function=BBANDS&symbol=${stock}&interval=daily&time_period=5&series_type=close&nbdevup=2&nbdevdn=2&apikey=${AAapiKey}`;

        d3.json(url_bBands).then(function(data) {
          var bBands_data = data["Technical Analysis: BBANDS"];
          console.log({ bBands_data });

          var test_date = moment()
          .subtract(1, "days")
          .format("YYYY-MM-DD");

          var bBands_value = bBands_data[test_date]["Real Lower Band"];

          if (typeof (bBands_value == undefined)) {
            var newDate = moment()
              .subtract(1, "days")
              .format("YYYY-MM-DD");
            var bBands_value = bBands_data[newDate]["Real Lower Band"];
          } else {
            var bBands_value = bBands_data[test_date]["Real Lower Band"];
          }
          console.log({ bBands_value });

          var price_prediction =
          0.6037 * closingPrices +
          -0.5139 * sma20_value +
          0.9875 * sma5_value +
          -0.0707 * bBands_value +
          0.0151 * surprise + 
          0.5137;

          var price_prediction_rounded = price_prediction.toFixed(2)

          console.log(surprise)
          console.log(price_prediction)

          if(price_prediction == NaN)
            {
                alert(`Test`)
            }
            else
            {alert(`Stock: ${stock} \nSurprise: ${surprise}% \n45 Day Price Prediction:  $${price_prediction_rounded} per share`);
        }
        });
      });
    });
  });
}

// Submit Button handler
function handleSubmit() {
  // Prevent the page from refreshing
//   d3.event.preventDefault();
  console.log("coming here");

  // Select the input value from the form
  var stockInput = d3.select("#stockInput").node().value;
  console.log(stockInput);

  // Select the input value from the form
  var surpriseInput = d3.select("#surpriseInput").node().value;
  console.log(surpriseInput);

  getstock(stockInput, surpriseInput)

  // Clear the input value for both fields
  d3.select("#stockInput").node().value = "";
  d3.select("#surpriseInput").node().value = "";
  return false;
}
