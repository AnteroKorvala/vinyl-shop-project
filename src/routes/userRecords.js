import express from 'express';
import bodyParser from "body-parser";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dbo from '../services/db/conn.js';
import User from '../models/user.js';
import auth from '../services/middleware/adminAuth.js';
import dotenv from "dotenv";
import adminAuth from "../services/middleware/adminAuth.js";

dotenv.config();

const userRecordsRoute = express.Router();

const userDB = (await dbo.connector.adminConnection());
const urlencodedParser = bodyParser.urlencoded({extended: false});
const jsonParser = bodyParser.json();

userRecordsRoute.post('/register', urlencodedParser, async (req, res) => {
    try {
        //Get user input
        const {username, email, password, admin} = req.body;
        //Validate input
        if (!(email && password && username)) {
            return res.status(400).send('All input is required');
        }

        //Check if user exists
        const oldUser = await User.findOne({email});

        if (oldUser) {
            return res.status(409).send(`User ${email} already exists...`);
        }

        //Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);
        //Create new user
        const newUser = await User.create({
            username,
            email: email.toLowerCase(),
            password: encryptedPassword,
            admin: admin.toLowerCase() === "true"
        });

        //Create token
        //Save user token
        newUser.token = jwt.sign(
            {
                user_id: newUser._id, email, admin: admin.toLowerCase() === "true"
            },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h"
            }
        );
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).send(`Something went wrong with the request REGISTER: ${err}`);
    }
});

userRecordsRoute.post('/login', urlencodedParser, async (req, res) => {
    try {
        const {email, password} = req.body;

        //Validate user input
        if (!(email && password)) {
            res.status(400).send('All input is required');
        }

        //Check if user exists
        const user = await User.findOne({email});
        if (user && (await bcrypt.compare(password, user.password))) {
            const admin = user.admin.toString().toLowerCase() === "true";
            //Create token
            //Save user token
            user.token = jwt.sign(
                {user_id: user._id, email, admin: admin},
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h"
                }
            );

            //Send back user after successful login
            res.status(200).json({
                username: user.username,
                token: user.token
            });
        } else {
            res.status(400).send('Invalid Credentials');
        }
    } catch (err) {
        throw err;
    }
});

//DELETE user
userRecordsRoute.delete('/deleteUser', adminAuth, urlencodedParser, async (req, res) => {
    //Validate input
    let query = {username: req?.body?.username, email: req?.body?.email};
    if (!query) res.status(400).send('Input required to delete user');

    await User.deleteOne(query)
        .then((result) => {
            if (result.deletedCount === 0) {
                res.status(200)
                    .send(`Provided user does not exist`);
            } else {
                res.status(200)
                    .send(`Successful operation: ${result.acknowledged} Delete count: ${result.deletedCount}`);
            }
        })
        .catch((error) => {
            res.status(400).send(`Error while doing DB operation: ${error}`)
        });
});

//UPDATE user
userRecordsRoute.put('/updateUser', adminAuth, urlencodedParser, async (req, res) => {
    try {
        const query = req.body;
        if (!query) {
            return res.status(400).send('Input required');
        }

        await User.findOneAndUpdate(query.token, {
            username: query.username,
            email: query.email,
            password: query.password,
        },
            {
                new: true
            }).then((result) => {
            const newToken = jwt.sign(
                {
                    user_id: result._id, email: query.email, admin: result.admin
                },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h"
                }
            );
            User.findOneAndUpdate(result, {
                token: newToken
            });
            res.status(200).json({
                username: result.username,
                token: newToken
            });
        });
    } catch (err) {
        res.status(400).send(`Something went wrong in the database transaction ${err}`);
    }
});
/*
userRecordsRoute.get('/getUser', auth, urlencodedParser, async (req, res) => {
    let query = {username: req?.body?.username, email: req?.body?.email};
    if (!query) res.status(400).send('Input required to know which user to GET');

    User.findOne(query)
        .then((result) => {
            if (!result) {
                res.status(400)
                    .send('Provided user does not exist');
            } else {
                res.status(200)
                    .send(result);
            }
        }).catch((error) => {
        res.status(400).send(`Something went wrong during the DB operation: ${error}`);
    });
});
*/

export default userRecordsRoute;