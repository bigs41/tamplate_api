/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('ex_question', {
		'exQuestionId': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			primaryKey: true,
			comment: "รหัสอ้างอิงตารางคำถามกับชุดข้อสอบ",
			autoIncrement: true
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
		'questionId': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "รหัสอ้างอิงตารางคำถาม",
			references: {
				model: 'question',
				key: 'questionId'
			}
		},
		'isComplete': {
			type: DataTypes.ENUM('true','false'),
			allowNull: true,
			defaultValue: 'true',
			comment: "ความสมบูรณ์ของคำถาม (ข้อมูลสมบูรณ์=true, ข้อมูลไม่สมบูรณ์=false)"
		},
		'score': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "คะแนนคำถาม"
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
		tableName: 'ex_question'
	});
};
