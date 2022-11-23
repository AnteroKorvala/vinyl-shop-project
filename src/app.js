import express from 'express';
const app = express();
const port = 8081;
import records from './routes/records.js';

app.use('/', records);

const server = app.listen(port, function () {
    console.log("Toimiiko?");
});