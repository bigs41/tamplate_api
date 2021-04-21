/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('service_token', {
		'serviceTokenId': {
			type: DataTypes.STRING(6),
			allowNull: false,
			primaryKey: true,
			comment: "null"
		},
		'token': {
			type: DataTypes.STRING(255),
			allowNull: false,
			comment: "null"
		},
		'description': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'createdAt': {
			type: DataTypes.DATE,
			allowNull: false,
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
		tableName: 'service_token'
	});
};
