import express from 'express';
import bodyParser from "body-parser";
import dbo from '../services/db/conn.js';
import userAuth from "../services/middleware/userAuth.js";
import wishlist from "../models/wishlist.js";
import Vinyl from "../models/vinyl.js";

const wishlistRoutes = express.Router();

const wishlistDB = (await dbo.adminConnection());

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({extended: false});

wishlistRoutes.get('/wishlist', userAuth, async (req, res) => {
    (await wishlistDB).connection.collection('wishlist')
        .find({}).limit(50)
        .toArray()
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.status(400).send(`Error fetching WISHLIST: ${err}`);
    });
});

//ADD to wishlist
wishlistRoutes.post('/postTo/wishlist', jsonParser, async (req, res) => {
    let query = req?.body?.email;
    if (!query) return res.status(400).send('Email must be provided');

    let item_id = req?.body?.vinyl_id;

    const item = await Vinyl.findOne({ _id: item_id })
        .catch((err) => {
            return res.status(400).send(`Something went wrong during operation ${err}`);
        });
    await wishlist.updateOne({ email: query },
        {
            $push: { list: item }
        }).then((result) => {
            return res.status(200).send(result);
    }).catch((err) => {
        return res.status(400).send(`Something went wrong when updating wishlist ${err}`);
    });
});

//REMOVE from wishlist
wishlistRoutes.patch('/removeFrom/wishlist', jsonParser, async (req, res) => {
    let query = req?.body?.email;
    if (!query) return res.status(400).send('Email must be provided');

    let item_id = req?.body?.vinyl_id;

    const itemToBePulled = await Vinyl.findOne({ _id: item_id })
        .catch((err) => {
            return res.status(400).send(`Something went wrong during operation ${err}`);
        });
    await wishlist.updateOne({ email: query },
        {
            $pull: { list: itemToBePulled }
        }).then((result) => {
        return res.status(200).send(result);
    }).catch((err) => {
        return res.status(400).send(`Something went wrong when updating wishlist ${err}`);
    });
});
export default wishlistRoutes;