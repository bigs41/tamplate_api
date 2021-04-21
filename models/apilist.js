/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('apilist', {
		'id': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			primaryKey: true,
			comment: "รหัสอ้างอิงรายการ API",
			autoIncrement: true
		},
		'sort': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "ลำดับ"
		},
		'api': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "ชื่อ API"
		},
		'description': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "รายละเอียด"
		},
		'createdAt': {
			type: DataTypes.DATE,
			allowNull: true,
			comment: "วันที่สร้างข้อมูล"
		},
		'updatedAt': {
			type: DataTypes.DATE,
			allowNull: true,
			comment: "วันที่แก้ไขข้อมูล"
		}
	}, {
		tableName: 'apilist'
	});
};
