var apiKey = "REHgZFPuj_3cxTxuwvsn";
console.log(apiKey);
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
function getdata(stock) {
  d3.json("/dict")
    .then(data => {
      console.log(data);
      //filter data for graphs
      var filter_data = data.filter(d => d["Stock Name"] === stock);
      console.log(filter_data);
      var earnings = filter_data.map(d => +d["Earnings Per Share"]);
      var ReportedDate = filter_data.map(d => d["Reported Date"]);
      var forecasted = filter_data.map(
        d => +d["Forecasted Earnings Per Share"]
      );
      var surprise = filter_data.map(d => d["% Surprise"]);
      //stock quartly graphs
   
   console.log(ReportedDate)
   var i
   for (i=0; i<4; i++){
     var clear = d3.select(`#text${i}`)
     clear.html("")
       d3.select(`#text${i}`).append("h3").text(`Earnings Percent Change Vs. Forecasted: ${surprise[i]}%`).classed('chart-header', true)
     //  d3.select("#surprise1").text(`Earnings Percent Change Vs. Forecasted: ${surprise[1]}%`)
     //  d3.select("#surprise2").text(`Earnings Percent Change Vs. Forecasted: ${surprise[2]}%`)
     //  d3.select("#surprise3").text(`Earnings Percent Change Vs. Forecasted: ${surprise[3]}%`)
     
        d3.select(`#text${i}`).append("h4").text(`Earnings Report Date: ${ReportedDate[i]}`).classed('chart-subheader', true)
        d3.select(`#text${i}`).append("hr")
     //  d3.select("#report1").text(`Earnings Report Date: ${ReportedDate[1]}`)
     //  d3.select("#report2").text(`Earnings Report Date: ${ReportedDate[2]}`)
     //  d3.select("#report3").text(`Earnings Report Date: ${ReportedDate[3]}`)
   }

  //Q1
    var start_q1 = new Date(ReportedDate[0])
    var dd = String(start_q1.getDate()-1).padStart(2, '0');
    var mm = String(start_q1.getMonth() + 1).padStart(2, '0');
    var yyyy = start_q1.getFullYear();
    var date_q1 = yyyy + '-' + mm + '-' + dd;
    var date_title_1 = mm + '/' + dd + '/' + yyyy;
    
    if (mm === '12'){
        var dd2 = String(start_q1.getDate()-1).padStart(2, '0');
        var mm2 = "01";
        var yyyy2 = start_q1.getFullYear() + 1;
      } else if (mm === "01") {
        var dd2 = String(start_q1.getDate() - 3).padStart(2, "0");
        var mm2 = String(start_q1.getMonth() + 2).padStart(2, "0");
        var yyyy2 = start_q1.getFullYear();
      } else {
        var dd2 = String(start_q1.getDate() - 1).padStart(2, "0");
        var mm2 = String(start_q1.getMonth() + 2).padStart(2, "0");
        var yyyy2 = start_q1.getFullYear();
      }
      var month_q1 = yyyy2 + "-" + mm2 + "-" + dd2;

      console.log(surprise[0]);
      var url = `https://www.quandl.com/api/v3/datasets/EOD/${stock}?start_date=${date_q1}&end_date=${month_q1}&api_key=${apiKey}`;

      d3.json(url).then(function(data) {
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
            color: "#17BECF"
          }
        };
        var data4 = [trace4];
        var layout = {
          title: `${stock} Stock Price after ${date_title_1} Earnings Report`,
          xaxis: {
            range: [startDate, endDate],
            type: "date"
          },
          yaxis: {
            autorange: true,
            type: "linear"
          },
          plot_bgcolor: '#e4e9ec',
      paper_bgcolor:"#e4e9ec"
        };
        Plotly.newPlot("graph0", data4, layout);
      });

     

      //end stock quartly graphs

      //earnings per share graphs
      var trace2 = {
        type: "scatter",
        mode: "lines",
        name: "Actual Earnings Per <br> Share",
        x: ReportedDate,
        y: earnings
      };
      var trace3 = {
        type: "scatter",
        mode: "lines",
        name: "Forecasted Earnings Per <br> Share",
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
        },
        plot_bgcolor: '#e4e9ec',
      paper_bgcolor:"#e4e9ec",
      plot_bordercolor: "white"
      };

      Plotly.newPlot("plot2", data2, layout);

      d3.select('#periods').on('change', function(){
        var clear = d3.select(`#text0`)
     clear.html("")
       d3.select(`#text0`).append("h3").text(`Earnings Percent Change Vs. Forecasted: ${surprise[this.value]}%`).classed('chart-header', true)
     //  d3.select("#surprise1").text(`Earnings Percent Change Vs. Forecasted: ${surprise[1]}%`)
     //  d3.select("#surprise2").text(`Earnings Percent Change Vs. Forecasted: ${surprise[2]}%`)
     //  d3.select("#surprise3").text(`Earnings Percent Change Vs. Forecasted: ${surprise[3]}%`)
     
        d3.select(`#text0`).append("h4").text(`Earnings Report Date: ${ReportedDate[this.value]}`).classed('chart-subheader', true)
        d3.select(`#text0`).append("hr")
//Q2
var start_q2 = new Date(ReportedDate[this.value]);
var dd = String(start_q2.getDate() - 1).padStart(2, "0");
var mm = String(start_q2.getMonth() + 1).padStart(2, "0");
var yyyy = start_q2.getFullYear();
var date_q2 = yyyy + "-" + mm + "-" + dd;
var date_title_2 = mm + "/" + dd + "/" + yyyy;
if (mm === "12") {
  var dd2 = String(start_q2.getDate() - 1).padStart(2, "0");
  var mm2 = "01";
  var yyyy2 = start_q2.getFullYear() + 1;
} else if (mm === "01") {
  var dd2 = String(start_q2.getDate() - 3).padStart(2, "0");
  var mm2 = String(start_q2.getMonth() + 2).padStart(2, "0");
  var yyyy2 = start_q2.getFullYear();
} else {
  var dd2 = String(start_q2.getDate() - 1).padStart(2, "0");
  var mm2 = String(start_q2.getMonth() + 2).padStart(2, "0");
  var yyyy2 = start_q2.getFullYear();
}
var month_q2 = yyyy2 + "-" + mm2 + "-" + dd2;
var url = `https://www.quandl.com/api/v3/datasets/EOD/${stock}?start_date=${date_q2}&end_date=${month_q2}&api_key=${apiKey}`;

d3.json(url).then(function(data) {
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
      color: "#17BECF"
    }
  };
  var data4 = [trace4];
  var layout = {
    title: `${stock} Stock Price after ${date_title_2} Earnings Report`,
    xaxis: {
      range: [startDate, endDate],
      type: "date"
    },
    yaxis: {
      autorange: true,
      type: "linear"
    },
    plot_bgcolor: '#e4e9ec',
      paper_bgcolor:"#e4e9ec"
  };
  Plotly.newPlot("graph0", data4, layout);
});

      })
    })
    .catch(err => console.error(err));
}
function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  });
}

