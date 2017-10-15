module.exports = {
    cc_url : "https://streamer.cryptocompare.com/",
    redis : {
        host: '127.0.0.1',
        port: 6379,
        auth: '0773H',
        db: 1,
    },
    pair_list_url: "http://mytoken.internal/currency/comlist?cc_kline=1",
    cc_ticker_queue: "l_cc_ticker_queue",
    kline_queue: "l_kline_persist_queue",
}