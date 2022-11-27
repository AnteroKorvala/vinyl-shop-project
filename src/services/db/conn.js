import mongoose from 'mongoose';
import GridFs from 'multer-gridfs-storage';
import path from "path";
import crypto from 'crypto';
import dotenv from 'dotenv'
dotenv.config();

const url = process.env.DB_URL;

const connector = {
    adminConnection: () => {
        try {
            return mongoose.connect(url);
        } catch (e) {
            console.error(`Error while trying to connect to db: ${e}`);
        }
    }
};

const imageStorage = new GridFs.GridFsStorage({
    url: url,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            // encrypt filename before storing it
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});

export default {connector, imageStorage};