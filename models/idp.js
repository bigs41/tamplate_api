/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('idp', {
		'idpId': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			primaryKey: true,
			comment: "รหัสอ้างอิง idp",
			autoIncrement: true
		},
		'valueId': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "รหัสอ้างอิง trm"
		},
		'userId': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "รหัสอ้างอิง user"
		},
		'code': {
			type: DataTypes.TEXT,
			allowNull: true,
			comment: "รหัสอ้างอิงที่เกี่ยวข้องของ trm"
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
		tableName: 'idp'
	});
};
