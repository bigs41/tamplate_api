/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('question', {
		'questionId': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			primaryKey: true,
			comment: "รหัสอ้างอิงตารางคำถาม",
			autoIncrement: true
		},
		'message': {
			type: DataTypes.TEXT,
			allowNull: true,
			comment: "ข้อความคำตอบ"
		},
		'soundPath': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "ที่อยู่ของไฟล์เสียง"
		},
		'mediaPath': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "ที่อยู่ของไฟล์"
		},
		'type': {
			type: DataTypes.ENUM('multipleChoices','spellings','fillInTheBlanks','matchings','trueOrFalses','mathematicalEquations','openQuestions','groupQuestionSelect','groupQuestion'),
			allowNull: true,
			comment: "ประเภทของคำถาม"
		},
		'option': {
			type: DataTypes.TEXT,
			allowNull: true,
			comment: "null"
		},
		'sort': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "ลำดับ"
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
		tableName: 'question'
	});
};
