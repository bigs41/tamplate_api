/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('notification', {
		'notiId': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			primaryKey: true,
			comment: "รหัสอ้างอิงตารางการแจ้งเตือน",
			autoIncrement: true
		},
		'message': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "ข้อความ"
		},
		'menu': {
			type: DataTypes.ENUM('subject','advice'),
			allowNull: true,
			comment: "เมนูที่การแจ้งเตือนอ้างถึง"
		},
		'userId': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "รหัสอ้างอิงตารางผู้ใช้งาน",
			references: {
				model: 'user',
				key: 'userId'
			}
		},
		'refTable': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'refId': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "รหัสอ้างอิงตารางตามคอลัมน์ menu"
		},
		'isRead': {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: '0',
			comment: "0 คือยังไม่ได้อ่าน 1 คืออ่านแล้ว"
		},
		'refURL': {
			type: DataTypes.TEXT,
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
		tableName: 'notification'
	});
};
