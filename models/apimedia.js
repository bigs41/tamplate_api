/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('apimedia', {
		'id': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			comment: "รหัสอ้างอิงข้อม"
		},
		'path': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "ที่อยู่ไฟล์"
		},
		'name': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "ชื่อไฟล์"
		},
		'apiUserId': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "อ้างอิงรหัสผู้ใช้งาน API"
		},
		'createdAt': {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: 'CURRENT_TIMESTAMP(6)',
			comment: "วันที่สร้างข้อมูล"
		},
		'updatedAt': {
			type: DataTypes.DATE,
			allowNull: true,
			comment: "วันที่แก้ไขข้อมูล"
		}
	}, {
		tableName: 'apimedia'
	});
};
