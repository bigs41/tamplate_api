/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('mysubject', {
		'userSubjectId': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			primaryKey: true,
			comment: "รหัสอ้างอิงตารางวิชาของฉัน",
			autoIncrement: true
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
		'userId': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "รหัสอ้างอิงตารางผู้ใช้งาน",
			references: {
				model: 'user',
				key: 'userId'
			}
		},
		'status': {
			type: DataTypes.ENUM('starting','learning','learnt','tested','stdTested'),
			allowNull: true,
			defaultValue: 'starting',
			comment: "สถานะการเรียนวิชา starting=เริ่มบทเรียนแล้ว, learning=กำลังเรียน, learnt=เรียนจบแล้ว, tested=สอบท้ายวิชาแล้ว, stdTested=สอบวัดมาตรฐานจากศูนย์สอบแล้ว"
		},
		'isFinished': {
			type: DataTypes.ENUM('Y','N','cancelled'),
			allowNull: true,
			defaultValue: 'N',
			comment: "เรียนจบแล้วหรือไม่"
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
		tableName: 'mysubject'
	});
};
