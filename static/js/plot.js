/**
 * 
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
function getdata(stock){
  d3.json("/dict").then((data)=>{
    console.log(data)
    var filter_data=data.filter(d=>d['Stock Name']===stock);
    console.log(filter_data);
    var stockName = filter_data.map(d=>d['Stock Name']);
    var earnings = filter_data.map(d=>+d['Earnings Per Share']);
    var ReportedDate = filter_data.map(d=>d['Reported Date']);
    console.log(earnings)

    var trace2 = {
      type: "scatter",
      mode: "lines",
      name: stockName,
      x: ReportedDate,
      y: earnings 
    };
    
    var data2 = [trace2];

    var layout = {
      title: "Earnings per Share on Reported Dates",
      xaxis: {
        type: "string"
      },
      yaxis: {
        autorange: true,
        type: "linear"
      }
    };

    Plotly.newPlot("plot2", data2, layout);
  }).catch(err => console.error(err))
}
function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  });
}

// Submit Button handler
function handleSubmit() {
  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input value from the form
  var stock = d3.select("#stockInput").node().value;
  console.log(stock);

  // clear the input value
  d3.select("#stockInput").node().value = "";

  // Build the plot with the new stock
  buildPlot(stock);
getdata(stock)
}

function buildPlot(stock) {
    var apiKey = "REHgZFPuj_3cxTxuwvsn";

      var url = `https://www.quandl.com/api/v3/datasets/WIKI/${stock}.json?start_date=2017-04-03&end_date=2019-03-29&api_key=${apiKey}`;
    
      d3.json(url).then(function(data) {
  
        var name = data.dataset.name;
        var stock = data.dataset.dataset_code;
        var startDate = data.dataset.start_date;
        var endDate = data.dataset.end_date;
        var dates = unpack(data.dataset.data, 0);
        var closingPrices = unpack(data.dataset.data, 1);
       
        var trace1 = {
          type: "scatter",
          mode: "lines",
          name: name,
          x: dates,
          y: closingPrices,
          line: {
            color: "#17BECF"
          }
        };
    
        var data = [trace1];
    
        var layout = {
          title: `${stock} closing prices`,
          xaxis: {
            range: [startDate, endDate],
            type: "date"
          },
          yaxis: {
            autorange: true,
            type: "linear"
          }
        };
    
        Plotly.newPlot("plot", data, layout);})}
        
        /*var url="/list";
        function buildPlot() {
          d3.json(url).then(function(response) {
           
            console.log(response);
            var trace2 = {
              type: "scatter",
              mode: "lines",
              name: name,
              x: response.map(list=>list['Reported Date'].value),
              y: response.map(list=>list['Earnings Per Share'].value)
            };
            
            var data = [trace2];

            var layout = {
              title: "Earnings per Share on Reported Dates",
              xaxis: {
                type: "date"
              },
              yaxis: {
                autorange: true,
                type: "linear"
              }
            };
        
            Plotly.newPlot("plot2", data, layout);
          });
        }
        
        buildPlot();*/

        // Add event listener for submit button
d3.select("#submit").on("click", handleSubmit);