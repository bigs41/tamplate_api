/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('role_user', {
		'roleUserId': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			primaryKey: true,
			comment: "รหัสอ้างอิงตารางบทบาทและตารางผู้ใช้งาน",
			autoIncrement: true
		},
		'roleId': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "รหัสอ้างอิงตารางบทบาท",
			references: {
				model: 'role',
				key: 'roleId'
			}
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
		tableName: 'role_user'
	});
};
