import express from 'express';
const app = express();
const port = 8081;
import vinylRecords from './routes/vinylRecords.js';
import userRecords from "./routes/userRecords.js";
import wishlistRecords from './routes/wishlistRecords.js';

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With, Content-type, Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  });

app.use('/', vinylRecords);
app.use('/u/', userRecords);
app.use('/w/', wishlistRecords);

const server = app.listen(port, function () {
    console.log("Toimiiko?");
});