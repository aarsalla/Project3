import os

import pandas as pd
import numpy as np

#from config import remote_db_endpoint, remote_db_port
#from config import remote_gwsis_dbname, remote_gwsis_dbuser, remote_gwsis_dbpwd
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

remote_db_endpoint=os.environ['remote_db_endpoint']
remote_db_port=os.environ['remote_db_port']
remote_gwsis_dbname=os.environ['remote_gwsis_dbname']
remote_gwsis_dbuser=os.environ['remote_gswis_dbuser']
remote_gwsis_dbpwd=os.environ['remote_gwsis_dbpwd']

app = Flask(__name__)



app.config["SQLALCHEMY_DATABASE_URI"] = f"mysql+pymysql://root:{remote_gwsis_dbpwd}@codingbootcamp.ctxjv3tnsa2p.us-east-2.rds.amazonaws.com/marchmadness"
db = SQLAlchemy(app)

Base = automap_base()
Base.prepare(db.engine, reflect=True)

data_base_table = Base.classes.earnings

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/map")
def map_visual():
    return render_template("map.html")

@app.route("/charts")
def chart_visual():
    return render_template("charts.html")
    
@app.route("/data")
def table():
    return render_template("data.html")

@app.route("/x")
def samples():
   
    stmt = db.session.query(data_base_table).statement
    df = pd.read_sql_query(stmt, db.session.bind)
    data = df.to_dict()

    return (
    jsonify(data)
    )

@app.route("/list")
def list_data():
    stmt = db.session.query(data_base_table).statement
    df = pd.read_sql_query(stmt, db.session.bind)
    data_list = {
        "Index": df.level_0.values.tolist(),
        "Stock": df['Stock Name'].values.tolist(),
        "Reported Date": df['Reported Date'].values.tolist(),
        "Earnings Per Share": df['Earnings Per Share'].values.tolist(),
        "Forecasted Earnings Per Share": df['Forecasted Earnings Per Share'].values.tolist(),
        "% Surprise": df['% Surprise'].values.tolist()
    }
    return (
    jsonify(data_list)
    )

@app.route("/dict")
def list_dict():
    stmt = db.session.query(data_base_table).statement
    df = pd.read_sql_query(stmt, db.session.bind)
    list_dict = []
    for index, row in df.iterrows():
        x = {"Index": row['level_0'],
        "Stock Name": row['Stock Name'],
        "Reported Date": row['Reported Date'],
        "Earnings Per Share": row['Earnings Per Share'],
        "Forecasted Earnings Per Share": row['Forecasted Earnings Per Share'],
        "% Surprise": row['% Surprise'],}
        list_dict.append(x)

    return(jsonify(list_dict))

@app.route("/names")
def names():
    """Return a list of sample names."""

    # Use Pandas to perform the sql query
    stmt = db.session.query(data_base_table).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    # Return a list of the column names (sample names)
    return jsonify(list(df.columns)[2:])

if __name__ == "__main__":
    app.run()
