const SQL = require('sql-template-strings');
const bcrypt = require('bcryptjs');
const utils = require('../utils/index');
const mongoose = require('mongoose');


module.exports = {
	addUser: async (userInfo) => {
		const {
			name,
			role,
			username,
			password
		} = userInfo;

		const salt = await bcrypt.genSalt(10);
		const encryptedPassword = await bcrypt.hash(password, salt);

		const query = SQL `INSERT INTO workers(name, role, username, password) 
        VALUES(${name}, ${role}, ${username}, ${encryptedPassword});`;
		return await utils.executeQuery(query);
	},
	getUserInfo: async (userId) => {
		const query = SQL `SELECT wo.name, wo.username, ro.name AS role FROM workers wo
        JOIN roles ro ON wo.role = ro.id
        WHERE wo.id = ${userId}`;
		return await utils.executeQuery(query);
	},
	checkUser: async (username) => {
		const query = SQL `SELECT username, password FROM workers WHERE username = ${username};`;
		return await utils.executeQuery(query);
	},
	getPermissions: async (username) => {
		const query = SQL `SELECT rau.get_permission,
            rau.add_permission,
            rau.complete_permission,
            rau.delete_permission
        FROM workers wo
        JOIN roles_authorizations rau ON wo.role = rau.role_id
        WHERE wo.username = ${username};`;
		return await utils.executeQuery(query);
	},
	getUserRoleInfo: async (username) => {
		const query = SQL `SELECT ro.id AS role FROM workers wo
        JOIN roles ro ON wo.role = ro.id
        WHERE wo.username = ${username}`;
		return await utils.executeQuery(query);
	},
};