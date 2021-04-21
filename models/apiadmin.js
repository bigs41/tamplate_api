/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('apiadmin', {
		'id': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			primaryKey: true,
			comment: "รหัสอ้างอิงผู้จัดการระบบ openAPI",
			autoIncrement: true
		},
		'email': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "อีเมลของผู้จัดการ"
		},
		'password': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "รหัสผ่าน (เฉพาะบัญชี root)"
		},
		'createdAt': {
			type: DataTypes.DATE,
			allowNull: true,
			comment: "วันที่สร้างข้อมูล"
		},
		'updatedAt': {
			type: DataTypes.DATE,
			allowNull: true,
			comment: "วันและเวลาที่ข้อมูลถูกแก้ไขล่าสุด"
		}
	}, {
		tableName: 'apiadmin'
	});
};