// Submit Button handler
//function handleSubmit() {
// Prevent the page from refreshing
//d3.event.preventDefault();

// Select the input value from the form
//var stock = d3.select("#stockInput").node().value;
//console.log(stock);

// clear the input value
// d3.select("#stockInput").node().value = "";

// Build the plot with the new stock
// buildPlot(stock);
//getdata(stock)
//}

function buildPlot(stock) {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  var end_date = yyyy + "-" + mm + "-" + dd;
  var xx = String(today.getDate()).padStart(2, "0");
  var yy = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var zzzz = today.getFullYear() - 2;
  var start_date = zzzz + "-" + yy + "-" + xx;

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
      },
      plot_bgcolor: '#e4e9ec',
      paper_bgcolor:"#e4e9ec"
    };

    Plotly.newPlot("plot", data, layout);
  });
}

//d3.select("#submit").on("click", handleSubmit);

function getData(dataset) {
  // Prevent the page from refreshing
  // d3.event.preventDefault();

  // Select the input value from the form
  // var stock = d3.select("#stockInput").node().value;
  console.log(dataset);

  // clear the input value
  // d3.select("#stockInput").node().value = "";

  // Build the plot with the new stock
  buildPlot(dataset);
  getdata(dataset);
}
mainPlot();

function mainPlot() {
  var stock_names = [
    "MMM",
    "AXP",
    "AAPL",
    "BA",
    "CAT",
    "CVX",
    "CSCO",
    "KO",
    "DIS",
    "DWDP",
    "XOM",
    "GS",
    "HD",
    "IBM",
    "INTC",
    "JNJ",
    "JPM",
    "MCD",
    "MRK",
    "MSFT",
    "NKE",
    "PFE",
    "PG",
    "TRV",
    "UTX",
    "UNH",
    "VZ",
    "V",
    "WMT",
    "WBA",
    "AMZN",
    "GOOGL",
    "FB"
  ];
  var apiKey = "REHgZFPuj_3cxTxuwvsn";
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  var end_date = yyyy + "-" + mm + "-" + dd;
  var xx = String(today.getDate()).padStart(2, "0");
  var yy = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var zzzz = today.getFullYear() - 2;
  var start_date = zzzz + "-" + yy + "-" + xx;
  
  var start = [];
  var end = [];
  var promises = [];
  for (i = 0; i < 32; i++) {
    var url = `https://www.quandl.com/api/v3/datasets/EOD/${
      stock_names[i]
    }?start_date=${start_date}&end_date=${end_date}&api_key=${apiKey}`;

    var promise = d3.json(url).then(function(data) {
      var name = data.dataset.name;
      var stock = data.dataset.dataset_code;
      var startDate = data.dataset.start_date;
      var endDate = data.dataset.end_date;
      var dates = unpack(data.dataset.data, 0);
      var closingPrices = unpack(data.dataset.data, 1);
      console.log({closingPrices})
      var trace1 = {
        x: dates,
        y: closingPrices,
        type: "scatter",
        mode: "lines",
        name: stock,
       /* hovermode: 'off',
        visible: "legendonly" */
      };
      
      
    
      
      start.push(startDate);
      end.push(endDate);
      return Promise.resolve(trace1)
    });
    promises.push(promise);
  }
 
  Promise.all(promises).then(function(traces) {
    var trace_higher = [];
    var trace_high = [];
    var trace_med = [];
    var trace_low = [];
    var trace_lower = [];
    console.log({traces});
    for (i = 0; i < 32; i++) {
    if (traces[i].y[0]>500){
      
        trace_higher.push(traces[i])
       /* hovermode: 'off',
        visible: "legendonly" */
      
    } else if (traces[i].y[0]>150){
      trace_high.push(traces[i])

    }
    else if (traces[i].y[0]>120){
      trace_med.push(traces[i])}
    else if (traces[i].y[0]>70){
      trace_low.push(traces[i])}
    else {
      
        trace_lower.push(traces[i])
    
  }
}
    var data = trace_lower;
    var layout = {
      title: `Dow Jones Closing Prices (2 Years to Date)`,
      xaxis: {
        range: ["2017-05-01", "2019-05-05"],
        type: "date",
      },
      yaxis: {
        autorange: true,
        type: "linear"
      },
      hovermode: 'closest',
      plot_bgcolor: '#e4e9ec',
      paper_bgcolor:"#e4e9ec"
    };

    var traceLevel = [trace_lower,trace_low,trace_med, trace_high,trace_higher]
  console.log(traceLevel)
    Plotly.newPlot("plot", data, layout);
    var click = document.getElementById('plot') 
    click.on('plotly_click',function(data){
      var stock = data.points[0].data.name
     new_plot = [data.points[0].data,{name: stock}]
     var new_layout = {
      title: `${stock} closing prices`,
      xaxis: {
        range: ["2017-05-01", "2019-05-05"],
        type: "date"
      },
      yaxis: {
        autorange: true,
        type: "linear"
      },
      hovermode: 'closest',
      plot_bgcolor: '#e4e9ec',
      paper_bgcolor:"#e4e9ec"
    };
      Plotly.newPlot("plot", new_plot, new_layout);
      getdata(stock)
      })
/* filtering main graph*/
    d3.select('#filtergraph').on('change', function(){
      var clear_1 = d3.select(`#plot2`)
     clear_1.html("")
     var clear_2 = d3.select(`#graph0`)
     clear_2.html("")
      var valueTraceToPlot = traceLevel[this.value];
      var data = valueTraceToPlot;
    var layout = {
      title: `Dow Jones Closing Prices (2 Years to Date)`,
      xaxis: {
        range: ["2017-05-01", "2019-05-05"],
        type: "date"
      },
      yaxis: {
        autorange: true,
        type: "linear"
      },
      hovermode: 'closest',
      plot_bgcolor: '#e4e9ec',
      paper_bgcolor:"#e4e9ec"
      
    };
    console.log(this.value)
    Plotly.newPlot("plot", data, layout);
    var click = document.getElementById('plot') 
  click.on('plotly_click',function(data){
    var stock = data.points[0].data.name
   new_plot = [data.points[0].data,{name: stock}]
   var new_layout = {
    title: `${stock} closing prices`,
    xaxis: {
      range: ["2017-05-01", "2019-05-05"],
      type: "date"
    },
    yaxis: {
      autorange: true,
      type: "linear"
    },
    hovermode: 'closest',
    plot_bgcolor: '#e4e9ec',
      paper_bgcolor:"#e4e9ec",
      bordercolor: "black"
  };
    Plotly.newPlot("plot", new_plot, new_layout);
    getdata(stock)
    })
    
  
  })
  })}


