/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('skill', {
		'skillId': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			primaryKey: true,
			comment: "รหัสอ้างอิงตารางทักษะ",
			autoIncrement: true
		},
		'skill': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "ชื่อทักษะ"
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
		tableName: 'skill'
	});
};
