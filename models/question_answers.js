/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('question_answers', {
		'questionAnswersId': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			primaryKey: true,
			comment: "รหัสอ้างอิงตารางคำถามเชิงกลุ่ม",
			autoIncrement: true
		},
		'questionId': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "รหัสอ้างอิงตารางคำถาม",
			references: {
				model: 'question',
				key: 'questionId'
			}
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
		'sort': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "ลำดับของคำตอบ (ข้อที่ 1 คือคำตอบที่ถูก)"
		},
		'option': {
			type: DataTypes.TEXT,
			allowNull: true,
			comment: "กำหนดค่าคำตอบ"
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
		'messageQue': {
			type: DataTypes.TEXT,
			allowNull: true,
			comment: "ข้อความคำถาม(matching)"
		},
		'mediaPathQue': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "ที่อยู่ของไฟล์คำถาม(matching)"
		}
	}, {
		tableName: 'question_answers'
	});
};
