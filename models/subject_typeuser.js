/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('subject_typeuser', {
		'id': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			primaryKey: true,
			comment: "null",
			autoIncrement: true
		},
		'subjectId': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "null"
		},
		'typeUser': {
			type: DataTypes.ENUM('obec','onec','opse','ovec'),
			allowNull: true,
			comment: "null"
		},
		'subjectType': {
			type: DataTypes.ENUM('แนะนำ','บังคับ'),
			allowNull: true,
			comment: "null"
		},
		'createdAt': {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: 'CURRENT_TIMESTAMP(6)',
			comment: "null"
		},
		'updatedAt': {
			type: DataTypes.DATE,
			allowNull: true,
			comment: "null"
		}
	}, {
		tableName: 'subject_typeuser'
	});
};
