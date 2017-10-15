var io   = require('socket.io-client');
var CCC  = require('./lib/ccc_tools');
var config = require('./config/config');
var request = require('request');
var redis   = require('redis');

var socket = io.connect(config.cc_url);

request(config.pair_list_url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var obj = JSON.parse(response.body);

      subItems           = [];

      if (0 == obj.code) {
        var list = obj.data.list;
        list.forEach(function(item,index){
          subItems.push('0~'+item.market_name+'~'+item.symbol+ '~' +item.anchor);
        });

        socket.emit('SubAdd', {subs:subItems});
      }
    }
});

var redisClient  = redis.createClient(config.redis.port, config.redis.host);
redisClient.on("error", function(error) {
    console.log(error);
});

// redis 验证 (reids.conf未开启验证，此项可不需要)
if (config.redis.auth) {
  redisClient.auth(config.redis.auth);  
}

redisClient.select(config.redis.db, function(error){
	if(error) {
		console.log(error);
	} else {
		console.log('select db');		
	}
});

socket.on("m", function(message) {
	var messageType = message.substring(0, message.indexOf("~"));

	// console.log(message);
	if (messageType === CCC.STATIC.TYPE.TRADE) {
		trade = CCC.TRADE.unpack(message);
		
		// console.log(JSON.stringify(trade));				
		redisClient.rpush(config.cc_ticker_queue, JSON.stringify(trade), function(error, res) {
			if(error) {
				console.log(error);
			} else {
				console.log(res);
			}
		});
	}
});

socket.on('disconnect', function(){
  console.log('disconnect *********');
  socket.socket.reconnect();
});

socket.on('reconnect', function(transport_type,reconnectionAttempts){
  console.log('reconnect *********',transport_type,reconnectionAttempts);
  socket.socket.reconnect();
});