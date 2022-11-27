import mongoose from 'mongoose';
import vinyl from "./vinyl.js";
import dbo from '../services/db/conn.js';

const Schema = mongoose.Schema;
dbo.adminConnection()
    .then(() => console.log('Db connection made for Wishlist model'));

//Defining vinyl schema
let wishlistSchema = new Schema({
    email: String,
    list: [vinyl.schema]
});

//Creating vinyl model
let Wishlist = mongoose.model('wishlist', wishlistSchema);

export default Wishlist;