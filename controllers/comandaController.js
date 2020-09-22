const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Comanda = require('../models/comandaModel');


mongoose.connect(`mongodb+srv://${process.env.MONGOATLAS_USER}:${process.env.MONGOATLAS_PASS}@servidor01.wpich.azure.mongodb.net/foody?retryWrites=true&w=majority`, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

module.exports = {
	getAllComanda: async function (req, res) {
		const ComandaList = await Comanda.find();
		res.status(200).json({
			...ComandaList
		});
	},
	getOneComanda: async function (req, res) {
		const ComandaId = req.params.ComandaId;

		const ComandaInfo = await Comanda.findById(ComandaId);
		res.status(200).json({
			ComandaInfo
		});
	},
	addComanda: async function (req, res) {
		const username = req.username;
		const ComandaInfo = req.body;

		// Permisos 
		const usernameInfo = await User.find({
			username: username
		});
		const usernameRole = usernameInfo[0].role;

		if (usernameRole !== 99) {
			res.status(301).json({
				message: 'Permisos insuficientes.'
			});
			return;
		}

		const Comanda = new Comanda();
		Comanda.name = ComandaInfo.name;
		Comanda.number = ComandaInfo.number;


		Comanda.save((err, savedInfo) => {
			if (err) throw new Error('Ha habido un error al añadir la comanda', err);
			res.status(200).json({
				message: 'Se ha añadido exitosamente',
				ComandaInfo: savedInfo
			});
		});
	},
	updateComanda: async function (req, res) {
		const username = req.username;
		const ComandaInfo = req.body;
		const ComandaId = req.params.ComandaId;

		const usernameInfo = await User.find({
			username: username
		});
		const usernameRole = usernameInfo[0].role;

		if (usernameRole !== 99) {
			res.status(301).json({
				message: 'Permisos insuficientes.'
			});
			return;
		}

		const newValues = {
			name: ComandaInfo.name,
			number: ComandaInfo.number,

		}

		const updatedInfo = await Comanda.findByIdAndUpdate(ComandaId, newValues, {
			new: true
		});

		res.status(200).json({
			message: 'Se ha modificado exitosamente',
			ComandaInfo: updatedInfo
		});
	},
	deleteComanda: async function (req, res) {
		const ComandatId = req.params.ComandaId;
		const username = req.username;

		const usernameInfo = await User.find({
			username: username
		});
		const usernameRole = usernameInfo[0].role;

		if (usernameRole !== 99) {
			res.status(301).json({
				message: 'Permisos insuficientes.'
			});
			return;
		}

		const ComandaInfo = await Comanda.findByIdAndDelete(ComandaId);
		res.status(200).send('comanda eliminada');
	}
}