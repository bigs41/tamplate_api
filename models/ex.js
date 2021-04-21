/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('ex', {
		'exId': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			primaryKey: true,
			comment: "รหัสอ้างอิงตารางชุดข้อสอบ",
			autoIncrement: true
		},
		'mediaId': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "รหัสอ้างอิงตารางไฟล์สื่อ"
		},
		'name': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "รายละเอียด"
		},
		'description': {
			type: DataTypes.TEXT,
			allowNull: true,
			comment: "คะแนนเต็มของชุดข้อสอบ"
		},
		'maxScore': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "คะแนนเต็มใน example"
		},
		'userId': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "id ผู้สร้าง"
		},
		'createdBy': {
			type: DataTypes.ENUM('skill','teacher','student'),
			allowNull: true,
			defaultValue: 'skill',
			comment: "สร้างโดย skill,teacher,student"
		},
		'exCategoryId': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "null"
		},
		'organizationCode': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "อ้างอิงสังกัด"
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
		tableName: 'ex'
	});
};
