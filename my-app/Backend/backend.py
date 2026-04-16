import os
import mysql.connector
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)

load_dotenv()

# ----------------------------
# DB CONNECTION
# ----------------------------
def get_connection():
    return mysql.connector.connect(
        host=os.environ.get("MYSQL_HOST"),
        user=os.environ.get("MYSQL_USER"),
        password=os.environ.get("MYSQL_PASSWORD"),
        database=os.environ.get("MYSQL_DATABASE")
    )

# ----------------------------
# GET TEAM STATS (UNCHANGED)
# ----------------------------
@app.route("/stats")
def get_team_stats():
    team_name = request.args.get("team")

    if not team_name:
        return jsonify({"error": "No team provided"}), 400

    conn = None
    cursor = None

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
        if cursor is not None:
            cursor.close()
        if conn is not None:
            conn.close()

# ----------------------------
# CREATE BRACKET
# ----------------------------
@app.route("/stored_brackets", methods=["POST"])
def create_bracket():
    conn = None
    cursor = None

    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "Invalid JSON"}), 400

        name = data.get("name")
        bracket_data = data.get("data")

        if not name or bracket_data is None:
            return jsonify({"error": "Missing name or data"}), 400

        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute(
            "INSERT INTO Bracket (name, data) VALUES (%s, %s)",
            (name, json.dumps(bracket_data))
        )

        conn.commit()

        return jsonify({"message": "Bracket created successfully"}), 201

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500

    finally:
        if cursor is not None:
            cursor.close()
        if conn is not None:
            conn.close()

# ----------------------------
# READ ALL BRACKETS
# ----------------------------
@app.route("/stored_brackets", methods=["GET"])
def get_brackets():
    conn = None
    cursor = None

    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM Bracket ORDER BY created_at DESC")
        results = cursor.fetchall()

        return jsonify(results)

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500

    finally:
        if cursor is not None:
            cursor.close()
        if conn is not None:
            conn.close()

# ----------------------------
# UPDATE BRACKET
# ----------------------------
@app.route("/stored_brackets/<int:bracket_id>", methods=["PUT"])
def update_bracket(bracket_id):
    conn = None
    cursor = None

    try:
        data = request.get_json()

        name = data.get("name")
        bracket_data = data.get("data")

        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute(
            "UPDATE Bracket SET name=%s, data=%s WHERE bracket_id=%s",
            (name, json.dumps(bracket_data), bracket_id)
        )

        conn.commit()

        if cursor.rowcount == 0:
            return jsonify({"error": "Bracket not found"}), 404

        return jsonify({"message": "Bracket updated"})

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500

    finally:
        if cursor is not None:
            cursor.close()
        if conn is not None:
            conn.close()

# ----------------------------
# DELETE BRACKET
# ----------------------------
@app.route("/stored_brackets/<int:bracket_id>", methods=["DELETE"])
def delete_bracket(bracket_id):
    conn = None
    cursor = None

    try:
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("DELETE FROM Bracket WHERE bracket_id=%s", (bracket_id,))
        conn.commit()

        if cursor.rowcount == 0:
            return jsonify({"error": "Bracket not found"}), 404

        return jsonify({"message": "Bracket deleted"})

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500

    finally:
        if cursor is not None:
            cursor.close()
        if conn is not None:
            conn.close()


# ----------------------------
# GET COACHES
# ----------------------------
@app.route("/coaches", methods=["GET"])
def get_coaches():
    conn = None
    cursor = None

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
        results = cursor.fetchall()

        return jsonify(results)

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500

    finally:
        if cursor is not None:
            cursor.close()
        if conn is not None:
            conn.close()

# ----------------------------
# RUN SERVER
# ----------------------------
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)
