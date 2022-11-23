import mongoose from 'mongoose';
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

export default connector;