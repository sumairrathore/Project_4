from flask import Flask, render_template, request, jsonify
from sqlalchemy import create_engine, inspect
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score
import pandas as pd
import os
import joblib

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

'''
def train_and_evaluate_model():
    data_files = [ 'players_17.csv', 'players_18.csv', 'players_19.csv', 'players_20.csv', 'players_21.csv', 'players_22.csv', 'players_23.csv' ]
    all_data = pd.DataFrame()  # Initialize an empty DataFrame
    for data_file in data_files:
        data = pd.read_csv(f'data/cleaned_data/{data_file}')
        all_data = pd.concat([all_data, data], ignore_index=True)
    # Data preprocessing
    selected_features = ['Age', 'Potential', 'International Reputation', 'BallControl', 'Acceleration', 'Strength']
    X = all_data[selected_features]
    y = all_data['Overall']  # Use 'Overall' as the target variable
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    # Data normalization and standardization
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    # Model initialization, training, and evaluation
    model = LinearRegression()
    model.fit(X_train_scaled, y_train)
    y_pred = model.predict(X_test_scaled)
    # Model performance evaluation
    r_squared = r2_score(y_test, y_pred)
    print(f"R-squared: {r_squared:.2f}")
    # Save the trained model using joblib
    joblib.dump(model, 'data/trained_model.pkl')
'''

def train_and_evaluate_model():
    data = pd.read_csv('data/cleaned_data/players_17.csv')
    # Data preprocessing
    selected_features = ['Age', 'Potential', 'International Reputation', 'BallControl', 'Acceleration', 'Strength']
    X = data[selected_features]
    y = data['Overall']  # Use 'Overall' as the target variable
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    # Data normalization and standardization
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    # Model initialization, training, and evaluation
    model = LinearRegression()
    model.fit(X_train_scaled, y_train)
    y_pred = model.predict(X_test_scaled)
    # Model performance evaluation
    r_squared = r2_score(y_test, y_pred)
    print(f"R-squared: {r_squared:.2f}")

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
def ml_model():
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
    return render_template('ml_model.html', players=players)

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
    train_and_evaluate_model()  # Replace with your actual function to train and evaluate the model
    # Run the Flask application
    app.run(debug=True)