/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('banner', {
		'bannerId': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			primaryKey: true,
			comment: "รหัสอ้างอิงตารางข่าว",
			autoIncrement: true
		},
		'name': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "หัวข้อข่าว"
		},
		'description': {
			type: DataTypes.TEXT,
			allowNull: true,
			comment: "รายละเอียดข่าว"
		},
		'mediaId': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "รหัสอ้างอิงตารางไฟล์สื่อ",
			references: {
				model: 'media',
				key: 'mediaId'
			}
		},
		'ownerId': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "รหัสอ้างอิงตารางผู้ใช้งาน"
		},
		'startDate': {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			comment: "วันที่เริ่มต้นการแสดงผลข่าว"
		},
		'endDate': {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			comment: "วันที่สิ้นสุดการแสดงผลข่าว"
		},
		'status': {
			type: DataTypes.ENUM('enable','disable'),
			allowNull: true,
			defaultValue: 'enable',
			comment: "สถานะการเปิด ปิดข่าว"
		},
		'sort': {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: '0',
			comment: "ลำดับการแสดงข่าว"
		},
		'link': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "link เก็บสำหรับคลิกไปที่ newtab"
		},
		'organizationCode': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "อ้างอิงสังกัด"
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
		tableName: 'banner'
	});
};
