import os
import mysql.connector
from flask import *
from mysql.connector import errorcode
from dotenv import load_dotenv
from flask_cors import CORS





#Define the app
app = Flask(__name__)
CORS(app)

load_dotenv()

# #Establish the connnection to the batabase
def get_connection():
    return mysql.connector.connect(
        host=os.environ.get("MYSQL_HOST"),
        user=os.environ.get('MYSQL_USER'),
        password=os.environ.get('MYSQL_PASSWORD'),
        database=os.environ.get('MYSQL_DATABASE')
    )

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


@app.route("/coaches")
def get_coaches():
    conference = request.args.get("conference")
    team = request.args.get("team")

    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        query = """
            SELECT c.conference_name, t.school_name, t.team_name,
                   ch.first_name, ch.last_name, ch.hire_date, ch.salary
            FROM Coach ch
            JOIN Team t ON ch.team_id = t.team_id
            JOIN Conference c ON t.conference_id = c.conference_id
            WHERE (%s IS NULL OR %s = '' OR c.conference_name = %s)
              AND (%s IS NULL OR %s = '' OR t.school_name = %s)
            ORDER BY c.conference_name, t.school_name
        """

        cursor.execute(
            query,
            (conference, conference, conference, team, team, team),
        )
        result = cursor.fetchall()
        return jsonify(result)

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()


if __name__ == "__main__":
    #initialize_db()
    app.run(debug=True, host="0.0.0.0",port=5001)
