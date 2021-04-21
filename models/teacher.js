/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('teacher', {
		'teacherJurisdictionId': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'organizeNameTha': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'teacherSchoolId': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'currentSchoolName': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'teacherPersonId': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'title': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'firstname': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'lastname': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'birthdate': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'teacherAcademicLevelCode': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'educationLevelName': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		}
	}, {
		tableName: 'teacher'
	});
};
