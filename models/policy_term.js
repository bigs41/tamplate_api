/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('policy_term', {
		'policyTermId': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			primaryKey: true,
			comment: "รหัสอ้างอิงตารางนโยบายและเงื่อนไข",
			autoIncrement: true
		},
		'policy': {
			type: DataTypes.TEXT,
			allowNull: true,
			comment: "นโยบาย"
		},
		'term': {
			type: DataTypes.TEXT,
			allowNull: true,
			comment: "เงื่อนไข"
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
		tableName: 'policy_term'
	});
};
