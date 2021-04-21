/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('game', {
		'id': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			primaryKey: true,
			comment: "null",
			autoIncrement: true
		},
		'subjectName': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'class': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'name': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'category': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'url': {
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
		tableName: 'game'
	});
};