/*
 //Q2
 var start_q2 = new Date(ReportedDate[1]);
 var dd = String(start_q2.getDate() - 1).padStart(2, "0");
 var mm = String(start_q2.getMonth() + 1).padStart(2, "0");
 var yyyy = start_q2.getFullYear();
 var date_q2 = yyyy + "-" + mm + "-" + dd;
 var date_title_2 = mm + "/" + dd + "/" + yyyy;
 if (mm === "12") {
   var dd2 = String(start_q2.getDate() - 1).padStart(2, "0");
   var mm2 = "01";
   var yyyy2 = start_q2.getFullYear() + 1;
 } else if (mm === "01") {
   var dd2 = String(start_q2.getDate() - 3).padStart(2, "0");
   var mm2 = String(start_q2.getMonth() + 2).padStart(2, "0");
   var yyyy2 = start_q2.getFullYear();
 } else {
   var dd2 = String(start_q2.getDate() - 1).padStart(2, "0");
   var mm2 = String(start_q2.getMonth() + 2).padStart(2, "0");
   var yyyy2 = start_q2.getFullYear();
 }
 var month_q2 = yyyy2 + "-" + mm2 + "-" + dd2;
 var url = `https://www.quandl.com/api/v3/datasets/EOD/${stock}?start_date=${date_q2}&end_date=${month_q2}&api_key=${apiKey}`;

 d3.json(url).then(function(data) {
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
       color: "#17BECF"
     }
   };
   var data4 = [trace4];
   var layout = {
     title: `${stock} Stock Price after ${date_title_2} Earnings Report`,
     xaxis: {
       range: [startDate, endDate],
       type: "date"
     },
     yaxis: {
       autorange: true,
       type: "linear"
     }
   };
   Plotly.newPlot("graph1", data4, layout);
 });

 //Q3
 var start_q3 = new Date(ReportedDate[2]);
 var dd = String(start_q3.getDate() - 1).padStart(2, "0");
 var mm = String(start_q3.getMonth() + 1).padStart(2, "0");
 var yyyy = start_q3.getFullYear();
 var date_q3 = yyyy + "-" + mm + "-" + dd;
 var date_title_3 = mm + "/" + dd + "/" + yyyy;
 console.log(mm);
 if (mm === "12") {
   var dd2 = String(start_q3.getDate() - 1).padStart(2, "0");
   var mm2 = "01";
   var yyyy2 = start_q3.getFullYear() + 1;
 } else if (mm === "01") {
   var dd2 = String(start_q3.getDate() - 3).padStart(2, "0");
   var mm2 = String(start_q3.getMonth() + 2).padStart(2, "0");
   var yyyy2 = start_q3.getFullYear();
 } else {
   var dd2 = String(start_q3.getDate() - 1).padStart(2, "0");
   var mm2 = String(start_q3.getMonth() + 2).padStart(2, "0");
   var yyyy2 = start_q3.getFullYear();
 }
 var month_q3 = yyyy2 + "-" + mm2 + "-" + dd2;
 var url = `https://www.quandl.com/api/v3/datasets/EOD/${stock}?start_date=${date_q3}&end_date=${month_q3}&api_key=${apiKey}`;

 d3.json(url).then(function(data) {
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
       color: "#17BECF"
     }
   };
   var data4 = [trace4];
   var layout = {
     title: `${stock} Stock Price after ${date_title_3} Earnings Report`,
     xaxis: {
       range: [startDate, endDate],
       type: "date"
     },
     yaxis: {
       autorange: true,
       type: "linear"
     }
   };
   Plotly.newPlot("graph2", data4, layout);
 });



 //Q4
 var start_q4 = new Date(ReportedDate[3]);
 var dd = String(start_q4.getDate() - 1).padStart(2, "0");
 var mm = String(start_q4.getMonth() + 1).padStart(2, "0");
 var yyyy = start_q4.getFullYear();
 var date_q4 = yyyy + "-" + mm + "-" + dd;
 var date_title_4 = mm + "/" + dd + "/" + yyyy;
 if (mm === "12") {
   var dd2 = String(start_q4.getDate() - 1).padStart(2, "0");
   var mm2 = "01";
   var yyyy2 = start_q4.getFullYear() + 1;
 } else if (mm === "01") {
   var dd2 = String(start_q4.getDate() - 3).padStart(2, "0");
   var mm2 = String(start_q4.getMonth() + 2).padStart(2, "0");
   var yyyy2 = start_q4.getFullYear();
 } else {
   var dd2 = String(start_q4.getDate() - 1).padStart(2, "0");
   var mm2 = String(start_q4.getMonth() + 2).padStart(2, "0");
   var yyyy2 = start_q4.getFullYear();
 }
 var month_q4 = yyyy2 + "-" + mm2 + "-" + dd2;
 var url = `https://www.quandl.com/api/v3/datasets/EOD/${stock}?start_date=${date_q4}&end_date=${month_q4}&api_key=${apiKey}`;

 d3.json(url).then(function(data) {
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
       color: "#17BECF"
     }
   };
   var data4 = [trace4];
   var layout = {
     title: `${stock} Stock Price after ${date_title_4} Earnings Report`,
     xaxis: {
       range: [startDate, endDate],
       type: "date"
     },
     yaxis: {
       autorange: true,
       type: "linear"
     }
   };
   Plotly.newPlot("graph3", data4, layout);
 });*/
