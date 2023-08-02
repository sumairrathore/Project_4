from flask import Flask, render_template, request, jsonify
from sqlalchemy import create_engine, inspect
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
import pandas as pd
import os
import ml_model

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

@app.route('/')
def index():
    # Create a SQLAlchemy engine to connect to the database
    engine = create_engine('sqlite:///data/db/project4db.db')
    # Query the required columns from all the tables
    tables = ['players_17', 'players_18', 'players_19', 'players_20', 'players_21', 'players_22', 'players_23']
    # Fetch the results from each table and concatenate them
    players = []
    for table in tables:
        query = f"SELECT * FROM {table} LIMIT 100"
        results = engine.execute(query)
        players += [dict(row) for row in results]
    # Render the index.html template and pass the players data to it
    return render_template('index.html', players=players)

@app.route('/player')
def player():
    # Create a SQLAlchemy engine to connect to the database
    engine = create_engine('sqlite:///data/db/project4db.db')
    # Query the required columns from all the tables
    tables = ['players_17', 'players_18', 'players_19', 'players_20', 'players_21', 'players_22', 'players_23']
    # Fetch the results from each table and concatenate them
    players = []
    for table in tables:
        # Query the unique values from the `short_name` column of the `players` table
        query = f"SELECT DISTINCT Name FROM {table}"
        results = engine.execute(query)
        players = [row[0] for row in results]
    # Render the player.html template and pass the players data to it
    return render_template('player.html', players=players)

@app.route('/ml_model')
def ml_model_info():
    table = request.args.get('table', 'players_17')
    selectedPlayer = request.args.get('selectedPlayer', '')
    engine = create_engine('sqlite:///data/db/project4db.db')
    query = f"SELECT Name, Age, Nationality, Club FROM {table} WHERE Name = '{selectedPlayer}'"
    results = engine.execute(query)
    players = [dict(row) for row in results]
    # Add a predicted rating to each player's data
    for player in players:
        ml_model_info = {
            'Age': player['Age'],
            'Nationality': player['Nationality'],
            'Club': player['Club']
        }
        player['PredictedRating'] = ml_model.predict_player_rating(ml_model_info)  # Replace with your actual prediction function
    return jsonify(players)

# Add a placeholder function for the machine learning model
def predict_player_rating(player_info):
    # Replace this with your actual machine learning model prediction code
    # For example, if your model is a classifier, return the predicted class label.
    # If your model is a regression model, return the predicted rating value.
    return 80.0  # Placeholder value, replace it with the actual prediction

@app.route('/data')
def get_table_data():
    table = request.args.get('table', 'players_17')  # Get the table parameter from the query string, default to 'players_15'
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
    table = request.args.get('table', 'players_17')
    selectedPlayer = request.args.get('selectedPlayer', '')
    engine = create_engine('sqlite:///data/db/project4db.db')
    query = f"SELECT Name, Age, Nationality, Club, Wage FROM {table} WHERE Name = '{selectedPlayer}'"
    results = engine.execute(query)
    players = [dict(row) for row in results]
    for player in players:
        player_info = {
            'Age': player['Age'],
            'Nationality': player['Nationality'],
            'Club': player['Club'],
            'Wage': player['Wage']
        }
    return jsonify(players)

@app.route('/ml_model_info')
def get_ml_model_info():
    table = request.args.get('table', 'players_17')
    selectedPlayer = request.args.get('selectedPlayer', '')
    engine = create_engine('sqlite:///data/db/project4db.db')
    query = f"SELECT Name, Age, Nationality, Club FROM {table} WHERE Name = '{selectedPlayer}'"
    results = engine.execute(query)
    players = [dict(row) for row in results]
    # Add a predicted rating to each player's data
    for player in players:
        ml_model_info = {
            'Age': player['Age'],
            'Nationality': player['Nationality'],
            'Club': player['Club']
        }
        #player['PredictedRating'] = predict_player_rating(ml_model_info)
        # Integrate the actual machine learning model prediction here
        # Replace predict_player_rating() with the prediction function provided by your group members
        # For example: player['PredictedRating'] = ml_model.predict(player_info)
    return jsonify(players)

@app.route('/favicon.ico')
def favicon():
    return '', 204

if __name__ == '__main__':
    # Load all the CSV files into the database
    load_csv_to_database()
    # Initialize, train, and evaluate the machine learning model
    ml_model.train_and_evaluate_model()  # Replace with your actual function to train and evaluate the model
    # Run the Flask application
    app.run(debug=True)