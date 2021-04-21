/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('self_learning', {
		'selfLearningId': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			primaryKey: true,
			comment: "รหัสอ้างอิงตารางเรียนรู้ด้วยตนเอง",
			autoIncrement: true
		},
		'skillId': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "รหัสอ้างอิงตารางทักษะ",
			references: {
				model: 'skill',
				key: 'skillId'
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
		'json': {
			type: DataTypes.TEXT,
			allowNull: true,
			comment: "ข้อมูลการเรียนรู้ด้วยตนเองในรูปแบบ JSON"
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
		tableName: 'self_learning'
	});
};
