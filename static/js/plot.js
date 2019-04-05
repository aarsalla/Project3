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
    //filter data for graphs
    var filter_data=data.filter(d=>d['Stock Name']===stock);
    console.log(filter_data);
    var earnings = filter_data.map(d=>+d['Earnings Per Share']);
    var ReportedDate = filter_data.map(d=>d['Reported Date']);
    var forecasted = filter_data.map(d=>+d['Forecasted Earnings Per Share']);
      //stock quartly graphs
   var apiKey = "REHgZFPuj_3cxTxuwvsn";
   console.log(ReportedDate)
  //Q1
    var start_q1 = new Date(ReportedDate[0])
    var apiKey = "REHgZFPuj_3cxTxuwvsn";
    var dd = String(start_q1.getDate()-1).padStart(2, '0');
    var mm = String(start_q1.getMonth() + 1).padStart(2, '0');
    var yyyy = start_q1.getFullYear();
    var date_q1 = yyyy + '-' + mm + '-' + dd;
    var dd2 = String(start_q1.getDate()-3).padStart(2, '0');
    var mm2 = String(start_q1.getMonth() + 2).padStart(2, '0');
    var yyyy2 = start_q1.getFullYear();
    var month_q1 = yyyy2 + '-' + mm2 + '-' + dd2;
    var url = `https://www.quandl.com/api/v3/datasets/EOD/${stock}?start_date=${date_q1}&end_date=${month_q1}&api_key=${apiKey}`;

    d3.json(url).then(function(data){
    var name = data.dataset.name;
    var stock = data.dataset.dataset_code;
    var startDate = data.dataset.start_date;
    var endDate = data.dataset.end_date;
    var dates = unpack(data.dataset.data, 0);
    var closingPrices = unpack(data.dataset.data, 1);
    var trace4 = {
        type: "scatter",
        mode: "lines",
        name: name,
        x: dates,
        y: closingPrices,
        line: {
          color: "#17BECF"}};
      var data4 = [trace4];
      var layout = {
        title: `${stock} Stock Price after Q1 Earnings Report`,
        xaxis: {
          range: [startDate, endDate],
          type: "date"},
        yaxis: {
          autorange: true,
          type: "linear"}};
      Plotly.newPlot('graph0', data4, layout);
    })

      //Q2
      var start_q2 = new Date(ReportedDate[1])
      var apiKey = "REHgZFPuj_3cxTxuwvsn";
      var dd = String(start_q2.getDate()-1).padStart(2, '0');
      var mm = String(start_q2.getMonth() + 1).padStart(2, '0');
      var yyyy = start_q2.getFullYear();
      var date_q2 = yyyy + '-' + mm + '-' + dd;
      var dd2 = String(start_q2.getDate()-3).padStart(2, '0');
      var mm2 = String(start_q2.getMonth() + 2).padStart(2, '0');
      var yyyy2 = start_q2.getFullYear();
      var month_q2 = yyyy2 + '-' + mm2 + '-' + dd2;
      var url = `https://www.quandl.com/api/v3/datasets/EOD/${stock}?start_date=${date_q2}&end_date=${month_q2}&api_key=${apiKey}`;
  
      d3.json(url).then(function(data){
      var name = data.dataset.name;
      var stock = data.dataset.dataset_code;
      var startDate = data.dataset.start_date;
      var endDate = data.dataset.end_date;
      var dates = unpack(data.dataset.data, 0);
      var closingPrices = unpack(data.dataset.data, 1);
      var trace4 = {
          type: "scatter",
          mode: "lines",
          name: name,
          x: dates,
          y: closingPrices,
          line: {
            color: "#17BECF"}};
        var data4 = [trace4];
        var layout = {
          title: `${stock} Stock Price after Q2 Earnings Report`,
          xaxis: {
            range: [startDate, endDate],
            type: "date"},
          yaxis: {
            autorange: true,
            type: "linear"}};
        Plotly.newPlot("graph1", data4, layout);
      })

     //Q3
     var start_q3 = new Date(ReportedDate[2])
     var apiKey = "REHgZFPuj_3cxTxuwvsn";
     var dd = String(start_q3.getDate()-1).padStart(2, '0');
     var mm = String(start_q3.getMonth() + 1).padStart(2, '0');
     var yyyy = start_q3.getFullYear();
     var date_q3 = yyyy + '-' + mm + '-' + dd;
     var dd2 = String(start_q3.getDate()-3).padStart(2, '0');
     var mm2 = String(start_q3.getMonth() + 2).padStart(2, '0');
     var yyyy2 = start_q3.getFullYear();
     var month_q3 = yyyy2 + '-' + mm2 + '-' + dd2;
     var url = `https://www.quandl.com/api/v3/datasets/EOD/${stock}?start_date=${date_q3}&end_date=${month_q3}&api_key=${apiKey}`;
 
     d3.json(url).then(function(data){
     var name = data.dataset.name;
     var stock = data.dataset.dataset_code;
     var startDate = data.dataset.start_date;
     var endDate = data.dataset.end_date;
     var dates = unpack(data.dataset.data, 0);
     var closingPrices = unpack(data.dataset.data, 1);
     var trace4 = {
         type: "scatter",
         mode: "lines",
         name: name,
         x: dates,
         y: closingPrices,
         line: {
           color: "#17BECF"}};
       var data4 = [trace4];
       var layout = {
         title: `${stock} Stock Price after Q3 Earnings Report`,
         xaxis: {
           range: [startDate, endDate],
           type: "date"},
         yaxis: {
           autorange: true,
           type: "linear"}};
       Plotly.newPlot("graph2", data4, layout);
     })

     //Q4
     var start_q4 = new Date(ReportedDate[3])
     var dd = String(start_q4.getDate()-1).padStart(2, '0');
     var mm = String(start_q4.getMonth() + 1).padStart(2, '0');
     var yyyy = start_q4.getFullYear();
     var date_q4 = yyyy + '-' + mm + '-' + dd;
     var dd2 = String(start_q4.getDate()-3).padStart(2, '0');
     var mm2 = String(start_q4.getMonth() + 2).padStart(2, '0');
     var yyyy2 = start_q4.getFullYear();
     var month_q4 = yyyy2 + '-' + mm2 + '-' + dd2;
     var url = `https://www.quandl.com/api/v3/datasets/EOD/${stock}?start_date=${date_q4}&end_date=${month_q4}&api_key=${apiKey}`;
 
     d3.json(url).then(function(data){
     var name = data.dataset.name;
     var stock = data.dataset.dataset_code;
     var startDate = data.dataset.start_date;
     var endDate = data.dataset.end_date;
     var dates = unpack(data.dataset.data, 0);
     var closingPrices = unpack(data.dataset.data, 1);
     var trace4 = {
         type: "scatter",
         mode: "lines",
         name: name,
         x: dates,
         y: closingPrices,
         line: {
           color: "#17BECF"}};
       var data4 = [trace4];
       var layout = {
         title: `${stock} Stock Price after Q4 Earnings Report`,
         xaxis: {
           range: [startDate, endDate],
           type: "date"},
         yaxis: {
           autorange: true,
           type: "linear"}};
       Plotly.newPlot("graph3", data4, layout);
     })
    

   //end stock quartly graphs

   //earnings per share graphs
    var trace2 = {
      type: "scatter",
      mode: "lines",
      name: "Actual Earnings Per Share",
      x: ReportedDate,
      y: earnings 
    };
    var trace3 = {
        type: "scatter",
        mode: "lines",
        name: "Forecasted Earnings Per Share",
        x: ReportedDate,
        y: forecasted 
      };

    var data2 = [trace2, trace3];

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
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var end_date = yyyy + '-' + mm + '-' + dd;
    var xx = String(today.getDate()).padStart(2, '0');
    var yy = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var zzzz = today.getFullYear()-2;
    var start_date = zzzz + '-' + yy + '-' + xx;
  
                
    var url = `https://www.quandl.com/api/v3/datasets/EOD/${stock}?start_date=${start_date}&end_date=${end_date}&api_key=${apiKey}`;
    
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
        
    
d3.select("#submit").on("click", handleSubmit);


    
  
