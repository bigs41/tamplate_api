/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('apiuser', {
		'id': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			primaryKey: true,
			comment: "รหัสอ้างอิงผู้ใช้งาน API",
			autoIncrement: true
		},
		'consumers_id': {
			type: DataTypes.CHAR(36),
			allowNull: true,
			comment: "รหัสอ้างอิง API gateway (kong api)"
		},
		'type': {
			type: DataTypes.ENUM('บุคคลทั่วไป','องค์กรหรือหน่วยงานรัฐ'),
			allowNull: true,
			comment: "ประเภทผู้ใช้งาน"
		},
		'prefix': {
			type: DataTypes.STRING(20),
			allowNull: true,
			comment: "คำนำหน้า"
		},
		'name': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "ชื่อ"
		},
		'lastname': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "นามสกุล"
		},
		'idcard': {
			type: DataTypes.STRING(13),
			allowNull: true,
			comment: "รหัสเลขบัตรประชาชน"
		},
		'birth': {
			type: DataTypes.DATEONLY,
			allowNull: true,
			comment: "วันเดือนปีเกิด"
		},
		'email': {
			type: DataTypes.STRING(100),
			allowNull: true,
			comment: "อีเมล"
		},
		'tel': {
			type: DataTypes.STRING(20),
			allowNull: true,
			comment: "เบอร์โทรที่ติดต่อได้"
		},
		'sysname': {
			type: DataTypes.TEXT,
			allowNull: true,
			comment: "ระบบที่ต้องการใช้งาน"
		},
		'IdcardImgPath': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "ที่อยู่ภาพสำเนาบัตรประชาชน (บุคคลทั่วไป)"
		},
		'affiliate': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "สังกัด"
		},
		'isCompany': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "เป็นตัวแทนบริษัท"
		},
		'companyName': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "ชื่อบริษัท"
		},
		'project': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "โครงการที่พัฒนา"
		},
		'orgProject': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "หน่วยงานที่รับผิดชอบโครงการ"
		},
		'apiName': {
			type: DataTypes.TEXT,
			allowNull: true,
			comment: "ระบบที่ต้องการใช้งาน"
		},
		'position': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "ตำแหน่ง"
		},
		'department': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "กอง/ฝ่าย/แผนก"
		},
		'status': {
			type: DataTypes.ENUM('อนุมัติ','ไม่อนุมัติ','ยกเลิก'),
			allowNull: true,
			defaultValue: 'ไม่อนุมัติ',
			comment: "สถานะ"
		},
		'approvedDate': {
			type: DataTypes.DATE,
			allowNull: true,
			comment: "วันที่อนุมัติ"
		},
		'createdAt': {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			comment: "วันที่สร้างข้อมูล"
		},
		'updatedAt': {
			type: DataTypes.DATE,
			allowNull: true,
			comment: "วันที่แก้ไขข้อมูล"
		},
		'token': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "ข้อมูล token"
		},
		'detail': {
			type: DataTypes.TEXT,
			allowNull: true,
			comment: "null"
		}
	}, {
		tableName: 'apiuser'
	});
};
