/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('trm_value', {
		'valueId': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			primaryKey: true,
			comment: "รหัสอ้างอิงข้อมูล trm",
			autoIncrement: true
		},
		'colId': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "รหัสอ้างอิงคอลัมน์"
		},
		'parent': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "รหัสอ้างอิงการเชื่อมโยงข้อมูล trm"
		},
		'value': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "ข้อมูล trm"
		},
		'code': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "รหัสอ้างอิงองค์กร"
		},
		'orgId': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "รหัสอ้างอิงการ sync"
		},
		'sort': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "ลำดับข้อมูล trm"
		},
		'createdAt': {
			type: DataTypes.DATE,
			allowNull: true,
			comment: "null"
		},
		'updatedAt': {
			type: DataTypes.DATE,
			allowNull: true,
			comment: "null"
		}
	}, {
		tableName: 'trm_value'
	});
};
