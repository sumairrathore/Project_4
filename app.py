from flask import Flask, render_template, jsonify, request
from sqlalchemy import create_engine, inspect
import pandas as pd
import os
import sqlite3
import pickle

app = Flask(__name__)

def load_csv_to_database():
    # Create a SQLAlchemy engine to connect to the database
    engine = create_engine('sqlite:///data/db/project4db.db')
    inspector = inspect(engine)
    # Get a list of all CSV files in the data directory
    csv_files = [file for file in os.listdir('data/cleaned_data') if file.endswith('.csv')]
    # Load each CSV file into the database
    for file in csv_files:
        table_name = file.split('.')[0]
        # Check if the table already exists in the database
        if not inspector.has_table(table_name):
            csv_file = os.path.join('data/cleaned_data', file)
            # Read the CSV file into a pandas DataFrame
            df = pd.read_csv(csv_file)
            # Insert the DataFrame into the database table
            df.to_sql(table_name, engine, if_exists='replace', index=False)

# Load the machine learning model
with open('path_to_your_model.pkl', 'rb') as file:
    model = pickle.load(file)

# Function to predict next year's stats using the model
def predict_next_year_stats(data):
    # Process the data if needed and prepare it for prediction
    # For example, you might need to convert categorical variables or scale the data
    
    # Assuming 'data' is already in the right format for prediction
    predictions = model.predict(data)
    return predictions

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_predictions', methods=['POST'])
def get_predictions():
    # Connect to your SQLite database
    conn = sqlite3.connect('data/db/project4db.db')
    cursor = conn.cursor()

    # Fetch the data from the database (Assuming you have a table called 'players')
    cursor.execute('SELECT * FROM players')
    data = cursor.fetchall()
    
    # Process the data if needed and prepare it for prediction
    # For example, you might need to convert categorical variables or scale the data

    # Predict next year's stats using the model
    predictions = predict_next_year_stats(data)

    # Close the database connection
    conn.close()

    return jsonify(predictions.tolist())

@app.route('/player')
def player():
    # Create a SQLAlchemy engine to connect to the database
    engine = create_engine('sqlite:///data/db/project4db.db')
    # Query the required columns from all the tables
    tables = ['FIFA17_official_data', 'FIFA18_official_data', 'FIFA19_official_data', 'FIFA20_official_data', 'FIFA21_official_data', 'FIFA22_official_data', 'FIFA23_official_data']
    # Fetch the results from each table and concatenate them
    players = []
    for table in tables:
        # Query the unique values from the `Name` column of the table
        query = f"SELECT DISTINCT Name FROM {table}"
        results = engine.execute(query)
        players = [row[0] for row in results]
    # Render the player.html template and pass the players data to it
    return render_template('player.html', players=players)

@app.route('/league')
def league():
    # Create a SQLAlchemy engine to connect to the database
    engine = create_engine('sqlite:///data/db/project4db.db')
    # Query the required columns from all the tables
    tables = ['FIFA17_official_data', 'FIFA18_official_data', 'FIFA19_official_data', 'FIFA20_official_data', 'FIFA21_official_data', 'FIFA22_official_data', 'FIFA23_official_data']
    # Fetch the results from each table and concatenate them
    players = []
    for table in tables:
        # Query the unique values from the `Name` column of the table
        query = f"SELECT DISTINCT Name FROM {table}"
        results = engine.execute(query)
        players = [row[0] for row in results]
    # Render the league.html template and pass the players data to it
    return render_template('league.html', players=players)

@app.route('/map')
def map():
    return render_template('map.html')

@app.route('/data')
def get_table_data():
    table = request.args.get('table', 'FIFA23_official_data')  # Get the table parameter from the query string, default to 'players_15'
    # Create a SQLAlchemy engine to connect to the database
    engine = create_engine('sqlite:///data/db/project4db.db')
    # Query the required columns from the specified table
    query = f"SELECT * FROM {table} LIMIT 100"
    results = engine.execute(query)
    players = [dict(row) for row in results]
    # Return the table data as a JSON response
    return jsonify(players)

@app.route('/player_info')
def get_player_info():
    table = request.args.get('table', 'FIFA23_official_data')  # Get the table parameter from the query string, default to 'players_15'
    selectedPlayer = request.args.get('selectedPlayer', '')  # Get the selectedPlayer parameter from the query string
    # Create a SQLAlchemy engine to connect to the database
    engine = create_engine('sqlite:///data/db/project4db.db')
    # Query the required columns from the specified table
    query = f"SELECT Name, Age, Nationality, Club FROM {table} WHERE Name = '{selectedPlayer}'"
    results = engine.execute(query)
    players = [dict(row) for row in results]
    # Return the table data as a JSON response
    return jsonify(players)

@app.route('/league_info')
def get_league_info():
    table = request.args.get('table', 'FIFA23_official_data')  # Get the table parameter from the query string, default to 'players_15'
    selectedPlayer = request.args.get('selectedPlayer', '')  # Get the selectedPlayer parameter from the query string
    # Create a SQLAlchemy engine to connect to the database
    engine = create_engine('sqlite:///data/db/project4db.db')
    # Query the required columns from the specified table
    query = f"SELECT Name, Age, Nationality, Club FROM {table} WHERE Name = '{selectedPlayer}'"
    results = engine.execute(query)
    leagues = [dict(row) for row in results]
    # Return the table data as a JSON response
    return jsonify(leagues)

@app.route('/favicon.ico')
def favicon():
    return '', 204

if __name__ == '__main__':
    # Load all the CSV files into the database
    load_csv_to_database()
    # Run the Flask application
    app.run(debug=True)
