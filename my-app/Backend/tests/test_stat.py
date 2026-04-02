import os
import mysql.connector
from mysql.connector import errorcode
from dotenv import load_dotenv

load_dotenv()

def get_conn():
    return mysql.connector.connect(
        host=os.getenv("MYSQL_HOST", "127.0.0.1"),
        user=os.getenv("MYSQL_USER"),
        password=os.getenv("MYSQL_PASSWORD"),
        database=os.getenv("MYSQL_DATABASE")
    )

def test_stat_table_create_and_insert():
    conn = get_conn()
    cur = conn.cursor()

    # ensure table exists
    cur.execute("""
    CREATE TABLE IF NOT EXISTS Stat (
      team_rank TINYINT UNSIGNED PRIMARY KEY,
      wins SMALLINT,
      losses SMALLINT,
      conference_wins SMALLINT,
      conference_losses SMALLINT
    )
    """)
    conn.commit()

    test_rank = 99
    try:
        cur.execute(
            "INSERT INTO Stat (team_rank, wins, losses, conference_wins, conference_losses) VALUES (%s,%s,%s,%s,%s)",
            (test_rank, 10, 5, 6, 2)
        )
        conn.commit()
    except mysql.connector.Error as e:
        if e.errno == errorcode.ER_DUP_ENTRY:
            conn.rollback()
        else:
            cur.close()
            conn.close()
            raise

    cur.execute("SELECT team_rank, wins, losses, conference_wins, conference_losses FROM Stat WHERE team_rank = %s", (test_rank,))
    rows = cur.fetchall()
    assert len(rows) >= 1

    # cleanup test row
    cur.execute("DELETE FROM Stat WHERE team_rank = %s", (test_rank,))
    conn.commit()