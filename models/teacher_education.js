/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('teacher_education', {
		'teacherEducationId': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			primaryKey: true,
			comment: "null",
			autoIncrement: true
		},
		'TRN_TEACHER_ACADEMIC_LEVEL_CODE': {
			type: DataTypes.STRING(10),
			allowNull: false,
			comment: "null"
		},
		'EDUCATION_LEVEL_NAME': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'status': {
			type: DataTypes.ENUM('enable','disable'),
			allowNull: true,
			defaultValue: 'enable',
			comment: "สถานะการเปิด ปิดตำแหน่ง"
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
		'org_name': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'code': {
			type: DataTypes.STRING(256),
			allowNull: true,
			comment: "null"
		},
		'organizationCode': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "อ้างอิงสังกัด"
		}
	}, {
		tableName: 'teacher_education'
	});
};
