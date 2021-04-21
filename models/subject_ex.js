/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('subject_ex', {
		'subjectExId': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			primaryKey: true,
			comment: "รหัสอ้างอิงตารางวิชาและชุดข้อสอบ",
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
		'exId': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "รหัสอ้างอิงตารางชุดข้อสอบ",
			references: {
				model: 'ex',
				key: 'exId'
			}
		},
		'timer': {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: '1800',
			comment: "เวลาในการทำแบบทดสอบ (วินาที)"
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
		'passScore': {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: '70',
			comment: "คะแนนในการผ่านเกณฑ์ (เปอร์เซ็น)"
		}
	}, {
		tableName: 'subject_ex'
	});
};
