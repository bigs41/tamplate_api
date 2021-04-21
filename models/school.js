/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('school', {
		'schoolId': {
			type: DataTypes.STRING(255),
			allowNull: false,
			primaryKey: true,
			comment: "null"
		},
		'organizeNameTha': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'schoolName': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'schoolNameEng': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'schoolHouseId': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'schoolHouseNumber': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'schoolVillageNumber': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'schoolTrok': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'schoolSoi': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'schoolStreet': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'subdistrictName': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'provinceName': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'districtName': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'schoolPostcode': {
			type: DataTypes.STRING(255),
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
		tableName: 'school'
	});
};
