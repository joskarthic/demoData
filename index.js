document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
	var networkState = navigator.network.connection.type;
	var states = {};
	states[Connection.UNKNOWN]  = 'Unknown connection';
	states[Connection.ETHERNET] = 'Ethernet connection';
	states[Connection.WIFI]     = 'WiFi connection';
	states[Connection.CELL_2G]  = 'Cell 2G connection';
	states[Connection.CELL_3G]  = 'Cell 3G connection';
	states[Connection.CELL_4G]  = 'Cell 4G connection'; 
	states[Connection.NONE]     = 'No network connection';
	// alert('[Connection](connection.html) type: ' + states[networkState]);
}

// Camera
function getCamera(){
	navigator.camera.getPicture(getUrl, onFail, { quality: 25,
    destinationType: Camera.DestinationType.FILE_URI
	});
	
	function getUrl(imageData) {
		alert(imageData);
	}

	function onFail(message) {
		alert('Failed because: ' + message);
	}
}




// Geo Location and DB creation 
function getCurrentLocation(){
	navigator.geolocation.getCurrentPosition(onSuccess, onError,{ timeout: 5000,enableHighAccuracy: true });
}

function onSuccess(position) {
	alert('Latitude: '          + position.coords.latitude          + '\n' +
		  'Longitude: '         + position.coords.longitude         + '\n' +
		  'Altitude: '          + position.coords.altitude          + '\n' +
		  'Accuracy: '          + position.coords.accuracy          + '\n' +
		  'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
		  'Heading: '           + position.coords.heading           + '\n' +
		  'Speed: '             + position.coords.speed             + '\n' +
		  'Timestamp: '         + position.timestamp                + '\n');
	var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    // db.transaction(populateDB, errorCB, successCB);
    db.transaction(getLocationDB, errorCB, successCB);
	function getLocationDB(tx){
		
		tx.executeSql('CREATE TABLE IF NOT EXISTS LOCATION (ID INTEGER PRIMARY KEY AUTOINCREMENT, LATITUTE TEXT, LONGITUTE TEXT)');
		tx.executeSql('INSERT INTO LOCATION (LATITUTE,LONGITUTE) VALUES ("'+ position.coords.latitude +'", "'+ position.coords.longitude +'")', successID);
		tx.executeSql('SELECT * FROM LOCATION',[],function(tx, results){
			alert(results.rows.length);
		});
	}
	function successID(){
		return true;
	}
};

function populateDB(tx) {
	tx.executeSql('DROP TABLE IF EXISTS DEMO');
	tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
	tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
	tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
	tx.executeSql('SELECT * FROM DEMO');
}

// Transaction error callback
//
function errorCB(tx, err) {
	alert("Error processing SQL: "+err);
}

// Transaction success callback
//
function successCB() {
	// alert("success!");
}

// onError Callback receives a PositionError object 
// 
function onError(error) {
	alert('code: '    + error.code    + '\n' +
		  'message: ' + error.message + '\n');
}

// DatePicker

function getDate(){
	datePicker.show(options, onSuccess, onError);
}

var options = {
    date: new Date(),
    mode: 'date'
};
 
function onSuccess(date) {
    //alert('Selected date: ' + date);
	var date1=date.toString();
	var dataas=date1.split(" ");
	var Month = ["App","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	var mon=""; 
	if(Month.indexOf(dataas[1]).toString().length==1)
	{
		mon="0"+Month.indexOf(dataas[1]);
	}
	else
	{
		mon = Month.indexOf(dataas[1]);
	}
	var selectedDate=mon+'/'+dataas[2]+'/'+dataas[3];
	alert('Selected date: ' + selectedDate);
}
 
function onError(error) { // Android only 
    alert('Error: ' + error);
}
