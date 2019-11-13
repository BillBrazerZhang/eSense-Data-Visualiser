var acc_x = new TimeSeries();
var acc_y = new TimeSeries();
var acc_z = new TimeSeries();

//var ble_rss = new TimeSeries();

var gyro_x = new TimeSeries();
var gyro_y = new TimeSeries();
var gyro_z = new TimeSeries();

//var microphone_data = new TimeSeries();

//var isConnected = false;
//var eSenseID = "";


$(document).ready(function () {

  /*setup the socket */
  var socket = io('http://localhost:5000');

  /* Receive data and updates from server */
  socket.on('acc', function (data) {
    var time = new Date().getTime()
    acc_x.append(time, data.x);
    acc_y.append(time, data.y);
    acc_z.append(time, data.z);
  });

  socket.on('gyro', function (data) {
    var time = new Date().getTime()
    gyro_x.append(time, data.x);
    gyro_y.append(time, data.y);
    gyro_z.append(time, data.z);
  });

  /* setup the charts */
  setupAccelChart();

  //setupBLEChart();
  setupGyroChart();

});


var setupAccelChart = function () {

  var accel_chart = new SmoothieChart({
    grid: {
      strokeStyle: 'rgba(255,255,255,0.1)', fillStyle: 'rgb(13,21,27)',
      lineWidth: 1, millisPerLine: 1000, verticalSections: 6,
    },
    labels: { fillStyle: 'rgb(255,255,255)' }
  });

  accel_chart.streamTo(document.getElementById("acc-data"), 1000);

  accel_chart.addTimeSeries(acc_x,
    { strokeStyle: 'rgb(76,33,132)', lineWidth: 1 });
  accel_chart.addTimeSeries(acc_y,
    { strokeStyle: 'rgb(194,74,92)', lineWidth: 1 });
  accel_chart.addTimeSeries(acc_z,
    { strokeStyle: 'rgb(113,200,68)', lineWidth: 1 });

}


var setupGyroChart = function () {
  var gyro_chart = new SmoothieChart({
    grid: {
      strokeStyle: 'rgba(255,255,255,0.1)', fillStyle: 'rgb(13,21,27)',
      lineWidth: 1, millisPerLine: 1000, verticalSections: 6,
    },
    labels: { fillStyle: 'rgb(255,255,255)' }
  });

  gyro_chart.streamTo(document.getElementById("gyro-data"), 1000);

  gyro_chart.addTimeSeries(gyro_x,
    { strokeStyle: 'rgb(76,33,132)', lineWidth: 1 });
  gyro_chart.addTimeSeries(gyro_y,
    { strokeStyle: 'rgb(194,74,92)', lineWidth: 1 });
  gyro_chart.addTimeSeries(gyro_z,
    { strokeStyle: 'rgb(113,200,68)', lineWidth: 1 });
}
