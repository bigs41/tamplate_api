/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('subject', {
		'subjectId': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			primaryKey: true,
			comment: "รหัสอ้างอิงตารางวิชา",
			autoIncrement: true
		},
		'name': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "ชื่อวิชา"
		},
		'description': {
			type: DataTypes.TEXT,
			allowNull: true,
			comment: "รายละเอียด"
		},
		'userIdCreator': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "รหัสอ้างอิงตารางวิชาผู้ใช้งาน (ข้อมูลของผู้สร้างวิชา)"
		},
		'orgcodeCreator': {
			type: DataTypes.STRING(100),
			allowNull: true,
			comment: "รหัสหน่วยงานของผู้สร้างวิชา"
		},
		'isLearningOrder': {
			type: DataTypes.ENUM('Y','N'),
			allowNull: true,
			defaultValue: 'Y',
			comment: "เรียนบทเรียนตามลำดับหรือไม่ (ใช่=Y, ไม่=N)"
		},
		'cover': {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: '',
			comment: "ที่อยู่ของไฟล์ปก"
		},
		'owner_name': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'subjectCategoryId': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "null"
		},
		'createdAt': {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			comment: "วันและเวลาที่ข้อมูลถูกสร้าง"
		},
		'organizationCode': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "อ้างอิงสังกัด"
		},
		'updatedAt': {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			comment: "วันและเวลาที่ข้อมูลถูกแก้ไขล่าสุด"
		},
		'createdBy': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "null"
		},
		'countUnit': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "หน่วยกิตวิชา"
		},
		'isPublic': {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: '1',
			comment: "null"
		}
	}, {
		tableName: 'subject'
	});
};
