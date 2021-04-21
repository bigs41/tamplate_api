/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('school_admin', {
		'schoolAdminId': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			primaryKey: true,
			comment: "null",
			autoIncrement: true
		},
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
		'A': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'idCard': {
			type: DataTypes.STRING(255),
			allowNull: false,
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
			type: DataTypes.ENUM('นายทะเบียน/ผู้รับผิดชอบข้อมูลของโรงเรียน','ผู้บริหารของโรงเรียน'),
			allowNull: true,
			defaultValue: 'นายทะเบียน/ผู้รับผิดชอบข้อมูลของโรงเรียน',
			comment: "null"
		}
	}, {
		tableName: 'school_admin'
	});
};
