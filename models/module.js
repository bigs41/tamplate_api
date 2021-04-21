/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('module', {
		'moduleId': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			primaryKey: true,
			comment: "รหัสอ้างอิงตารางโมดูล",
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
		'code': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "ลำดับหัวข้อแต่ละชั้นของโมดูล"
		},
		'sort': {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: '1',
			comment: "เลขเรียงลำดับโมดูล"
		},
		'name': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "ชื่อโมดูล"
		},
		'description': {
			type: DataTypes.TEXT,
			allowNull: true,
			comment: "รายละเอียดโมดูล"
		},
		'percentExPassed': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "เปอร์เซนต์ที่ต้องสอบผ่าน"
		},
		'videoId': {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: '',
			comment: "รหัสสตรีมมิ่งวิดีโอ"
		},
		'learningMaxTime': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "ระยะเวลาการเรียน"
		},
		'testingMaxTime': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "ระยะเวลาการสอบ"
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
		tableName: 'module'
	});
};
