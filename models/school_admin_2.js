/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('school_admin_2', {
		'schoolCode': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'schoolName': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'schoolShortName': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'idCard': {
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
		'userType': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		}
	}, {
		tableName: 'school_admin_2'
	});
};
