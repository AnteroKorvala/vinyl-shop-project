import mongoose from 'mongoose';
import dbo from '../services/db/conn.js';

const Schema = mongoose.Schema;
dbo.adminConnection()
    .then(() => console.log('Db connection made for User model'));

//Defining vinyl schema
let userSchema = new Schema({
    admin: {
      type: Boolean,
        default: false
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: String
});

//Creating vinyl model
let User = mongoose.model('user', userSchema);

export default User;
