/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('logfile', {
		'file': {
			type: DataTypes.STRING(255),
			allowNull: false,
			primaryKey: true,
			comment: "ไฟล์ log"
		},
		'request': {
			type: DataTypes.TEXT,
			allowNull: true,
			comment: "null"
		},
		'transection': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'eventType': {
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
			comment: "วันและเวลาที่ข้อมูลถูกแก้ไข"
		}
	}, {
		tableName: 'logfile'
	});
};
