# Stock Price Analysis after Earnings Reports

## Introduction

This project was made to see what effect a companies earnings report has on the stock price of that specific stock. We have built a full-stack application to visualize the analysis that we have completed. We used the S+P 500 stocks as of May 1st, 2019 to do our analysis. We gathered earnings report data by scraping the web and storing into an AWS database. After that, we used two different APIs (Quandl and Alphavantage) to get stock price and techincal indicators data for each stock. This was also stored in our AWS database. Using Python, we built machine learning algorithms using a variety of different independent variables to predict the stock price 45 days after an earnings report. Using Flask, JavaScript, and HTML we deployed our results to Heroku, which can be found here: http://stock-holders.herokuapp.com/. 

## Charts

We visualized the Dow Jones stocks to give an overview of our data. We have different graphs that have their stock price plotted over the last 2 years. When clicking on a specific stock, you can see the stock price for 30 days after an earnings report. You can cycle through different earnings reports and see the stock price change. There is also a final graph that shows the Forecasted Earnings per Share for that stock and the Actual Earnings per Share.

## Maps

The maps page shows the location for each stocks' headquarters. The color of the marker describes how the stock has been doing recently. Clicking on each marker gives more detailed description for the stock.

## Regression and Machine Learning Analysis

We tried a few different machine learning techniques to try and predict the future stock price. First we tried a linear regression model. We were able to come up with a very accurate model using technical indicators about the stock leading up to the earnings report. It was interesting to note that how well or poorly a company did on their earnings report was not correlated to the future stock price. This means that if a stock price reacts a lot after an earnings report, there is a good chance this is just an overreaction to the report. Even though our model was very accurate, it only returned a maximum return on investment (ROI) of 2%. 

We then tried to use a linear regression model to predict the percent change of the stock price. Since we were using a percent as our dependent variable, we wanted to create a ratio for our independent variables. To do this, we divided each of our variables by the starting stock price so that they were all ratios. Unfortunately, none of the variables were very correlated with the percent change, so we were unable to come up with a very accurate model.

The next idea we had was to try a logistic regression model to see if we could predict if the stock price would go up or down. The model was only slightly better than if we had predicted all stocks going up. 

Finally, we tried a Neural Network model to try and add a non-linear component to the model. This model was not accurate either. The best model we had was the first one we tried. The biggest take away from this analysis was that the companies earnigs reports did not factor much into the stock price 45 days later.

## Built With
* [AWS](https://aws.amazon.com/)
* [Flask](https://www.fullstackpython.com/flask.html)
* [Splinter](https://splinter.readthedocs.io/en/latest/)
* [Beautiful Soup](https://www.crummy.com/software/BeautifulSoup/bs4/doc/)
* [Python](https://www.python.org/)
* [HTML](https://www.w3schools.com/html/)
* [JavaScript](https://www.javascript.com/)
* [Heroku](https://www.heroku.com/)

## Authors
See the list of [contributors](https://github.com/aarsalla/Project3/graphs/contributors) who participated in this project along with individual commit history.
