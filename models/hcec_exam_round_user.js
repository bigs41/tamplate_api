/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('hcec_exam_round_user', {
		'hcecExamRoundId': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			comment: "null",
			references: {
				model: 'hcec_exam_round_user',
				key: 'hcecExamRoundId'
			}
		},
		'userId': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			comment: "null",
			references: {
				model: 'user',
				key: 'userId'
			}
		},
		'isBan': {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '0',
			comment: "null"
		},
		'isCancel': {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '0',
			comment: "null"
		},
		'accessKey': {
			type: DataTypes.STRING(40),
			allowNull: true,
			comment: "null"
		},
		'createdAt': {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			comment: "วันและเวลาที่ข้อมูลถูกสร้าง"
		},
		'updatedAt': {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			comment: "วันและเวลาที่ข้อมูลถูกแก้ไขล่าสุด"
		}
	}, {
		tableName: 'hcec_exam_round_user'
	});
};
