var WebSocket = require('ws');
var config = require('./config/config');
var io   = require('socket.io-client');
// var ws = new WebSocket("wss://stream.binance.com:9443/ws/ethbtc@kline_1m");

// ws.onopen = function (e) {
// console.log('Connection to server for pair: ');                                            
// };

// ws.onerror = function(evt) {  
//     console.log("WebSocketError!");  
//     console.log(evt);
// };  
// ws.onmessage = function(event) {
//     console.log(event);
// };

var socket = io.connect("wss://stream.binance.com:9443/ws/ethbtc@kline_1m");

socket.on('connect', function(){
    console.log('disconnect *********');
    socket.socket.reconnect();
  });

  
socket.on('connection', function(){
    console.log('disconnect *********');
    socket.socket.reconnect();
  });