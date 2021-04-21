/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user_teaching', {
		'userTeachingId': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			primaryKey: true,
			comment: "รหัสอ้างอิงตารางข้อมูลการสอนของครู",
			autoIncrement: true
		},
		'subjectTeachingCode': {
			type: DataTypes.ENUM('ภาษาไทย','คณิตศาสตร์','วิทยาศาสตร์','สังคมศึกษา ศาสนา และวัฒนธรรม','สุขศึกษาและพลศึกษา','ศิลปะ','การงานอาชีพและเทคโนโลยี','ภาษาต่างประเทศ'),
			allowNull: true,
			comment: "รหัสวิชาการสอน"
		},
		'GradeTeachingCode': {
			type: DataTypes.ENUM('ป1','ป2','ป3','ป4','ป5','ป6','ม1','ม2','ม3','ม4','ม5','ม6','อ1','อ2','อ3','','เตรียมอนุบาล'),
			allowNull: true,
			comment: "รหัสระดับชั้นการสอน"
		},
		'userId': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "รหัสอ้างอิงตารางผู้ใช้งาน",
			references: {
				model: 'user',
				key: 'userId'
			}
		},
		'createdAt': {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			comment: "วันและเวลาที่ข้อมูลถูกสร้าง"
		},
		'updatedAt': {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			comment: "วันและเวลาที่ข้อมูลถูกแก้ไขล่าสุด"
		}
	}, {
		tableName: 'user_teaching'
	});
};
