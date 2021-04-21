/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('trm_subject', {
		'trmSubjectId': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			primaryKey: true,
			comment: "null",
			autoIncrement: true
		},
		'valueId': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "อ้างอิง trm_value"
		},
		'sort': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "ลำดับ วิชา"
		},
		'subjectId': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "อ้างอิง subject"
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
		tableName: 'trm_subject'
	});
};
