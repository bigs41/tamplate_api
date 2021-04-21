/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('whitelist', {
		'id': {
			type: DataTypes.CHAR(36),
			allowNull: false,
			primaryKey: true,
			comment: "null"
		},
		'apiKey': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'secretKey': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'createdAt': {
			type: DataTypes.DATE,
			allowNull: true,
			comment: "null"
		},
		'updatedAt': {
			type: DataTypes.DATE,
			allowNull: true,
			comment: "null"
		}
	}, {
		tableName: 'whitelist'
	});
};
