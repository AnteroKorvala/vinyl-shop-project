import express from 'express';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dbo from '../services/db/conn.js';
import Vinyl from '../models/vinyl.js';
import Upload from '../services/middleware/upload.js';
import adminAuth from "../services/middleware/adminAuth.js";

const urlencodedParser = bodyParser.urlencoded({extended: false});
const jsonParser = bodyParser.json();

const recordRoutes = express.Router();

//let gfs;
const vinylDB = (await dbo.adminConnection());
/*const conn = vinylDB.connection;
conn.once("open", () => {
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "uploads"
    });
});*/

//Main page FEED / GET one ALL vinyl
recordRoutes.get('/', async (req, res) => {
    (await vinylDB).connection.collection('vinyls')
        .find({}).limit(50)
        .toArray()
        .then((result) => {
            result.forEach((res) => {
                delete res.__v;
            });
            res.json(result);
        })
        .catch((error) => {
            res.status(400).send(`Error fetching VINYLS! ${error}`);
        });
/*    gfs.find().toArray()
        .then((files) => {
            if (!files || files.length === 0) {
                return res.status(200).json({
                    success: false,
                    message: 'No files available'
                });
            }
            files.map(file => {
                file.isImage = file.contentType === 'image/jpeg'
                    || file.contentType === 'image/png';
            });
            res.status(200).json({
                success: true,
                files
            });
    });
    vinyls.map(vinyl => {

    })*/
});

//GET one vinyl
recordRoutes.get('/oneVinyl', jsonParser, async (req, res) => {
    const query = req.body._id;
    console.log(query);
    await Vinyl.findOne({ _id: query })
        .then((result) => {
            delete result.__v;
            return res.status(200).send(result);
        }).catch((err) => {
            return res.status(400).send(err);
        });
});

//ADD a new vinyl record
recordRoutes.post('/addVinyl', adminAuth, Upload.single("cover"), jsonParser, (req, res) => {
    if (req.file === undefined) return res.send('A file must be provided');
    if (Object.keys(req.body).length === 0 &&
        Object.keys(req.params).length === 0) {
        res.status(400).send('Body or params needed');
    }
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
recordRoutes.put('/updateVinyl', adminAuth, jsonParser, (req, res) => {
    console.log(req.body)
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

recordRoutes.delete('/deleteVinyl', adminAuth, jsonParser, async (req, res) => {
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