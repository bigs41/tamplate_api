/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('apilistuser', {
		'id': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			primaryKey: true,
			comment: "รหัสอ้างอิงรายการ API และตารางผู้ใช้งาน",
			autoIncrement: true
		},
		'apiListId': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "รหัสอ้างอิงรายการ API"
		},
		'apiUserId': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "รหัสอ้างอิงผู้ใช้งาน API"
		},
		'status': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "สถานะ"
		},
		'createdAt': {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: 'CURRENT_TIMESTAMP(6)',
			comment: "วันและเวลาที่ข้อมูลถูกสร้าง"
		},
		'updatedAt': {
			type: DataTypes.DATE,
			allowNull: true,
			comment: "วันและเวลาที่ข้อมูลถูกแก้ไขล่าสุด"
		}
	}, {
		tableName: 'apilistuser'
	});
};
