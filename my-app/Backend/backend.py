import os
import mysql.connector
from flask import *
from mysql.connector import errorcode
from dotenv import load_dotenv

# To do is to add primary and foreign keys 
# Insert the sample data
# write joing queries and then eventually connect to flask


# Load the local system for testing 
load_dotenv()

# This is a flask function which will be used later
# def get_connection():
#     return mysql.connector.connect(
#         host=os.environ.get("MYSQL_HOST" | "127.0.0.1"),
#         user=os.environ.get('MYSQL_USER'),
#         password=os.environ.get('MYSQL_PASSWORD'),
#         database=os.environ.get('MYSQL_DATABASE')
#     )

try: 
    # Create the connection and pull the information from the enviornment wether local or not 
    conn = mysql.connector.connect(
    host=os.environ.get("MYSQL_HOST","127.0.0.1"),
    user=os.environ.get('MYSQL_USER'),
    password =os.environ.get('MYSQL_PASSWORD'),
    database =os.environ.get('MYSQL_DATABASE')
    )


   
# Error handling 
except mysql.connector.Error as err: 
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Invalid Credentials")
        elif err.errno ==errorcode.ER_BAD_DB_ERROR:
            print("DB not found")
        else:
            print("Cannot connect to DB", err)

else:
        
        #Create the cursors hold the database connection 
        coachCur = conn.cursor()
        teamCur = conn.cursor()
       # statCur = conn.cursor()
        conferenceCur = conn.cursor()

        #Create the coach/team/stat/conference tables 
        coachCreate = (
                'CREATE TABLE IF NOT EXISTS Coach ('
                'coach_id SMALLINT AUTO_INCREMENT ,'
                'team_id SMALLINT NOT NULL,'
                'first_name VARCHAR(30),'
                'last_name VARCHAR(30),'
                'hire_date DATETIME,' 
                'PRIMARY KEY(coach_id)' 
                ')')
        
        teamCreate = (
                'CREATE TABLE IF NOT EXISTS Team (' 
                'team_id SMALLINT NOT NULL,'
                'team_rank VARCHAR(10),'
                'wins SMALLINT,'
                'losses SMALLINT,'
                'conference_wins SMALLINT,'
                'conference_losses SMALLINT,'
                'PRIMARY KEY(team_id)'
                ')')
        
        # statCreate = (
             
        # )

        confernceCreate = (
                'CREATE TABLE IF NOT EXISTS Conference(' 
                'conference_id SMALLINT AUTO_INCREMENT ,'
                'conference_name VARCHAR(50),' 
                'region VARCHAR(50),' 
                'founded_year SMALLINT,'
                'commisioner VARCHAR(50),' 
                'num_teams SMALLINT,'
                'PRIMARY KEY(conference_id)'
                ')')

        # Create the tables to be store 
        coachCur.execute(coachCreate)
        teamCur.execute(teamCreate)
        #statCur.execute(statCreate)
        conferenceCur.execute(confernceCreate)
        

        nateOats = ("INSERT INTO Coach"
                      "(coach_id,team_id,first_name,last_name,hire_date) "
                      "VALUES (1,1,'Nate' , 'Oats' , '2019-03-27')")
        

        # This is here to remove the itmes inside of the coach table 
        # coachCur.execute("TRUNCATE TABLE Coach")
        coachCur.execute("SELECT * FROM Coach")

        rows = coachCur.fetchall()
        

        for row in rows:
            print(row)

     
        #coachCur.execute(nateOats)
        conn.commit()
        coachCur.close()
        teamCur.close()
       # statCur.close()
        conferenceCur.close()

        conn.close()
        



