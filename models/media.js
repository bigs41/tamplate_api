/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('media', {
		'mediaId': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			primaryKey: true,
			comment: "รหัสอ้างอิงตารางไฟล์สื่อ",
			autoIncrement: true
		},
		'name': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "ชื่อไฟล์"
		},
		'description': {
			type: DataTypes.TEXT,
			allowNull: true,
			comment: "รายละเอียดไฟล์"
		},
		'refId': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "รหัสอ้างอิงตางตามคอลัมน์ refId"
		},
		'refTable': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "ชื่อตาราง"
		},
		'path': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "ที่อยู่ของไฟล์"
		},
		'fileType': {
			type: DataTypes.STRING(5),
			allowNull: true,
			comment: "นามสกุลไฟล์"
		},
		'mediaType': {
			type: DataTypes.ENUM('cover','doc','','media','youtube'),
			allowNull: true,
			comment: "ประเภทของไฟล์"
		},
		'duration': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "วินาที"
		},
		'organizationCode': {
			type: DataTypes.STRING(10),
			allowNull: true,
			comment: "null"
		},
		'category': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null"
		},
		'createdBy': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "null"
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
		tableName: 'media'
	});
};
