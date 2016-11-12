import MySQLdb
import json
from flask import request
from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"
@app.route("/ProfileData")
def grabProfileData():
    db = MySQLdb.connect(host="localhost",    # your host, usually localhost
                         user="root",         # your username
                         passwd="tautechies", # your password
                         db="MetroService")   # name of the database

    data = {}
    userid = request.args.get('userid')

    # you must create a Cursor object. It will let
    # you execute all the queries you need
    cur = db.cursor()

    # Use all the SQL you like
    cur.execute("SELECT StartPoint, EndPoint, PreferredMethod, PreferredRouteID, HomeLocation, AlternateRouteID FROM UserProfile WHERE UserID="+userid)

    result = "";
    # print all the first cell of all the rows
    for row in cur.fetchall():
        data["startPoint"] = str(row[0])
        data["endPoint"] = str(row[1])
        data["preferredMethod"] = str(row[2])
        data["preferredRoutID"] = str(row[3])
        data["homeLocation"] = str(row[4])
        data["alternateRouteId"] = str(row[5])
        #result += str(row)

    db.close()
    json_data = json.dumps(data)
    return json_data

if __name__ == "__main__":
    app.run(host= '0.0.0.0')
