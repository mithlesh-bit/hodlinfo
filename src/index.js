const express = require('express');
const app = express();
const PORT = 7000;
const path = require('path');
const Ticker = require('./models/datamodel')
const mongoose = require('mongoose');
const ejs = require('ejs')
app.set("view engine", "ejs")
// app.set('views', path.join(__dirname, 'views'));


require('./database/connection');
const routes = require("./routes/main");
const { log } = require('console');
const staticPath = path.join(__dirname, "../public");

app.use(express.static(staticPath));
app.use(express.json());

app.use('', routes);

let top10Data = [];

async function fetching() {
  try {
    const response = await fetch('https://api.wazirx.com/api/v2/tickers');
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const tickerData  = await response.json();
    if (typeof tickerData === 'object' && !Array.isArray(tickerData)) {
      const dataArray = Object.values(tickerData);
      top10Data = dataArray.slice(0, 10);

      // Store the top 10 data in the database
      for (const data of top10Data) {
        const ticker = new Ticker({
          name: data.name,
          last: data.last,
          buy: data.buy,
          sell: data.sell,
          volume: data.volume,
          base_unit: data.base_unit,
        });
        await ticker.save();
      }
      console.log("saved");
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// fetching();

app.get("/", (req, resp) => {
  resp.send(top10Data); 
});

app.listen(PORT, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", PORT);
});
