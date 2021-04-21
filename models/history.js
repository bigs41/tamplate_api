/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('history', {
		'historyId': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			primaryKey: true,
			comment: "รหัสอ้างอิงตารางประวัติการดูสื่อ",
			autoIncrement: true
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
		'isDel': {
			type: DataTypes.ENUM('Y','N'),
			allowNull: true,
			defaultValue: 'N',
			comment: "ลบประวัตินี้หรือไม่ (ใช่=Y, ไม่ใช่=N)"
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
		'moduleId': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "รหัสอ้างอิงตารางโมดูล",
			references: {
				model: 'module',
				key: 'moduleId'
			}
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
		tableName: 'history'
	});
};
