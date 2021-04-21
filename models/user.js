/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user', {
		'userId': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			primaryKey: true,
			comment: "รหัสอ้างอิงตารางผู้ใช้งาน",
			autoIncrement: true
		},
		'idCard': {
			type: DataTypes.STRING(13),
			allowNull: false,
			defaultValue: '',
			comment: "เลขบัตรประชาชน",
			unique: true
		},
		'prefix': {
			type: DataTypes.STRING(100),
			allowNull: true,
			comment: "null"
		},
		'middlename': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
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
		'email': {
			type: DataTypes.STRING(150),
			allowNull: false,
			defaultValue: '',
			comment: "อีเมล",
			unique: true
		},
		'password': {
			type: DataTypes.STRING(80),
			allowNull: false,
			defaultValue: '',
			comment: "รหัสผ่านที่ถูกเข้ารหัส"
		},
		'tel': {
			type: DataTypes.STRING(30),
			allowNull: true,
			comment: "เบอร์โทรศัพท์"
		},
		'birthDate': {
			type: DataTypes.DATE,
			allowNull: true,
			comment: "วันเกิด"
		},
		'TRN_TEACHER_ACADEMIC_LEVEL_CODE': {
			type: DataTypes.STRING(11),
			allowNull: true,
			comment: "รหัสตำแหน่งครู"
		},
		'positionId': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "รหัสตำแหน่ง"
		},
		'userType': {
			type: DataTypes.ENUM('นักเรียน','ครู','ข้าราชการ'),
			allowNull: true,
			comment: "ประเภทของผู้ใช้งาน"
		},
		'googleId': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'geolocation': {
			type: "POINT",
			allowNull: true,
			comment: "null"
		},
		'schoolId': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'organizationCode': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'jurisdiction_id': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "รหัสอ้างอิงสังกัด"
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
		tableName: 'user'
	});
};
