/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('personnel', {
		'organizationId': {
			type: DataTypes.STRING(255),
			allowNull: false,
			comment: "null"
		},
		'personType': {
			type: DataTypes.ENUM('ข้าราชการพลเรือนสามัญ'),
			allowNull: true,
			defaultValue: 'ข้าราชการพลเรือนสามัญ',
			comment: "null"
		},
		'positionId': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'icCard': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'title': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'firstname': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'lastname': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'birthdate': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'createdAt': {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			comment: "null"
		},
		'updatedAt': {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			comment: "null"
		}
	}, {
		tableName: 'personnel'
	});
};
