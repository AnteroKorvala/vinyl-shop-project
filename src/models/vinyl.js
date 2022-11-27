import mongoose from 'mongoose';
import dbo from '../services/db/conn.js';

const Schema = mongoose.Schema;
dbo.connector.adminConnection()
    .then(() => console.log('Db connection made for vinyl model'));

//Defining vinyl schema
let vinylSchema = new Schema({
    name: String,
    artist: String,
    producer: String,
    label: String,
    length: String,
    genre: String,
    released: String,
    coverName: String
});

//Creating vinyl model
let Vinyl = mongoose.model('Vinyl', vinylSchema);

export default Vinyl;