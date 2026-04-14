import os
import mysql.connector
import json
from flask import *
from mysql.connector import errorcode
from dotenv import load_dotenv
from flask_cors import CORS



# CRUD 
# All we need is an update and delete and this will come from the last page


#Define the app
app = Flask(__name__)
CORS(app)

load_dotenv()

#Establish the connnection to the batabase
def get_connection():
    return mysql.connector.connect(
        host=os.environ.get("MYSQL_HOST"),
        user=os.environ.get('MYSQL_USER'),
        password=os.environ.get('MYSQL_PASSWORD'),
        database=os.environ.get('MYSQL_DATABASE')
    )


# Gets Information from the  stats table  -- READ IS DONE 
@app.route("/stats")
def get_team_stats():
    team_name = request.args.get("team")
    if not team_name:
        return jsonify({"error": "No team provided"}), 400

    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

    

        query = """
            SELECT t.team_id, t.team_name, s.team_rank, s.wins, s.losses,
             s.conference_wins, s.conference_losses,
            c.conference_name
            FROM Team t
            JOIN Conference c ON t.conference_id = c.conference_id
            JOIN Stats s ON t.team_id = s.team_id
            WHERE t.school_name = %s
        """
        cursor.execute(query, (team_name,))
        result = cursor.fetchone()

        if not result:
            return jsonify({"error": "Team not found"}), 404

        return jsonify(result)

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

# Stores the bracket as JSON and sends it to the database ---- CREATE IS DONE 
@app.route("/stored_brackets", methods=["POST"])
def save_bracket():
    data = request.json

    if data is None:
        return jsonify({"error": "Invalid or missing JSON body"}), 400

    name = data.get("name")
    bracket_data = data.get("data")

    if not name or not bracket_data:
        return jsonify({"error": "Missing data"}), 400

    try:
        conn = get_connection()
        cursor = conn.cursor()

        query = """
            INSERT INTO Bracket (name, data)
            VALUES (%s, %s)
        """
        cursor.execute(query, (name, json.dumps(bracket_data)))
        conn.commit()

        return jsonify({"message": "Bracket saved!"})

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()
        conn.close()


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0",port=5001)
