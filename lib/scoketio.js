var socket_io_client    = require('socket.io-client');
var CCC                 = require('./ccc_tools');

var socket_io           = {};

socket_io.connect = function(url){
    var socket = socket_io_client.connect(url);
    return socket;
};

socket_io.emit = function(socket){
    console.log('emit');
    var subscription;
    var data = {
        "USD": {
          "TRADES": [
            "0~Cryptsy~BTC~USD",
            "0~Bitstamp~BTC~USD",
            "0~OKCoin~BTC~USD",
            "0~Coinbase~BTC~USD",
            "0~Poloniex~BTC~USD",
            "0~Cexio~BTC~USD",
            "0~BTCE~BTC~USD",
            "0~BitTrex~BTC~USD",
            "0~Kraken~BTC~USD",
            "0~Bitfinex~BTC~USD",
            "0~LocalBitcoins~BTC~USD",
            "0~itBit~BTC~USD",
            "0~HitBTC~BTC~USD",
            "0~Coinfloor~BTC~USD",
            "0~Huobi~BTC~USD",
            "0~LakeBTC~BTC~USD",
            "0~Coinsetter~BTC~USD",
            "0~CCEX~BTC~USD",
            "0~MonetaGo~BTC~USD",
            "0~Gatecoin~BTC~USD",
            "0~Gemini~BTC~USD",
            "0~CCEDK~BTC~USD",
            "0~Exmo~BTC~USD",
            "0~Yobit~BTC~USD",
            "0~BitBay~BTC~USD",
            "0~QuadrigaCX~BTC~USD",
            "0~BitSquare~BTC~USD",
            "0~TheRockTrading~BTC~USD",
            "0~Quoine~BTC~USD",
            "0~LiveCoin~BTC~USD",
            "0~WavesDEX~BTC~USD",
            "0~Lykke~BTC~USD"
          ],
          "CURRENT": [
            "2~Cryptsy~BTC~USD",
            "2~Bitstamp~BTC~USD",
            "2~OKCoin~BTC~USD",
            "2~Coinbase~BTC~USD",
            "2~Poloniex~BTC~USD",
            "2~Cexio~BTC~USD",
            "2~BTCE~BTC~USD",
            "2~BitTrex~BTC~USD",
            "2~Kraken~BTC~USD",
            "2~Bitfinex~BTC~USD",
            "2~LocalBitcoins~BTC~USD",
            "2~itBit~BTC~USD",
            "2~HitBTC~BTC~USD",
            "2~Coinfloor~BTC~USD",
            "2~Huobi~BTC~USD",
            "2~LakeBTC~BTC~USD",
            "2~Coinsetter~BTC~USD",
            "2~CCEX~BTC~USD",
            "2~MonetaGo~BTC~USD",
            "2~Gatecoin~BTC~USD",
            "2~Gemini~BTC~USD",
            "2~CCEDK~BTC~USD",
            "2~Exmo~BTC~USD",
            "2~Yobit~BTC~USD",
            "2~BitBay~BTC~USD",
            "2~QuadrigaCX~BTC~USD",
            "2~BitSquare~BTC~USD",
            "2~TheRockTrading~BTC~USD",
            "2~Quoine~BTC~USD",
            "2~LiveCoin~BTC~USD",
            "2~WavesDEX~BTC~USD",
            "2~Lykke~BTC~USD"
          ],
          "CURRENTAGG": "5~CCCAGG~BTC~USD"
        }
      };
    subscription = data['USD']['TRADES'];
    socket.emit('SubAdd', {subs:subscription} );
};

socket_io.on = function(socket){
    socket.on("m", function(message){
        var messageType = message.substring(0, message.indexOf("~"));
          var res = {};
      
          if (messageType === CCC.STATIC.TYPE.TRADE) {
              res = CCC.TRADE.unpack(message);
              console.log(res);
          }	
      });
};


module.exports = socket_io;