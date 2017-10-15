var WebSocket = require('ws');
var config = require('./config/config');
var redis   = require('redis');

// var ws = new WebSocket("wss://stream.binance.com:9443/ws/ethbtc@kline_1m");

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

var periods = ['1m', '5m', '15m', '30m', '1h', '2h', '4h', '1d', '3d', '5d', '7d'];

var request = require('request');
request('https://www.binance.com/api/v1/ticker/allPrices', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var allPrices = JSON.parse(response.body);
      console.log(allPrices);

      if (allPrices) {
      allPrices.forEach(function(item, index){
        periods.forEach(function(period, index) {
          var pair       = item.symbol.toLowerCase();
        
          var ws = new WebSocket("wss://stream.binance.com:9443/ws/" + pair + "@kline_" + period);

          ws.onopen = function (e) {
            console.log('Connection to server for pair: ' + pair + ' ' + period);                                            
          };

        //   {
        //     "time": 1507824420,
        //     "volumefrom": 523.07591046000005,
        //     "volumeto": 29.865592469999999,
        //     "high": 0.057292000000000003,
        //     "low": 0.057309909999999999,
        //     "open": 0.057292000000000003,
        //     "close": 0.057309909999999999
        //  }

          ws.onmessage = function(event) {
            var data            = JSON.parse(event.data);
            var t               = parseInt(data.E / 1000);

            var ticker          = {
                'time': t,
                'period': period,
                'volumefrom': data.k.v,
                'volumeto': data.k.q,
                'open': data.k.o,
                'close': data.k.c,
                'high': data.k.h,
                'low': data.k.l,
                'pair': pair,
                'source': 'binance',
                'market': 'Binance',
            };

            redisClient.rpush(config.kline_queue, JSON.stringify(ticker), function(error, res) {
                if(error) {
                    console.log(error);
                } else {
                    console.log(res);
                }
            });
          };
            
          ws.onclose = function (e) {
            console.log('connection closed.');                    
          };
        });
      });
    }
  }
});