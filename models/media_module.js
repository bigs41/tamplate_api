/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('media_module', {
		'mediaModuleId': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			primaryKey: true,
			comment: "null",
			autoIncrement: true
		},
		'organizationCode': {
			type: DataTypes.STRING(10),
			allowNull: true,
			comment: "null"
		},
		'mediaId': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "null"
		},
		'moduleId': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "null"
		},
		'createdAt': {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			comment: "null"
		},
		'updatedAt': {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			comment: "null"
		}
	}, {
		tableName: 'media_module'
	});
};
