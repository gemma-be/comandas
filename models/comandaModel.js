const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComandaSchema = new Schema({
	name: String,
	table: Number,


});

module.exports = mongoose.model('Comanda', ComandaSchema);