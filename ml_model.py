# File for the code of the Machine Learning Model

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, r2_score

data = pd.read_csv('data/cleaned_data/players_17.csv') # Load data from the provided sample data file

# Data preprocessing
# You can further preprocess the data based on your model requirements

# Feature selection (select relevant columns)
selected_features = ['Age', 'Overall', 'Potential', 'International Reputation', 'BallControl', 'Acceleration', 'Strength']
X = data[selected_features]
y = data['Best Position']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42) # Train-test split

# Data normalization and standardization
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Model initialization, training, and evaluation
model = LogisticRegression(max_iter=1000)
model.fit(X_train_scaled, y_train)
y_pred = model.predict(X_test_scaled)

# Model performance evaluation
accuracy = accuracy_score(y_test, y_pred)
r_squared = r2_score(y_test, y_pred)

print(f"Model Accuracy: {accuracy:.2f}")
print(f"R-squared: {r_squared:.2f}")

# Model optimization and evaluation process (this can be documented in a CSV/Excel or within the script)
# You can record model parameters, preprocessing steps, and performance metrics in each iteration

# Display overall model performance
print("Overall Model Performance:")
print(f"Accuracy: {accuracy:.2f}")
print(f"R-squared: {r_squared:.2f}")

# GitHub Documentation: Ensure you have a well-structured GitHub repository with proper README and .gitignore
# This part can't be implemented here as it involves setting up and managing a GitHub repository.
# Group Presentation: Prepare your group presentation based on the outlined requirements
# This part can't be implemented here as it involves creating presentation content and delivering it.