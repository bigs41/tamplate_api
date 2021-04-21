/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('trm_col', {
		'colId': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			primaryKey: true,
			comment: "รหัสอ้างอิงคอลัมน์",
			autoIncrement: true
		},
		'value': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "ชื่อ คอลัมน์"
		},
		'sort': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "ลำดับ คอลัมน์"
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
		tableName: 'trm_col'
	});
};
