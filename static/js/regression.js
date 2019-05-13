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

function getstock(stock) {
    var start_date = moment().subtract(5, 'days').format('YYYY-MM-DD');
    var end_date = moment().format('YYYY-MM-DD');
    var url = `https://www.quandl.com/api/v3/datasets/EOD/${stock}?start_date=${start_date}&end_date=${end_date}&api_key=${QapiKey}`;
    
    d3.json(url).then(function(data) {
    var closingPrices = unpack(data.dataset.data, 1)[0];
    console.log({closingPrices});

    var url_20 = `https://www.alphavantage.co/query?function=SMA&symbol=${stock}&interval=daily&time_period=20&series_type=close&apikey=${AAapiKey}`;
    
    d3.json(url_20).then(function(data) {
    var sma20_data = data["Technical Analysis: SMA"];
    console.log({sma20_data});

        var sma20_value = sma20_data[end_date]
        
        if (typeof(sma20_value == undefined)) {
            var newDate = moment().subtract(3, 'days').format('YYYY-MM-DD')
                var sma20_value = sma20_data[newDate]}
        else
            {var sma20_value = sma20_data[end_date]
            }
            console.log({sma20_value});

    var url_5 = `https://www.alphavantage.co/query?function=SMA&symbol=${stock}&interval=daily&time_period=5&series_type=close&apikey=${AAapiKey}`;

    d3.json(url_5).then(function(data) {
    var sma5_data = data["Technical Analysis: SMA"];
    console.log({sma5_data});

        var sma5_value = sma5_data[end_date]
        
        if (typeof(sma5_value == undefined)) {
            var newDate = moment().subtract(3, 'days').format('YYYY-MM-DD')
                var sma5_value = sma5_data[newDate]}
        else
            {var sma5_value = sma5_data[end_date]
            }
            console.log({sma5_value});


    var url_bBands = `https://www.alphavantage.co/query?function=BBANDS&symbol=${stock}&interval=daily&time_period=5&series_type=close&nbdevup=2&nbdevdn=2&apikey=${AAapiKey}`

    d3.json(url_bBands).then(function(data) {
    var bBands_data = data["Technical Analysis: BBANDS"];
    console.log({bBands_data});

        var bBands_value = bBands_data[end_date]
        
        if (typeof(bBands_value == undefined)) {
            var newDate = moment().subtract(3, 'days').format('YYYY-MM-DD')
                var bBands_value = bBands_data[newDate]}
        else
            {var bBands_value = bBands_data[end_date]
            }
            console.log({bBands_value});
})
})
})
})

}
// var prediction = 

// Next Day Prices = .6037 * quandl
// 20 Day = -.5139 * sma20
// 5 Day = .9875 *sma5
// Lower Band = -.0707 * BBands
// % Surprise = .0151 * user input
// model.intercept = .5137 (add at end)

// building out input fields in html
