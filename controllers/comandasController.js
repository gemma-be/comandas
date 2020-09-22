const {
	query
} = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const comandasModel = require('../models/comandasModel');
const userModel = require('../models/userModel');
const isProduction = process.env.PRODUCTION === 'true' ? true : false;

module.exports = {
	getAllComandas: async function (req, res) {
		if (isProduction) {
			res.status(200).json({
				message: 'Listado de todas las comandas'
			});
			return;
		}
		const comandasList = await comandasModel.getAllComandas();
		res.json(comandasList);
	},
	getOneComanda: async function (req, res) {
		if (isProduction) {
			res.status(200).json({
				message: 'Datos de una comanda'
			});
			return;
		}
		const comandaId = req.params.id;
		const queryResult = await comandasModel.getOneComanda(comandaId);
		console.log(queryResult);
		res.status(200).json(queryResult[0]);
	},
	addComanda: async function (req, res) {
		if (isProduction) {
			res.status(200).json({
				message: 'Comanda añadida'
			});
			return;
		}
		// Compruebo permisos
		const userPermissions = await userModel.getPermissions(req.username);
		console.log('PERMISOS', userPermissions);
		if (!userPermissions[0].add_permission) {
			res.status(301).json({
				message: 'Permisos insuficientes.'
			});
			return;
		}

		// Añado comanda
		const comanda = req.body;
		const queryResult = await comandasModel.addComanda(comanda);
		res.status(200).json({
			message: 'Comanda añadida',
			idComanda: queryResult.insertId
		});
	},
	updateComanda: async function (req, res) {
		if (isProduction) {
			res.status(200).json({
				message: 'Comanda actualizada'
			});
			return;
		}
		const comanda = req.body;
		const comandaId = req.params.id;
		const queryResult = await comandasModel.updateComanda(comandaId, comanda);
		res.status(200).json({
			message: 'Comanda actualizada'
		});
	},
	deleteComanda: async function (req, res) {
		if (isProduction) {
			res.status(200).json({
				message: 'Comanda eliminada'
			});
			return;
		}
		const comandaId = req.params.id;
		const queryResult = await comandasModel.deleteComanda(comandaId);
		res.status(200).json({
			message: 'Comanda borrada'
		});
	}
};