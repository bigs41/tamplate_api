/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('position', {
		'positionId': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			primaryKey: true,
			comment: "null",
			autoIncrement: true
		},
		'name': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "ชื่อตำแหน่ง"
		},
		'code': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "รหัสตำแหน่ง"
		},
		'org_name': {
			type: DataTypes.STRING(255),
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
		tableName: 'position'
	});
};
