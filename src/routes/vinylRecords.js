import express from 'express';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import multer from 'multer';
import dbo from '../services/db/conn.js';
import Vinyl from '../models/vinyl.js';
import adminAuth from "../services/middleware/adminAuth.js";
import userAuth from "../services/middleware/userAuth.js";

const recordRoutes = express.Router();

const vinylDB = (await dbo.connector.adminConnection());
const urlencodedParser = bodyParser.urlencoded({extended: false});
const jsonParser = bodyParser.json();

const upload = multer({storage: dbo.imageStorage}).single("cover");


let gfs
vinylDB.connection.once('open', () => {
    console.log('PLEASE GFS');
    gfs = new mongoose.mongo.GridFSBucket(vinylDB.connection.db, {
        bucketName: "uploads"
    });
});

//Main page FEED / GET one ALL vinyl
recordRoutes.get('/', async (req, res) => {
    (await vinylDB).connection.collection('vinyls')
        .find({}).limit(50)
        .toArray()
        .then((result) => {
            result.forEach((res) => {
                delete res.__v;
            });
/*            gfs.find().toArray().then((imageRes) => {
                if (!imageRes || imageRes.length === 0) {
                    return res.status(200).json({
                        success: false,
                        message: 'No Files'
                    });
                }
                imageRes.map(file => {
                    file.isImage = file.contentType === 'image/jpeg'
                        || file.contentType === 'image/png';
                });
                res.status(200).json({
                    success: true,
                    imageRes
                });
            });*/
            res.json(result);
        })
        .catch((error) => {
            res.status(400).send(`Error fetching VINYLS! ${error}`);
        });
});

//ADD a new vinyl record
recordRoutes.post('/addVinyl', adminAuth, upload, jsonParser, (req, res) => {
    if (Object.keys(req.body).length === 0 &&
        Object.keys(req.params).length === 0) {
        res.status(400).send('Body or params needed');
    }
    console.log(`Filename ${req.body.cover}`);
    const newVinyl = new Vinyl({
        name: req.body.name,
        artist: req.body.artist,
        producer: req.body.producer,
        label: req.body.label,
        length: req.body.length,
        genre: req.body.genre,
        released: req.body.released,
        cover: req.file.filename
    });
    newVinyl.save((err) => {
        if (err) {
            res.status(400);
            res.send();
        } else {
            res.status(201);
            res.send({ id: newVinyl._id });
        }
    });
});

//UPDATE a vinyl record
recordRoutes.put('/updateVinyl', adminAuth, urlencodedParser, (req, res) => {
    if (Object.keys(req.body).length === 0 &&
        Object.keys(req.params).length === 0) {
        res.status(400).send('Body or params needed');
    }

    let vinyl_id = req.body._id;
    if (!vinyl_id.includes("ObjectId")) {
        vinyl_id.prepend("ObjectId(");
        vinyl_id.append(")");
    }
    Vinyl.replaceOne({ vinyl_id }, {
        name: req.body.name,
        artist: req.body.artist,
        producer: req.body.producer,
        label: req.body.label,
        length: req.body.length,
        genre: req.body.genre,
        released: req.body.released
    }, ((result) => {
        if (result) {
            res.status(400);
            res.send(`Update unsuccessful. ${result}`);
        }
        res.status(200);
        res.send(`Successfully updated`);
    }));
});

recordRoutes.delete('/deleteVinyl', adminAuth, urlencodedParser, async (req, res, next) => {
    let query = { _id: req?.body?.id };
    if (!query) res.status(400).send('Input required to delete vinyl');
    await Vinyl.deleteOne(query)
        .then((result) => {
            if (result.deletedCount === 0) {
                res.status(200)
                    .send(`Provided vinyl ID does not exist`)
            } else {
                res.status(200)
                    .send(`Successful operation: ${result.acknowledged} Delete count: ${result.deletedCount}`);
            }
        })
        .catch((error) => {
            res.status(400).send(`Error while doing DB operation: ${error}`)
        });
});

export default recordRoutes;