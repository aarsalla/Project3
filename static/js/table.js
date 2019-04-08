$(document).ready( function () {
d3.json("/dict").then((data)=>{


    var stock_name =data.map(d=>d['Stock Name']);
    var earnings = data.map(d=>+d['Earnings Per Share']);
    var ReportedDate = data.map(d=>d['Reported Date']);
    var forecasted = data.map(d=>+d['Forecasted Earnings Per Share']);
    var surprise = data.map(d=>d['% Surprise']);
    var table = d3.select("tbody")

    console.log(stock_name)
    for (i=0;i<stock_name.length;i++){
       var tr = table.append('tr')
        tr.append('td').text(stock_name[i])
        tr.append('td').text(ReportedDate[i])
        tr.append('td').text(earnings[i])
        tr.append('td').text(forecasted[i])
        tr.append('td').text(surprise[i])
       
    }
    
    $('#myTable').DataTable();

})

});