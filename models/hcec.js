/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('hcec', {
		'HCECId': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			primaryKey: true,
			comment: "รหัสอ้างอิงตารางมาตรฐานการสอบ",
			autoIncrement: true
		},
		'stationId': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "รหัสอ้างอิงตารางศูนย์สอบ",
			references: {
				model: 'station',
				key: 'stationId'
			}
		},
		'standardTestId': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "รหัสอ้างอิงตารางมาตรฐานการสอบ"
		},
		'address': {
			type: DataTypes.TEXT,
			allowNull: true,
			comment: "สถานที่สอบรุปแบบ JSON"
		},
		'registStartDate': {
			type: DataTypes.DATE,
			allowNull: true,
			comment: "วันที่เปิดลงทะเบียน"
		},
		'registEndDate': {
			type: DataTypes.DATE,
			allowNull: true,
			comment: "วันที่ปิดลงทะเบียน"
		},
		'testStartDate': {
			type: DataTypes.DATE,
			allowNull: true,
			comment: "วันที่เวลาที่เริ่มสอบ"
		},
		'testEndDate': {
			type: DataTypes.DATE,
			allowNull: true,
			comment: "วันที่เวลาสิ้นสุดการสอบ"
		},
		'maxTester': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "จำนวนคนที่เปิดรับสมัคร"
		},
		'subjectMustPassed': {
			type: DataTypes.TEXT,
			allowNull: true,
			comment: "รหัสวิชาที่สอบ รูปแบบ JSON"
		},
		'status': {
			type: DataTypes.ENUM('registering','testing','finished'),
			allowNull: true,
			comment: "สถานะของผู้สมัครสอบ"
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
		tableName: 'hcec'
	});
};
