/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('help', {
		'helpId': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			primaryKey: true,
			comment: "null",
			autoIncrement: true
		},
		'userId': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "null",
			references: {
				model: 'user',
				key: 'userId'
			}
		},
		'topic': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'text': {
			type: DataTypes.TEXT,
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
		},
		'status': {
			type: DataTypes.ENUM('reply','delete'),
			allowNull: true,
			comment: "null"
		}
	}, {
		tableName: 'help'
	});
};
