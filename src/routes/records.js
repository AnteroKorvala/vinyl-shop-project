import express from 'express';
import dbo from '../services/db/conn.js';

const recordRoutes = express.Router();


recordRoutes.get('/',async (req, res) => {
    const dbConnect = (await dbo.adminConnection()).connection;
    dbConnect.collection('users')
        .find({}).limit(50)
        .toArray()
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            res.status(400).send(`Error fetching USERS! ${error}`);
        });
});

export default recordRoutes;