const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
	addUser: async function (req, res) {
		const userInfo = req.body;
		const addUserResult = await userModel.addUser(userInfo);

		const addedUserInfo = await userModel.getUserInfo(addUserResult.insertId);

		res.status(200).json({
			message: 'Usuario creado correctamente',
			userInfo: addedUserInfo
		});
	},
	userLogin: async function (req, res) {
		try {
			const {
				username,
				password
			} = req.body;
			const userData = await userModel.checkUser(username);
			if (!userData) {
				res.status(401).json({
					message: 'Usuario o contraseña incorrectos'
				});
				return;
			}
			const passwordIsCorrect = await bcrypt.compare(password, userData[0].password);
			if (!passwordIsCorrect) {
				res.status(401).json({
					message: 'Usuario o contraseña incorrectos'
				});
				return;
			}
			const token = jwt.sign({
				username
			}, process.env.SECRET, {
				expiresIn: 60 * 60 * 24
			});
			res.status(200).json({
				message: 'Login correcto',
				token,
				username
			});
		} catch (error) {
			console.log(error);
			res.status(500).send('Se ha producido un error');
		}
	}
};