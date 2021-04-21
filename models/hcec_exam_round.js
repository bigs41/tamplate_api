/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('hcec_exam_round', {
		'hcecExamRoundId': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			primaryKey: true,
			comment: "null",
			autoIncrement: true
		},
		'roomName': {
			type: DataTypes.STRING(255),
			allowNull: false,
			comment: "null"
		},
		'stationId': {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: "null"
		},
		'startTime': {
			type: DataTypes.DATE,
			allowNull: false,
			comment: "null"
		},
		'endTime': {
			type: DataTypes.DATE,
			allowNull: false,
			comment: "null"
		},
		'maxUserAmount': {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: "null"
		},
		'signUpEnable': {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '1',
			comment: "null"
		},
		'signUpStartDate': {
			type: DataTypes.DATE,
			allowNull: false,
			comment: "null"
		},
		'signUpEndDate': {
			type: DataTypes.DATE,
			allowNull: false,
			comment: "null"
		},
		'dismiss': {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '0',
			comment: "null"
		},
		'enable': {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '1',
			comment: "null"
		},
		'standardTestId': {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: "null"
		},
		'tag': {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: '',
			comment: "null"
		},
		'cancelBeforeDay': {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: '0',
			comment: "null"
		},
		'color': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'uid': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'createdAt': {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			comment: "วันและเวลาที่ข้อมูลถูกสร้าง"
		},
		'updatedAt': {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			comment: "วันและเวลาที่ข้อมูลถูกแก้ไขล่าสุด"
		}
	}, {
		tableName: 'hcec_exam_round'
	});
};
