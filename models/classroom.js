/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('classroom', {
		'classroomId': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			primaryKey: true,
			comment: "รหัสอ้างอิงห้องเรียน",
			autoIncrement: true
		},
		'subjectId': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "รหัสอ้างอิงวิชา",
			references: {
				model: 'subject',
				key: 'subjectId'
			}
		},
		'name': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "ชื่อห้องเรียน"
		},
		'description': {
			type: DataTypes.TEXT,
			allowNull: true,
			comment: "รายละเอียด"
		},
		'startDate': {
			type: DataTypes.DATE,
			allowNull: true,
			comment: "วันที่เปิดหัวเรียน"
		},
		'endDate': {
			type: DataTypes.DATE,
			allowNull: true,
			comment: "วันที่ปิดการใช้งานห้องเรียน"
		},
		'stationAPIId': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "รหัสศูนย์สอบที่ได้จาก API MOE"
		},
		'lat': {
			type: DataTypes.STRING(50),
			allowNull: true,
			comment: "ละติจูดศูนย์สอบ"
		},
		'long': {
			type: DataTypes.STRING(50),
			allowNull: true,
			comment: "ลองติจูดศูนย์สอบ"
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
		tableName: 'classroom'
	});
};
