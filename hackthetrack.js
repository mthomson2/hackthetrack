<!DOCTYPE html>
<html>
<head>
    <title>JSSample</title>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
</head>
<body>
<div id="mapid" style="width:600px; height:400px"></div>
<script type="text/javascript">
//set up dummy data
var prefMethod = 0;
var startPoint = 5001380;
var prefRouteID = '2A';
//get user info
$(function() {
  var userid = 1;
    $.ajax({
        url: "http://172.16.40.182:5000/ProfileData?userid="+userid,
        type: "GET",
    })
    .done(function(data) {
        //update data
        prefMethod = data.preferredMethod;
        startPoint = data.startPoint;
        prefRouteID = data.preferredRouteID;
    })
    .fail(function() {
        console.log("could not reach database");
    });
});
//Real Time Bus Prediction API: next bus service
$(function() {
    var params = {
        "api_key": "6b700f7ea9db408e9745c207da7ca827",
        // Request parameters
        "RouteID": prefRouteID,
        "StopID": startPoint,
    };
    $.ajax({
        url: "https://api.wmata.com/NextBusService.svc/json/jPredictions?" + $.param(params),
        type: "GET",
    })
    .done(function(data) {
        for(i in data.Predictions){
          console.log('Minutes to next bus arrival at '+ data.StopName + ': ' + data.Predictions[i].Minutes + ' min.');
        }
    })
    .fail(function() {
        alert("error");
    });
});
//Incident reports
var routesAffected = [];
$(function() {
    var params = {
        "api_key": "6b700f7ea9db408e9745c207da7ca827",
        // Request parameters
        "RouteID": preferredRouteID,
    };
    $.ajax({
        url: "https://api.wmata.com/Incidents.svc/json/BusIncidents?"+$.param(params),
        type: "GET",
    })
    .done(function(data) {
        console.log(data);
        for(i in data.BusIncidents){
          incidents.push(data.BusIncidents[i]);
        }
        for(i in data.RoutesAffected){
          routesAffected.push(data.RoutesAffected[i]);
        }
        //since the sample data does not have any incides, creating dummy data for routes affected:
        routesAffected.push('10A');
        routesAffected.push('2A');
        routesAffected.push('38B');
        console.log('Routes affected by incidents: ');
        for(i in routesAffected){
          console.log(routesAffected[i]);
        }
    })
    .fail(function() {
        alert("error");
    });
});
</script>
</body>
</html>
