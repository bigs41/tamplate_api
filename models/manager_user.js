/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('manager_user', {
		'managerUserId': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			primaryKey: true,
			comment: "null",
			autoIncrement: true
		},
		'managerId': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "user id หัวหน้า"
		},
		'userId': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "user id ลูกน้อง",
			references: {
				model: 'user',
				key: 'userId'
			}
		},
		'description': {
			type: DataTypes.TEXT,
			allowNull: true,
			comment: "ความคิดเห็นจากผู้บังคับบัญชา"
		},
		'status': {
			type: DataTypes.ENUM('wait','accept','cancel'),
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
			comment: "null"
		}
	}, {
		tableName: 'manager_user'
	});
};
