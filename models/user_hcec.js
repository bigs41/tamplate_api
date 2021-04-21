/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user_hcec', {
		'userHCECId': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			primaryKey: true,
			comment: "รหัสอ้างอิงตารางผู้สมัครสอบ",
			autoIncrement: true
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
		'HCECId': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "รหัสอ้างอิงตารางมาตรฐานการสอบ"
		},
		'noRoom': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "เลขห้องสอบ"
		},
		'note': {
			type: DataTypes.TEXT,
			allowNull: true,
			comment: "หมายเหตุ"
		},
		'status': {
			type: DataTypes.ENUM('มีสิทธิ์สอบ','ไม่มีสิทธิ์สอบ','ไม่ผ่าน','ผ่าน','disable'),
			allowNull: true,
			defaultValue: 'ไม่มีสิทธิ์สอบ',
			comment: "สถานะผู้สมัคร"
		},
		'log': {
			type: DataTypes.TEXT,
			allowNull: true,
			comment: "เก็บการเปลี่ยนแปลงข้อมูลการสอบ"
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
		tableName: 'user_hcec'
	});
};
