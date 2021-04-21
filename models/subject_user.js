/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('subject_user', {
		'subjectUserId': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			primaryKey: true,
			comment: "รหัสอ้างอิงตารางวิชาบังคับและแนะนำ",
			autoIncrement: true
		},
		'name': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "ชื่อ"
		},
		'positionId': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "รหัสตำแหน่ง"
		},
		'subjectId': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "รหัสตารางวิชา",
			references: {
				model: 'subject',
				key: 'subjectId'
			}
		},
		'subjectType': {
			type: DataTypes.ENUM('บังคับ','แนะนำ'),
			allowNull: true,
			defaultValue: 'บังคับ',
			comment: "ประเภทของวิชา"
		},
		'TRN_TEACHER_ACADEMIC_LEVEL_CODE': {
			type: DataTypes.STRING(6),
			allowNull: true,
			comment: "null"
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
		tableName: 'subject_user'
	});
};
