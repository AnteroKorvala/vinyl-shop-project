import mongoose from 'mongoose';
import dbo from '../services/db/conn.js';

const Schema = mongoose.Schema;
dbo.connector.adminConnection()
    .then(() => console.log('Db connection made for User model'));

//Defining vinyl schema
let userSchema = new Schema({
    username: String,
    email: {type: String, unique: true},
    password: String,
    token: String
});

//Creating vinyl model
let User = mongoose.model('user', userSchema);

export default User;
