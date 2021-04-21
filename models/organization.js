/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('organization', {
		'organizationCode': {
			type: DataTypes.STRING(255),
			allowNull: false,
			primaryKey: true,
			comment: "null"
		},
		'subDomain': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'clsJurisdiction': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'createdAt': {
			type: DataTypes.DATE,
			allowNull: false,
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
		tableName: 'organization'
	});
};
