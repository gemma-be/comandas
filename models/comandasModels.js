const SQL = require('sql-template-strings');
const utils = require('../utils/index');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const comanda = require('../models/comandasModel');


module.exports = {
	getAllComandas: async () => {
		const query = 'SELECT * FROM comandas;';
		return await utils.executeQuery(query);
	},
	getOneComanda: async function (id) {
		const query = SQL `SELECT * FROM comandas WHERE id = ${id}`;
		return await utils.executeQuery(query);
	},
	addComanda: async function (comanda) {
		const {
			items,
			waiter
		} = comanda;
		const query = SQL `INSERT INTO comandas(items, waiter, timestamp, complete)
		VALUES(${items}, ${waiter}, NOW(),0);`;
		return await utils.executeQuery(query);
	},
	updateComanda: async function (comandaId, comanda) {
		const {
			items,
			waiter,
			complete
		} = comanda;
		const query = SQL `UPDATE comandas
		SET items = ${items}, waiter = ${waiter} timestamp = NOW(), complete = ${complete}
		WHERE id = ${comandaId};`;
		return await utils.executeQuery(query);
	},
	deleteComanda: async function (comandaId) {
		const query = SQL `DELETE FROM comandas WHERE id = ${comandaId}`;
		return await utils.executeQuery(query);
	}
};


mongoose.connect('', function (err) {
			if (err) throw err;
			console.log('Conectada correctamente');


			
			
let ProductSchema = new Schema({
	name: {type: String, required: true, max: 100},
	price: {type: Number, required: true},
});
			
			
			
module.exports = mongoose.model('comanda', ProductSchema);

exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};