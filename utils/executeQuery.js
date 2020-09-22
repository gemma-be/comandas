const mysql = require('mysql');
const mongoose = require('mongoose');

const accessInfo = {
	host: process.env.DDBB_HOST,
	user: process.env.DDBB_USER,
	password: process.env.DDBB_PASSWORD,
	database: process.env.DDBB_NAME,
};

module.exports = function (query) {
	return new Promise((resolve, reject) => {
		const connection = mysql.createConnection(accessInfo);
		connection.connect();

		connection.query(query, function (err, rows, fields) {
			if (err) reject(err);
			resolve(rows);
		});

		connection.end();
	});
};