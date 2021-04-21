/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('log_learning', {
		'logLearningId': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			primaryKey: true,
			comment: "รหัสอ้างอิงตารางประวัติการเรียนรู้",
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
		'eventType': {
			type: DataTypes.ENUM('learning','testing','online','hcce'),
			allowNull: true,
			defaultValue: 'online',
			comment: "ประเภทเหตุการณ์ (ดูสื่อ, ทำแบบฝึกหัด, ออนไลน์)"
		},
		'eventTime': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "ระยะเวลาของเหตุการณ์ (หน่วย:วินาที)"
		},
		'subjectId': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "รหัสอ้างอิงตารางวิชา",
			references: {
				model: 'subject',
				key: 'subjectId'
			}
		},
		'moduleId': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "รหัสอ้างอิงบทเรียน",
			references: {
				model: 'module',
				key: 'moduleId'
			}
		},
		'testingAttemps': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "เลขครั้งที่ของการสอบ"
		},
		'score': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "คะแนนคิดเป็นเปอเซนต์"
		},
		'startDate': {
			type: DataTypes.DATE,
			allowNull: true,
			comment: "วันเวลาที่เริ่มของเหตุการณ์"
		},
		'endDate': {
			type: DataTypes.DATE,
			allowNull: true,
			comment: "วันเวลาที่สิ้นสุดของเหตุการณ์"
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
		},
		'jsonDetail': {
			type: DataTypes.TEXT,
			allowNull: true,
			comment: "รายละเอียดการสอบ"
		},
		'stationCode': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "รหัสศูนย์สอบ"
		}
	}, {
		tableName: 'log_learning'
	});
};
