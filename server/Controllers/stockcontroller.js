const Alpaca = require("@alpacahq/alpaca-trade-api");
const CircularJSON = require("circular-json");

API_KEY = "PKKM0LCA32H89WRZ8A1R";
API_SECRET = "7QNcVM5RSbi2aWghXVeMTlcnrrGS12fjQxDmBcmG";
const feed = "iex"; // Change to "sip" if on a paid plan
const symbol = "BTCUSD";
// let companySymbol,price;
let quote_data = {};
class DataStream {
  constructor({ apiKey, secretKey, feed }) {
    this.alpaca = new Alpaca({
      keyId: apiKey,
      secretKey,
      feed,
    });

    const socket = this.alpaca.data_stream_v2;

    socket.onConnect(function () {
      console.log("Connected");
      socket.subscribeForQuotes(["AAPL", "GOOG", "MSFT"]);
      // socket.subscribeForTrades(["FB"]);
      // socket.subscribeForBars(["SPY"]);
      // socket.subscribeForStatuses(["*"]);
    });

    socket.onError((err) => {
      console.log(err);
    });

    // socket.onStockTrade((trade) => {
    //   console.log(trade);
    // });

    socket.onStockQuote((quote) => {
      console.log(quote);
      quote_data = quote;
    });

    // socket.onStockBar((bar) => {
    //   console.log(bar);
    // });

    socket.onStatuses((s) => {
      console.log(s);
    });

    socket.onStateChange((state) => {
      console.log(state);
    });

    socket.onDisconnect(() => {
      console.log("Disconnected");
    });

    socket.connect();

    // unsubscribe from FB after a second
    setTimeout(() => {
      socket.unsubscribeFromTrades(["FB"]);
    }, 1000);
  }
}

const Realtime_data = async (req, res) => {

    let stream = new DataStream({
      apiKey: API_KEY,
      secretKey: API_SECRET,
      feed: "sip",
      paper: true,
    })
    // if(stream){
    // res.status(200).json(quote_data);
    // }
    let resp = res.status(200).json(quote_data)
  
  // const circularStream = CircularJSON.stringify(stream);
  // const parsedStream = CircularJSON.parse(circularStream);
  console.log(stream);
  // let data = {
  //   quote_data,
  // };
};

module.exports = { Realtime_data };
