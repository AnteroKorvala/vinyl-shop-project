import express from 'express';
const app = express();
const port = 8081;
import vinylRecords from './routes/vinylRecords.js';
import userRecords from "./routes/userRecords.js";
import wishlistRecords from './routes/wishlistRecords.js';


app.use('/', vinylRecords);
app.use('/u/', userRecords);
app.use('/w/', wishlistRecords);

const server = app.listen(port, function () {
    console.log("Toimiiko?");
});