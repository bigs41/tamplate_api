/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: --station
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `--station` (
  `Timestamp` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `letlog` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `admin_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `birthday` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `id_line` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: -school_admin_2
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `-school_admin_2` (
  `schoolCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `schoolName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `schoolShortName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `idCard` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `firstname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `lastname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `userType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: _station
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `_station` (
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `letlog` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: apiadmin
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `apiadmin` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'รหัสอ้างอิงผู้จัดการระบบ openAPI',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'อีเมลของผู้จัดการ',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'รหัสผ่าน (เฉพาะบัญชี root)',
  `createdAt` datetime(6) DEFAULT NULL COMMENT 'วันที่สร้างข้อมูล',
  `updatedAt` datetime(6) DEFAULT NULL COMMENT 'วันและเวลาที่ข้อมูลถูกแก้ไขล่าสุด',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: apilist
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `apilist` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'รหัสอ้างอิงรายการ API',
  `sort` int DEFAULT NULL COMMENT 'ลำดับ',
  `api` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'ชื่อ API',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'รายละเอียด',
  `createdAt` datetime(6) DEFAULT NULL COMMENT 'วันที่สร้างข้อมูล',
  `updatedAt` datetime(6) DEFAULT NULL COMMENT 'วันที่แก้ไขข้อมูล',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: apilistuser
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `apilistuser` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'รหัสอ้างอิงรายการ API และตารางผู้ใช้งาน',
  `apiListId` int DEFAULT NULL COMMENT 'รหัสอ้างอิงรายการ API',
  `apiUserId` int DEFAULT NULL COMMENT 'รหัสอ้างอิงผู้ใช้งาน API',
  `status` int DEFAULT NULL COMMENT 'สถานะ',
  `createdAt` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) COMMENT 'วันและเวลาที่ข้อมูลถูกสร้าง',
  `updatedAt` datetime(6) DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(6) COMMENT 'วันและเวลาที่ข้อมูลถูกแก้ไขล่าสุด',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `apiUserId` (`apiUserId`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: apimedia
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `apimedia` (
  `id` int NOT NULL COMMENT 'รหัสอ้างอิงข้อม',
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'ที่อยู่ไฟล์',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'ชื่อไฟล์',
  `apiUserId` int DEFAULT NULL COMMENT 'อ้างอิงรหัสผู้ใช้งาน API',
  `createdAt` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) COMMENT 'วันที่สร้างข้อมูล',
  `updatedAt` datetime(6) DEFAULT NULL COMMENT 'วันที่แก้ไขข้อมูล',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `fk_media_user` (`apiUserId`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: apiuser
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `apiuser` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'รหัสอ้างอิงผู้ใช้งาน API',
  `consumers_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'รหัสอ้างอิง API gateway (kong api)',
  `type` enum('บุคคลทั่วไป', 'องค์กรหรือหน่วยงานรัฐ') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'ประเภทผู้ใช้งาน',
  `prefix` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'คำนำหน้า',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'ชื่อ',
  `lastname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'นามสกุล',
  `idcard` varchar(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'รหัสเลขบัตรประชาชน',
  `birth` date DEFAULT NULL COMMENT 'วันเดือนปีเกิด',
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'อีเมล',
  `tel` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'เบอร์โทรที่ติดต่อได้',
  `sysname` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'ระบบที่ต้องการใช้งาน',
  `IdcardImgPath` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'ที่อยู่ภาพสำเนาบัตรประชาชน (บุคคลทั่วไป)',
  `affiliate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'สังกัด',
  `isCompany` int DEFAULT NULL COMMENT 'เป็นตัวแทนบริษัท',
  `companyName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'ชื่อบริษัท',
  `project` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'โครงการที่พัฒนา',
  `orgProject` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'หน่วยงานที่รับผิดชอบโครงการ',
  `apiName` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'ระบบที่ต้องการใช้งาน',
  `position` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'ตำแหน่ง',
  `department` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'กอง/ฝ่าย/แผนก',
  `status` enum('อนุมัติ', 'ไม่อนุมัติ', 'ยกเลิก') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'ไม่อนุมัติ' COMMENT 'สถานะ',
  `approvedDate` datetime DEFAULT NULL COMMENT 'วันที่อนุมัติ',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'วันที่สร้างข้อมูล',
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT 'วันที่แก้ไขข้อมูล',
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'ข้อมูล token',
  `detail` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: attachment
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `attachment` (
  `attachmentId` int NOT NULL AUTO_INCREMENT,
  `moduleId` int DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกสร้าง',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกแก้ไขล่าสุด',
  PRIMARY KEY (`attachmentId`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: banner
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `banner` (
  `bannerId` int NOT NULL AUTO_INCREMENT COMMENT 'รหัสอ้างอิงตารางข่าว',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'หัวข้อข่าว',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'รายละเอียดข่าว',
  `mediaId` int DEFAULT NULL COMMENT 'รหัสอ้างอิงตารางไฟล์สื่อ',
  `ownerId` int DEFAULT NULL COMMENT 'รหัสอ้างอิงตารางผู้ใช้งาน',
  `startDate` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันที่เริ่มต้นการแสดงผลข่าว',
  `endDate` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันที่สิ้นสุดการแสดงผลข่าว',
  `status` enum('enable', 'disable') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'enable' COMMENT 'สถานะการเปิด ปิดข่าว',
  `sort` int DEFAULT '0' COMMENT 'ลำดับการแสดงข่าว',
  `link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'link เก็บสำหรับคลิกไปที่ newtab',
  `organizationCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'อ้างอิงสังกัด',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกสร้าง',
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกแก้ไขล่าสุด',
  PRIMARY KEY (`bannerId`) USING BTREE,
  UNIQUE KEY `id` (`bannerId`) USING BTREE,
  KEY `fk_banner_media` (`mediaId`) USING BTREE,
  CONSTRAINT `banner_ibfk_1` FOREIGN KEY (`mediaId`) REFERENCES `media` (`mediaId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'ตารางข่าวสารและแบนเนอร์';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: classroom
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `classroom` (
  `classroomId` int NOT NULL AUTO_INCREMENT COMMENT 'รหัสอ้างอิงห้องเรียน',
  `subjectId` int DEFAULT NULL COMMENT 'รหัสอ้างอิงวิชา',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'ชื่อห้องเรียน',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'รายละเอียด',
  `startDate` datetime DEFAULT NULL COMMENT 'วันที่เปิดหัวเรียน',
  `endDate` datetime DEFAULT NULL COMMENT 'วันที่ปิดการใช้งานห้องเรียน',
  `stationAPIId` int DEFAULT NULL COMMENT 'รหัสศูนย์สอบที่ได้จาก API MOE',
  `lat` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'ละติจูดศูนย์สอบ',
  `long` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'ลองติจูดศูนย์สอบ',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกสร้าง',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกแก้ไขล่าสุด',
  PRIMARY KEY (`classroomId`) USING BTREE,
  UNIQUE KEY `id` (`classroomId`) USING BTREE,
  KEY `fk_classroom_subject` (`subjectId`) USING BTREE,
  CONSTRAINT `classroom_ibfk_1` FOREIGN KEY (`subjectId`) REFERENCES `subject` (`subjectId`) ON DELETE
  SET
  NULL ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'ตารางข้อมูลห้องเรียน';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: ex
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `ex` (
  `exId` int NOT NULL AUTO_INCREMENT COMMENT 'รหัสอ้างอิงตารางชุดข้อสอบ',
  `mediaId` int DEFAULT NULL COMMENT 'รหัสอ้างอิงตารางไฟล์สื่อ',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'รายละเอียด',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'คะแนนเต็มของชุดข้อสอบ',
  `maxScore` int DEFAULT NULL COMMENT 'คะแนนเต็มใน example',
  `userId` int DEFAULT NULL COMMENT 'id ผู้สร้าง',
  `createdBy` enum('skill', 'teacher', 'student') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'skill' COMMENT 'สร้างโดย skill,teacher,student',
  `exCategoryId` int DEFAULT NULL,
  `organizationCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'อ้างอิงสังกัด',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกสร้าง',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกแก้ไขล่าสุด',
  PRIMARY KEY (`exId`) USING BTREE,
  UNIQUE KEY `id` (`exId`) USING BTREE,
  KEY `fk_ex_media` (`mediaId`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'ตารางข้อมูลชุดข้อสอบ';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: ex_category
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `ex_category` (
  `exCategoryId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกสร้าง',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกแก้ไขล่าสุด',
  PRIMARY KEY (`exCategoryId`) USING BTREE,
  UNIQUE KEY `name` (`name`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: ex_question
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `ex_question` (
  `exQuestionId` int NOT NULL AUTO_INCREMENT COMMENT 'รหัสอ้างอิงตารางคำถามกับชุดข้อสอบ',
  `exId` int DEFAULT NULL COMMENT 'รหัสอ้างอิงตารางชุดข้อสอบ',
  `questionId` int DEFAULT NULL COMMENT 'รหัสอ้างอิงตารางคำถาม',
  `isComplete` enum('true', 'false') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'true' COMMENT 'ความสมบูรณ์ของคำถาม (ข้อมูลสมบูรณ์=true, ข้อมูลไม่สมบูรณ์=false)',
  `score` int DEFAULT NULL COMMENT 'คะแนนคำถาม',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกสร้าง',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกแก้ไขล่าสุด',
  PRIMARY KEY (`exQuestionId`) USING BTREE,
  UNIQUE KEY `id` (`exQuestionId`) USING BTREE,
  KEY `fk_exQuestion_question` (`questionId`) USING BTREE,
  KEY `fk_exQuestion_ex` (`exId`) USING BTREE,
  CONSTRAINT `ex_question_ibfk_1` FOREIGN KEY (`exId`) REFERENCES `ex` (`exId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ex_question_ibfk_2` FOREIGN KEY (`questionId`) REFERENCES `question` (`questionId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'ตารางคำถามกับชุดข้อสอบ';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: game
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `game` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subjectName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `class` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกสร้าง',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกแก้ไขล่าสุด',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: hcec
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `hcec` (
  `HCECId` int NOT NULL AUTO_INCREMENT COMMENT 'รหัสอ้างอิงตารางมาตรฐานการสอบ',
  `stationId` int DEFAULT NULL COMMENT 'รหัสอ้างอิงตารางศูนย์สอบ',
  `standardTestId` int DEFAULT NULL COMMENT 'รหัสอ้างอิงตารางมาตรฐานการสอบ',
  `address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'สถานที่สอบรุปแบบ JSON',
  `registStartDate` datetime DEFAULT NULL COMMENT 'วันที่เปิดลงทะเบียน',
  `registEndDate` datetime DEFAULT NULL COMMENT 'วันที่ปิดลงทะเบียน',
  `testStartDate` datetime DEFAULT NULL COMMENT 'วันที่เวลาที่เริ่มสอบ',
  `testEndDate` datetime DEFAULT NULL COMMENT 'วันที่เวลาสิ้นสุดการสอบ',
  `maxTester` int DEFAULT NULL COMMENT 'จำนวนคนที่เปิดรับสมัคร',
  `subjectMustPassed` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'รหัสวิชาที่สอบ รูปแบบ JSON',
  `status` enum('registering', 'testing', 'finished') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'สถานะของผู้สมัครสอบ',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกสร้าง',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกแก้ไขล่าสุด',
  PRIMARY KEY (`HCECId`) USING BTREE,
  KEY `fk_hdrc_station` (`stationId`) USING BTREE,
  CONSTRAINT `hcec_ibfk_1` FOREIGN KEY (`stationId`) REFERENCES `station` (`stationId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'ตารางมาตรฐานการสอบ';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: hcec_exam_round
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `hcec_exam_round` (
  `hcecExamRoundId` int NOT NULL AUTO_INCREMENT,
  `roomName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `stationId` int NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `maxUserAmount` int NOT NULL,
  `signUpEnable` tinyint(1) NOT NULL DEFAULT '1',
  `signUpStartDate` datetime NOT NULL,
  `signUpEndDate` datetime NOT NULL,
  `dismiss` tinyint(1) NOT NULL DEFAULT '0',
  `enable` tinyint(1) NOT NULL DEFAULT '1',
  `standardTestId` int NOT NULL,
  `tag` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '',
  `cancelBeforeDay` int NOT NULL DEFAULT '0',
  `color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `uid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกสร้าง',
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกแก้ไขล่าสุด',
  PRIMARY KEY (`hcecExamRoundId`) USING BTREE,
  KEY `signUpEnable` (`signUpEnable`, `dismiss`, `enable`) USING BTREE,
  KEY `startTime` (`startTime`) USING BTREE,
  KEY `endTime` (`endTime`) USING BTREE,
  KEY `signUpStartDate` (`signUpStartDate`) USING BTREE,
  KEY `signUpEndDate` (`signUpEndDate`) USING BTREE,
  KEY `roomName` (`roomName`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: hcec_exam_round_user
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `hcec_exam_round_user` (
  `hcecExamRoundId` int NOT NULL,
  `userId` int NOT NULL,
  `isBan` tinyint(1) NOT NULL DEFAULT '0',
  `isCancel` tinyint(1) NOT NULL DEFAULT '0',
  `accessKey` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกสร้าง',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกแก้ไขล่าสุด',
  PRIMARY KEY (`hcecExamRoundId`, `userId`) USING BTREE,
  KEY `userId` (`userId`) USING BTREE,
  KEY `hcecExamRoundId` (`hcecExamRoundId`) USING BTREE,
  CONSTRAINT `hcec_exam_round_user_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hcec_exam_round_user_ibfk_2` FOREIGN KEY (`hcecExamRoundId`) REFERENCES `hcec_exam_round_user` (`hcecExamRoundId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: help
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `help` (
  `helpId` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `topic` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `text` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` enum('reply', 'delete') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`helpId`) USING BTREE,
  UNIQUE KEY `id` (`helpId`) USING BTREE,
  KEY `fk_help_user` (`userId`) USING BTREE,
  CONSTRAINT `help_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: history
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `history` (
  `historyId` int NOT NULL AUTO_INCREMENT COMMENT 'รหัสอ้างอิงตารางประวัติการดูสื่อ',
  `userId` int DEFAULT NULL COMMENT 'รหัสอ้างอิงตารางผู้ใช้งาน',
  `isDel` enum('Y', 'N') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'N' COMMENT 'ลบประวัตินี้หรือไม่ (ใช่=Y, ไม่ใช่=N)',
  `subjectId` int DEFAULT NULL COMMENT 'รหัสอ้างอิงตารางวิชา',
  `moduleId` int DEFAULT NULL COMMENT 'รหัสอ้างอิงตารางโมดูล',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกสร้าง',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกแก้ไขล่าสุด',
  PRIMARY KEY (`historyId`) USING BTREE,
  UNIQUE KEY `id` (`historyId`) USING BTREE,
  KEY `fk_history_user` (`userId`) USING BTREE,
  KEY `fk_history_subject` (`subjectId`) USING BTREE,
  KEY `fk_history_module` (`moduleId`) USING BTREE,
  CONSTRAINT `history_ibfk_1` FOREIGN KEY (`moduleId`) REFERENCES `module` (`moduleId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `history_ibfk_2` FOREIGN KEY (`subjectId`) REFERENCES `subject` (`subjectId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `history_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'ตารางประวัติการดูสื่อ';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: idp
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `idp` (
  `idpId` int NOT NULL AUTO_INCREMENT COMMENT 'รหัสอ้างอิง idp',
  `valueId` int DEFAULT NULL COMMENT 'รหัสอ้างอิง trm',
  `userId` int DEFAULT NULL COMMENT 'รหัสอ้างอิง user',
  `code` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'รหัสอ้างอิงที่เกี่ยวข้องของ trm',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`idpId`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: log_learning
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `log_learning` (
  `logLearningId` int NOT NULL AUTO_INCREMENT COMMENT 'รหัสอ้างอิงตารางประวัติการเรียนรู้',
  `userId` int DEFAULT NULL COMMENT 'รหัสอ้างอิงตารางผู้ใช้งาน',
  `eventType` enum('learning', 'testing', 'online', 'hcce') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'online' COMMENT 'ประเภทเหตุการณ์ (ดูสื่อ, ทำแบบฝึกหัด, ออนไลน์)',
  `eventTime` int DEFAULT NULL COMMENT 'ระยะเวลาของเหตุการณ์ (หน่วย:วินาที)',
  `subjectId` int DEFAULT NULL COMMENT 'รหัสอ้างอิงตารางวิชา',
  `moduleId` int DEFAULT NULL COMMENT 'รหัสอ้างอิงบทเรียน',
  `testingAttemps` int DEFAULT NULL COMMENT 'เลขครั้งที่ของการสอบ',
  `score` int DEFAULT NULL COMMENT 'คะแนนคิดเป็นเปอเซนต์',
  `startDate` datetime DEFAULT NULL COMMENT 'วันเวลาที่เริ่มของเหตุการณ์',
  `endDate` datetime DEFAULT NULL COMMENT 'วันเวลาที่สิ้นสุดของเหตุการณ์',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกสร้าง',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกแก้ไขล่าสุด',
  `jsonDetail` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'รายละเอียดการสอบ',
  `stationCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'รหัสศูนย์สอบ',
  PRIMARY KEY (`logLearningId`) USING BTREE,
  UNIQUE KEY `id` (`logLearningId`) USING BTREE,
  UNIQUE KEY `userId` (`userId`, `eventType`, `moduleId`, `startDate`) USING BTREE,
  KEY `fk_logLearning_subjectId` (`subjectId`) USING BTREE,
  KEY `fk_logLearning_module` (`moduleId`) USING BTREE,
  CONSTRAINT `log_learning_ibfk_1` FOREIGN KEY (`moduleId`) REFERENCES `module` (`moduleId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `log_learning_ibfk_2` FOREIGN KEY (`subjectId`) REFERENCES `subject` (`subjectId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `log_learning_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'ตารางประวัติการเรียนรู้';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: logfile
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `logfile` (
  `file` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'ไฟล์ log',
  `request` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `transection` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `eventType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกสร้าง',
  `updatedAt` datetime DEFAULT NULL COMMENT 'วันและเวลาที่ข้อมูลถูกแก้ไข',
  PRIMARY KEY (`file`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: manager_user
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `manager_user` (
  `managerUserId` int NOT NULL AUTO_INCREMENT,
  `managerId` int DEFAULT NULL COMMENT 'user id หัวหน้า',
  `userId` int DEFAULT NULL COMMENT 'user id ลูกน้อง',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'ความคิดเห็นจากผู้บังคับบัญชา',
  `status` enum('wait', 'accept', 'cancel') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`managerUserId`) USING BTREE,
  UNIQUE KEY `id` (`managerUserId`) USING BTREE,
  KEY `userTang_user` (`userId`) USING BTREE,
  CONSTRAINT `manager_user_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: media
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `media` (
  `mediaId` int NOT NULL AUTO_INCREMENT COMMENT 'รหัสอ้างอิงตารางไฟล์สื่อ',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'ชื่อไฟล์',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'รายละเอียดไฟล์',
  `refId` int DEFAULT NULL COMMENT 'รหัสอ้างอิงตางตามคอลัมน์ refId',
  `refTable` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'ชื่อตาราง',
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'ที่อยู่ของไฟล์',
  `fileType` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'นามสกุลไฟล์',
  `mediaType` enum('cover', 'doc', '', 'media', 'youtube') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'ประเภทของไฟล์',
  `duration` int DEFAULT NULL COMMENT 'วินาที',
  `organizationCode` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `category` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdBy` int DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกสร้าง',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกแก้ไขล่าสุด',
  PRIMARY KEY (`mediaId`) USING BTREE,
  UNIQUE KEY `id` (`mediaId`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'ตารางไฟล์สื่อ';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: media_module
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `media_module` (
  `mediaModuleId` int NOT NULL AUTO_INCREMENT,
  `organizationCode` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `mediaId` int DEFAULT NULL,
  `moduleId` int DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`mediaModuleId`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: media_store
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `media_store` (
  `mediaStoreId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`mediaStoreId`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: module
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `module` (
  `moduleId` int NOT NULL AUTO_INCREMENT COMMENT 'รหัสอ้างอิงตารางโมดูล',
  `subjectId` int DEFAULT NULL COMMENT 'รหัสอ้างอิงตารางวิชา',
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'ลำดับหัวข้อแต่ละชั้นของโมดูล',
  `sort` int DEFAULT '1' COMMENT 'เลขเรียงลำดับโมดูล',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'ชื่อโมดูล',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'รายละเอียดโมดูล',
  `percentExPassed` int DEFAULT NULL COMMENT 'เปอร์เซนต์ที่ต้องสอบผ่าน',
  `videoId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'รหัสสตรีมมิ่งวิดีโอ',
  `learningMaxTime` int DEFAULT NULL COMMENT 'ระยะเวลาการเรียน',
  `testingMaxTime` int DEFAULT NULL COMMENT 'ระยะเวลาการสอบ',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกสร้าง',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกแก้ไขล่าสุด',
  PRIMARY KEY (`moduleId`) USING BTREE,
  KEY `subjectId` (`subjectId`) USING BTREE,
  CONSTRAINT `module_ibfk_1` FOREIGN KEY (`subjectId`) REFERENCES `subject` (`subjectId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'ตารางโมดูล';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: module_ex
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `module_ex` (
  `moduleExId` int NOT NULL AUTO_INCREMENT COMMENT 'รหัสอ้างอิงตารางวิชาและตารางชุดข้อสอบ',
  `moduleId` int DEFAULT NULL COMMENT 'รหัสอ้างอิงตารางวิชา',
  `exId` int DEFAULT NULL COMMENT 'รหัสอ้างอิงตารางชุดข้อสอบ',
  `timer` int DEFAULT '1800' COMMENT 'เวลาในการทำแบบทดสอบ (วินาที)',
  `passScore` int DEFAULT '70' COMMENT 'คะแนนในการผ่านเกณฑ์ (เปอร์เซ็น)',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกสร้าง',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกแก้ไขล่าสุด',
  PRIMARY KEY (`moduleExId`) USING BTREE,
  UNIQUE KEY `id` (`moduleExId`) USING BTREE,
  UNIQUE KEY `moduleId` (`moduleId`, `exId`) USING BTREE,
  KEY `fk_moduelEx_ex` (`exId`) USING BTREE,
  KEY `fk_moduleEx_module` (`moduleId`) USING BTREE,
  CONSTRAINT `module_ex_ibfk_1` FOREIGN KEY (`exId`) REFERENCES `ex` (`exId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `module_ex_ibfk_2` FOREIGN KEY (`moduleId`) REFERENCES `module` (`moduleId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'ตารางวิชาและตารางชุดข้อสอบ';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: mysubject
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `mysubject` (
  `userSubjectId` int NOT NULL AUTO_INCREMENT COMMENT 'รหัสอ้างอิงตารางวิชาของฉัน',
  `subjectId` int DEFAULT NULL COMMENT 'รหัสอ้างอิงตารางวิชา',
  `userId` int DEFAULT NULL COMMENT 'รหัสอ้างอิงตารางผู้ใช้งาน',
  `status` enum(
  'starting',
  'learning',
  'learnt',
  'tested',
  'stdTested'
  ) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'starting' COMMENT 'สถานะการเรียนวิชา starting=เริ่มบทเรียนแล้ว, learning=กำลังเรียน, learnt=เรียนจบแล้ว, tested=สอบท้ายวิชาแล้ว, stdTested=สอบวัดมาตรฐานจากศูนย์สอบแล้ว',
  `isFinished` enum('Y', 'N', 'cancelled') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'N' COMMENT 'เรียนจบแล้วหรือไม่',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกสร้าง',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกแก้ไขล่าสุด',
  PRIMARY KEY (`userSubjectId`) USING BTREE,
  UNIQUE KEY `id` (`userSubjectId`) USING BTREE,
  UNIQUE KEY `subjectId_userId` (`subjectId`, `userId`) USING BTREE,
  KEY `fk_mysubject_user` (`userId`) USING BTREE,
  CONSTRAINT `mysubject_ibfk_1` FOREIGN KEY (`subjectId`) REFERENCES `subject` (`subjectId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mysubject_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'ตารางวิชาของฉัน';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: notification
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `notification` (
  `notiId` int NOT NULL AUTO_INCREMENT COMMENT 'รหัสอ้างอิงตารางการแจ้งเตือน',
  `message` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'ข้อความ',
  `menu` enum('subject', 'advice') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'เมนูที่การแจ้งเตือนอ้างถึง',
  `userId` int DEFAULT NULL COMMENT 'รหัสอ้างอิงตารางผู้ใช้งาน',
  `refTable` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `refId` int DEFAULT NULL COMMENT 'รหัสอ้างอิงตารางตามคอลัมน์ menu',
  `isRead` tinyint(1) DEFAULT '0' COMMENT '0 คือยังไม่ได้อ่าน 1 คืออ่านแล้ว',
  `refURL` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกสร้าง',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกแก้ไขล่าสุด',
  PRIMARY KEY (`notiId`) USING BTREE,
  UNIQUE KEY `id` (`notiId`) USING BTREE,
  KEY `fk_notification_user` (`userId`) USING BTREE,
  CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'ตารางการแจ้งเตือน';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: organization
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `organization` (
  `organizationCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `subDomain` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `clsJurisdiction` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`organizationCode`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: personnel
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `personnel` (
  `organizationId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `personType` enum('ข้าราชการพลเรือนสามัญ') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'ข้าราชการพลเรือนสามัญ',
  `positionId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `icCard` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `firstname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `lastname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `birthdate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: policy_term
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `policy_term` (
  `policyTermId` int NOT NULL AUTO_INCREMENT COMMENT 'รหัสอ้างอิงตารางนโยบายและเงื่อนไข',
  `policy` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'นโยบาย',
  `term` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'เงื่อนไข',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกสร้าง',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกแก้ไขล่าสุด',
  PRIMARY KEY (`policyTermId`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'ตารางนโยบายและเงื่อนไข';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: position
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `position` (
  `positionId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'ชื่อตำแหน่ง',
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'รหัสตำแหน่ง',
  `org_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `organizationCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'อ้างอิงสังกัด',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกสร้าง',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกแก้ไขล่าสุด',
  PRIMARY KEY (`positionId`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: question
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `question` (
  `questionId` int NOT NULL AUTO_INCREMENT COMMENT 'รหัสอ้างอิงตารางคำถาม',
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'ข้อความคำตอบ',
  `soundPath` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'ที่อยู่ของไฟล์เสียง',
  `mediaPath` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'ที่อยู่ของไฟล์',
  `type` enum(
  'multipleChoices',
  'spellings',
  'fillInTheBlanks',
  'matchings',
  'trueOrFalses',
  'mathematicalEquations',
  'openQuestions',
  'groupQuestionSelect',
  'groupQuestion'
  ) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'ประเภทของคำถาม',
  `option` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `sort` int DEFAULT NULL COMMENT 'ลำดับ',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกสร้าง',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกแก้ไขล่าสุด',
  PRIMARY KEY (`questionId`) USING BTREE,
  UNIQUE KEY `id` (`questionId`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'ตารางคำถาม';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: question_answers
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `question_answers` (
  `questionAnswersId` int NOT NULL AUTO_INCREMENT COMMENT 'รหัสอ้างอิงตารางคำถามเชิงกลุ่ม',
  `questionId` int DEFAULT NULL COMMENT 'รหัสอ้างอิงตารางคำถาม',
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'ข้อความคำตอบ',
  `soundPath` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'ที่อยู่ของไฟล์เสียง',
  `mediaPath` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'ที่อยู่ของไฟล์',
  `sort` int DEFAULT NULL COMMENT 'ลำดับของคำตอบ (ข้อที่ 1 คือคำตอบที่ถูก)',
  `option` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'กำหนดค่าคำตอบ',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกสร้าง',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกแก้ไขล่าสุด',
  `messageQue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'ข้อความคำถาม(matching)',
  `mediaPathQue` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'ที่อยู่ของไฟล์คำถาม(matching)',
  PRIMARY KEY (`questionAnswersId`) USING BTREE,
  UNIQUE KEY `id` (`questionAnswersId`) USING BTREE,
  KEY `fk_questionAnswer_question` (`questionId`) USING BTREE,
  CONSTRAINT `question_answers_ibfk_1` FOREIGN KEY (`questionId`) REFERENCES `question` (`questionId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'ตารางคำถามเชิงกลุ่ม';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: role
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `role` (
  `roleId` int NOT NULL AUTO_INCREMENT COMMENT 'รหัสอ้างอิงตารางบทบาท',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'ชื่อบทบาท',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'รายละเอียดบทบาท',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกสร้าง',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกแก้ไขล่าสุด',
  PRIMARY KEY (`roleId`) USING BTREE,
  UNIQUE KEY `id` (`roleId`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'ตารางบทบาท';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: role_user
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `role_user` (
  `roleUserId` int NOT NULL AUTO_INCREMENT COMMENT 'รหัสอ้างอิงตารางบทบาทและตารางผู้ใช้งาน',
  `roleId` int DEFAULT NULL COMMENT 'รหัสอ้างอิงตารางบทบาท',
  `userId` int DEFAULT NULL COMMENT 'รหัสอ้างอิงตารางผู้ใช้งาน',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกสร้าง',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกแก้ไขล่าสุด',
  PRIMARY KEY (`roleUserId`) USING BTREE,
  UNIQUE KEY `id` (`roleUserId`) USING BTREE,
  KEY `fk_roleUser_role` (`roleId`) USING BTREE,
  KEY `fk_roleUser_user` (`userId`) USING BTREE,
  CONSTRAINT `role_user_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `role` (`roleId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `role_user_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'ตารางบทบาทและตารางผู้ใช้งาน';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: school
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `school` (
  `schoolId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `organizeNameTha` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `schoolName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `schoolNameEng` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `schoolHouseId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `schoolHouseNumber` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `schoolVillageNumber` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `schoolTrok` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `schoolSoi` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `schoolStreet` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `subdistrictName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `provinceName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `districtName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `schoolPostcode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`schoolId`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: school_admin
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `school_admin` (
  `schoolAdminId` int NOT NULL AUTO_INCREMENT,
  `schoolCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `schoolName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `schoolShortName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `A` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `idCard` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `firstname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `lastname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `userType` enum(
  'นายทะเบียน/ผู้รับผิดชอบข้อมูลของโรงเรียน',
  'ผู้บริหารของโรงเรียน'
  ) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'นายทะเบียน/ผู้รับผิดชอบข้อมูลของโรงเรียน',
  PRIMARY KEY (`schoolAdminId`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: school_admin_2
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `school_admin_2` (
  `schoolCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `schoolName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `schoolShortName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `idCard` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `firstname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `lastname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `userType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: self_learning
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `self_learning` (
  `selfLearningId` int NOT NULL AUTO_INCREMENT COMMENT 'รหัสอ้างอิงตารางเรียนรู้ด้วยตนเอง',
  `skillId` int DEFAULT NULL COMMENT 'รหัสอ้างอิงตารางทักษะ',
  `userId` int DEFAULT NULL COMMENT 'รหัสอ้างอิงตารางผู้ใช้งาน',
  `json` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT 'ข้อมูลการเรียนรู้ด้วยตนเองในรูปแบบ JSON',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกสร้าง',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกแก้ไขล่าสุด',
  PRIMARY KEY (`selfLearningId`) USING BTREE,
  UNIQUE KEY `id` (`selfLearningId`) USING BTREE,
  KEY `fk_selfLearning_user` (`userId`) USING BTREE,
  KEY `fk_skillLearning_skill` (`skillId`) USING BTREE,
  CONSTRAINT `self_learning_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `self_learning_ibfk_2` FOREIGN KEY (`skillId`) REFERENCES `skill` (`skillId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'ตารางเรียนรู้ด้วยตนเอง';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: service_token
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `service_token` (
  `serviceTokenId` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกสร้าง',
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกแก้ไขล่าสุด',
  PRIMARY KEY (`serviceTokenId`) USING BTREE,
  UNIQUE KEY `serviceTokenId` (`serviceTokenId`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: skill
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `skill` (
  `skillId` int NOT NULL AUTO_INCREMENT COMMENT 'รหัสอ้างอิงตารางทักษะ',
  `skill` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'ชื่อทักษะ',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกสร้าง',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกแก้ไขล่าสุด',
  PRIMARY KEY (`skillId`) USING BTREE,
  UNIQUE KEY `id` (`skillId`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'อ้างอิงตารางทักษะ';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: standardtest
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `standardtest` (
  `standardTestId` int NOT NULL AUTO_INCREMENT COMMENT 'รหัสอ้างอิงมาตรฐานการสอบ',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'ชื่อมาตรฐานการสอบ',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกสร้าง',
  `updatedAt` datetime DEFAULT NULL COMMENT 'วันและเวลาที่ข้อมูลถูกแก้ไขล่าสุด',
  PRIMARY KEY (`standardTestId`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: station
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `station` (
  `stationId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `geolocation` point DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`stationId`) USING BTREE,
  UNIQUE KEY `id` (`stationId`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'ตารางข้อมูลศูนย์สอบ';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: station_admin
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `station_admin` (
  `stationId` int NOT NULL,
  `userId` int NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกสร้าง',
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกแก้ไขล่าสุด',
  PRIMARY KEY (`stationId`, `userId`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: station_standard
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `station_standard` (
  `stationStandardId` int NOT NULL AUTO_INCREMENT,
  `standardTestId` int DEFAULT NULL,
  `stationId` int DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`stationStandardId`) USING BTREE,
  KEY `fk_stationstandard_standardTest` (`standardTestId`) USING BTREE,
  KEY `fk_stationstandard_station` (`stationId`) USING BTREE,
  CONSTRAINT `station_standard_ibfk_1` FOREIGN KEY (`standardTestId`) REFERENCES `standardtest` (`standardTestId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: subject
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `subject` (
  `subjectId` int NOT NULL AUTO_INCREMENT COMMENT 'รหัสอ้างอิงตารางวิชา',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'ชื่อวิชา',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'รายละเอียด',
  `userIdCreator` int DEFAULT NULL COMMENT 'รหัสอ้างอิงตารางวิชาผู้ใช้งาน (ข้อมูลของผู้สร้างวิชา)',
  `orgcodeCreator` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'รหัสหน่วยงานของผู้สร้างวิชา',
  `isLearningOrder` enum('Y', 'N') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'Y' COMMENT 'เรียนบทเรียนตามลำดับหรือไม่ (ใช่=Y, ไม่=N)',
  `cover` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT 'ที่อยู่ของไฟล์ปก',
  `owner_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `subjectCategoryId` int DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกสร้าง',
  `organizationCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'อ้างอิงสังกัด',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกแก้ไขล่าสุด',
  `createdBy` int DEFAULT NULL,
  `countUnit` int DEFAULT NULL COMMENT 'หน่วยกิตวิชา',
  `isPublic` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`subjectId`) USING BTREE,
  KEY `isPublic` (`isPublic`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'ตารางวิชา';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: subject_category
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `subject_category` (
  `subjectCategoryId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `organizationCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'อ้างอิงสังกัด',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกสร้าง',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกแก้ไขล่าสุด',
  PRIMARY KEY (`subjectCategoryId`) USING BTREE,
  UNIQUE KEY `name` (`name`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: subject_ex
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `subject_ex` (
  `subjectExId` int NOT NULL AUTO_INCREMENT COMMENT 'รหัสอ้างอิงตารางวิชาและชุดข้อสอบ',
  `subjectId` int DEFAULT NULL COMMENT 'รหัสอ้างอิงตารางวิชา',
  `exId` int DEFAULT NULL COMMENT 'รหัสอ้างอิงตารางชุดข้อสอบ',
  `timer` int DEFAULT '1800' COMMENT 'เวลาในการทำแบบทดสอบ (วินาที)',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกสร้าง',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกแก้ไขล่าสุด',
  `passScore` int DEFAULT '70' COMMENT 'คะแนนในการผ่านเกณฑ์ (เปอร์เซ็น)',
  PRIMARY KEY (`subjectExId`) USING BTREE,
  UNIQUE KEY `id` (`subjectExId`) USING BTREE,
  UNIQUE KEY `subjectId` (`subjectId`, `exId`) USING BTREE,
  KEY `fk_subjectEx_ex` (`exId`) USING BTREE,
  KEY `fk_subjectEx_subject` (`subjectId`) USING BTREE,
  CONSTRAINT `subject_ex_ibfk_1` FOREIGN KEY (`exId`) REFERENCES `ex` (`exId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `subject_ex_ibfk_2` FOREIGN KEY (`subjectId`) REFERENCES `subject` (`subjectId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'ตารางวิชาและชุดข้อสอบ';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: subject_hcec
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `subject_hcec` (
  `subjectHCECId` int NOT NULL AUTO_INCREMENT,
  `subjectId` int DEFAULT NULL,
  `hcecId` int DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`subjectHCECId`) USING BTREE,
  UNIQUE KEY `id` (`subjectHCECId`) USING BTREE,
  KEY `subjectHRDC_HRDC` (`hcecId`) USING BTREE,
  KEY `subjectHRDC_subject` (`subjectId`) USING BTREE,
  CONSTRAINT `subject_hcec_ibfk_1` FOREIGN KEY (`hcecId`) REFERENCES `hcec` (`HCECId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `subject_hcec_ibfk_2` FOREIGN KEY (`subjectId`) REFERENCES `subject` (`subjectId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: subject_typeuser
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `subject_typeuser` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subjectId` int DEFAULT NULL,
  `typeUser` enum('obec', 'onec', 'opse', 'ovec') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `subjectType` enum('แนะนำ', 'บังคับ') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: subject_user
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `subject_user` (
  `subjectUserId` int NOT NULL AUTO_INCREMENT COMMENT 'รหัสอ้างอิงตารางวิชาบังคับและแนะนำ',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'ชื่อ',
  `positionId` int DEFAULT NULL COMMENT 'รหัสตำแหน่ง',
  `subjectId` int DEFAULT NULL COMMENT 'รหัสตารางวิชา',
  `subjectType` enum('บังคับ', 'แนะนำ') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'บังคับ' COMMENT 'ประเภทของวิชา',
  `TRN_TEACHER_ACADEMIC_LEVEL_CODE` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกสร้าง',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกแก้ไขล่าสุด',
  PRIMARY KEY (`subjectUserId`) USING BTREE,
  UNIQUE KEY `id` (`subjectUserId`) USING BTREE,
  UNIQUE KEY `positionId` (`positionId`, `subjectId`) USING BTREE,
  UNIQUE KEY `subjectId` (`subjectId`, `TRN_TEACHER_ACADEMIC_LEVEL_CODE`) USING BTREE,
  UNIQUE KEY `positionId_2` (
  `positionId`,
  `subjectId`,
  `TRN_TEACHER_ACADEMIC_LEVEL_CODE`
  ) USING BTREE,
  KEY `fk_subjectuser_subject` (`subjectId`) USING BTREE,
  CONSTRAINT `subject_user_ibfk_1` FOREIGN KEY (`subjectId`) REFERENCES `subject` (`subjectId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'ตารางวิชาบังคับและแนะนำ';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: teacher
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `teacher` (
  `teacherJurisdictionId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `organizeNameTha` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `teacherSchoolId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `currentSchoolName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `teacherPersonId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `firstname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `lastname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `birthdate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `teacherAcademicLevelCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `educationLevelName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: teacher_education
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `teacher_education` (
  `teacherEducationId` int NOT NULL AUTO_INCREMENT,
  `TRN_TEACHER_ACADEMIC_LEVEL_CODE` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `EDUCATION_LEVEL_NAME` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` enum('enable', 'disable') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'enable' COMMENT 'สถานะการเปิด ปิดตำแหน่ง',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `org_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `code` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `organizationCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'อ้างอิงสังกัด',
  PRIMARY KEY (`teacherEducationId`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: trm_col
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `trm_col` (
  `colId` int NOT NULL AUTO_INCREMENT COMMENT 'รหัสอ้างอิงคอลัมน์',
  `value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'ชื่อ คอลัมน์',
  `sort` int DEFAULT NULL COMMENT 'ลำดับ คอลัมน์',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`colId`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: trm_subject
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `trm_subject` (
  `trmSubjectId` int NOT NULL AUTO_INCREMENT,
  `valueId` int DEFAULT NULL COMMENT 'อ้างอิง trm_value',
  `sort` int DEFAULT NULL COMMENT 'ลำดับ วิชา',
  `subjectId` int DEFAULT NULL COMMENT 'อ้างอิง subject',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`trmSubjectId`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: trm_value
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `trm_value` (
  `valueId` int NOT NULL AUTO_INCREMENT COMMENT 'รหัสอ้างอิงข้อมูล trm',
  `colId` int DEFAULT NULL COMMENT 'รหัสอ้างอิงคอลัมน์',
  `parent` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'รหัสอ้างอิงการเชื่อมโยงข้อมูล trm',
  `value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'ข้อมูล trm',
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'รหัสอ้างอิงองค์กร',
  `orgId` int DEFAULT NULL COMMENT 'รหัสอ้างอิงการ sync',
  `sort` int DEFAULT NULL COMMENT 'ลำดับข้อมูล trm',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`valueId`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: user
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `user` (
  `userId` int NOT NULL AUTO_INCREMENT COMMENT 'รหัสอ้างอิงตารางผู้ใช้งาน',
  `idCard` varchar(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'เลขบัตรประชาชน',
  `prefix` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `middlename` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'ชื่อ',
  `lastname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'นามสกุล',
  `email` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'อีเมล',
  `password` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'รหัสผ่านที่ถูกเข้ารหัส',
  `tel` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'เบอร์โทรศัพท์',
  `birthDate` datetime DEFAULT NULL COMMENT 'วันเกิด',
  `TRN_TEACHER_ACADEMIC_LEVEL_CODE` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'รหัสตำแหน่งครู',
  `positionId` int DEFAULT NULL COMMENT 'รหัสตำแหน่ง',
  `userType` enum('นักเรียน', 'ครู', 'ข้าราชการ') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'ประเภทของผู้ใช้งาน',
  `googleId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `geolocation` point DEFAULT NULL,
  `schoolId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `organizationCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `jurisdiction_id` int DEFAULT NULL COMMENT 'รหัสอ้างอิงสังกัด',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกสร้าง',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกแก้ไขล่าสุด',
  PRIMARY KEY (`userId`) USING BTREE,
  UNIQUE KEY `id` (`userId`) USING BTREE,
  UNIQUE KEY `email` (`email`) USING BTREE,
  UNIQUE KEY `idCard` (`idCard`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'ตารางผู้ใช้งาน';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: user_hcec
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `user_hcec` (
  `userHCECId` int NOT NULL AUTO_INCREMENT COMMENT 'รหัสอ้างอิงตารางผู้สมัครสอบ',
  `userId` int DEFAULT NULL COMMENT 'รหัสอ้างอิงตารางผู้ใช้งาน',
  `HCECId` int DEFAULT NULL COMMENT 'รหัสอ้างอิงตารางมาตรฐานการสอบ',
  `noRoom` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'เลขห้องสอบ',
  `note` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'หมายเหตุ',
  `status` enum(
  'มีสิทธิ์สอบ',
  'ไม่มีสิทธิ์สอบ',
  'ไม่ผ่าน',
  'ผ่าน',
  'disable'
  ) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'ไม่มีสิทธิ์สอบ' COMMENT 'สถานะผู้สมัคร',
  `log` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'เก็บการเปลี่ยนแปลงข้อมูลการสอบ',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกสร้าง',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกแก้ไขล่าสุด',
  PRIMARY KEY (`userHCECId`) USING BTREE,
  UNIQUE KEY `id` (`userHCECId`) USING BTREE,
  KEY `fk_userHRDC_userId` (`userId`) USING BTREE,
  CONSTRAINT `user_hcec_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'ตารางผู้สมัครสอบ';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: user_module
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `user_module` (
  `userModuleId` int NOT NULL AUTO_INCREMENT COMMENT 'รหัสอ้างอิงตารางการเรียนวิชาของผู้สมัคร',
  `moduleId` int DEFAULT NULL COMMENT 'รหัสอ้างอิงตารางโมดูล',
  `userId` int DEFAULT NULL COMMENT 'รหัสอ้างอิงตารางผู้ใช้งาน',
  `status` enum('learning', 'learnt') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'learning' COMMENT 'สถานะการเรียน',
  `score` decimal(10, 2) unsigned zerofill DEFAULT NULL COMMENT 'คะแนน',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกสร้าง',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกแก้ไขล่าสุด',
  PRIMARY KEY (`userModuleId`) USING BTREE,
  UNIQUE KEY `id` (`userModuleId`) USING BTREE,
  UNIQUE KEY `moduleId` (`moduleId`, `userId`) USING BTREE,
  KEY `fk_userModule_user` (`userId`) USING BTREE,
  CONSTRAINT `user_module_ibfk_1` FOREIGN KEY (`moduleId`) REFERENCES `module` (`moduleId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_module_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'ตารางการเรียนวิชาของผู้สมัคร';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: user_tang
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `user_tang` (
  `userTangId` int NOT NULL,
  `userId` int DEFAULT NULL,
  `tang` enum('OBEC', 'OVEC', 'OPSE') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`userTangId`) USING BTREE,
  UNIQUE KEY `id` (`userTangId`) USING BTREE,
  KEY `userTang_user` (`userId`) USING BTREE,
  CONSTRAINT `user_tang_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: user_teaching
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `user_teaching` (
  `userTeachingId` int NOT NULL AUTO_INCREMENT COMMENT 'รหัสอ้างอิงตารางข้อมูลการสอนของครู',
  `subjectTeachingCode` enum(
  'ภาษาไทย',
  'คณิตศาสตร์',
  'วิทยาศาสตร์',
  'สังคมศึกษา ศาสนา และวัฒนธรรม',
  'สุขศึกษาและพลศึกษา',
  'ศิลปะ',
  'การงานอาชีพและเทคโนโลยี',
  'ภาษาต่างประเทศ'
  ) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'รหัสวิชาการสอน',
  `GradeTeachingCode` enum(
  'ป1',
  'ป2',
  'ป3',
  'ป4',
  'ป5',
  'ป6',
  'ม1',
  'ม2',
  'ม3',
  'ม4',
  'ม5',
  'ม6',
  'อ1',
  'อ2',
  'อ3',
  '',
  'เตรียมอนุบาล'
  ) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'รหัสระดับชั้นการสอน',
  `userId` int DEFAULT NULL COMMENT 'รหัสอ้างอิงตารางผู้ใช้งาน',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกสร้าง',
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'วันและเวลาที่ข้อมูลถูกแก้ไขล่าสุด',
  PRIMARY KEY (`userTeachingId`) USING BTREE,
  UNIQUE KEY `id` (`userTeachingId`) USING BTREE,
  KEY `fk_userTeaching_user` (`userId`) USING BTREE,
  CONSTRAINT `user_teaching_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'ตารางข้อมูลการสอนของครู';

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: whitelist
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `whitelist` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `apiKey` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `secretKey` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
