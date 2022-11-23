const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Defining vinyl schema
const vinylSchema = new Schema({
    name: String
});

//Creating vinyl model
const Vinyl = mongoose.model('Vinyl', vinylSchema);

module.exports = Vinyl;