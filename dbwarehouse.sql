/*
 Navicat Premium Data Transfer

 Source Server         : ltw2
 Source Server Type    : MySQL
 Source Server Version : 100408
 Source Host           : localhost:3307
 Source Schema         : dbwarehouse

 Target Server Type    : MySQL
 Target Server Version : 100408
 File Encoding         : 65001

 Date: 02/12/2020 23:20:19
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account`  (
  `id_account` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `rf_id` int(200) NULL DEFAULT NULL,
  `password` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `user_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `role_account` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `position_detail` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_account`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of account
-- ----------------------------
INSERT INTO `account` VALUES (3, 'Thaiss', 12345, '$2a$12$n00qfe5Alv82D0ic4gRjFO6aQ7GQWVdUOXjYb5OgI5e3QKBjoIedO', 'thaigogo', '0', 'NHAN_VIEN');
INSERT INTO `account` VALUES (4, 'Nguyen Thai', NULL, '$2a$12$wY6UgfZwCI9gMyRg9JKpWO7p8qdLYaQRJ0GbqQOvSnmaIWplkNL.q', 'thaigo gó', '0', 'NHAN_VIEN');
INSERT INTO `account` VALUES (5, 'Nguyen Thai', NULL, '$2a$12$NtPa7IvUItS3yDjAIawW1ecMvF4qnDaQK3jh2mJiNsusQkE.mvj32', 'thái', '0', 'NHAN_VIEN');
INSERT INTO `account` VALUES (6, 'Nguyen Thai', NULL, '$2a$12$K/IbNr8ne8E.oF.kklyNCO.mmZTarG07AWN/lPplQ0GTdd.5l5dzG', 'tháis', '0', 'NHAN_VIEN');
INSERT INTO `account` VALUES (7, 'Nguyen Thai', NULL, '$2a$12$kQ2YXiEm.JjMvziLi6eduO2ykTzonMWsPZUE.yun.1uP7a/UuaUoi', 'há', '0', 'NHAN_VIEN');
INSERT INTO `account` VALUES (8, 'Nguyen Thai', NULL, '$2a$12$711ICPYgYogWuS0cdBBwieTUY0p9AJG51FfhI9THEYV4ZLaNJqxnG', 'áa', '0', 'NHAN_VIEN');
INSERT INTO `account` VALUES (9, 'Nguyen Thai', NULL, '$2a$12$08YNN/i8uVs/K0LrUPxLium8fCOeO16kG4vFbDFcNnQbmivObMRJm', 'áaa', '0', 'NHAN_VIEN');
INSERT INTO `account` VALUES (10, 'Nguyen Thai', NULL, '$2a$12$je5cAR7YHTlxli.EOMVoTOCn6ustZT/CCoxjnCWDDJifALTt0ghPS', 'nguyễn thái', '0', 'NHAN_VIEN');
INSERT INTO `account` VALUES (11, 'Nguyen Thai', NULL, '$2a$12$cd2efWQoX8TFJG8y2gANFOk4zT0Ol63XUipC88t0rNRhCVfA4/ah2', 'nguyễn tháia', '0', 'NHAN_VIEN');
INSERT INTO `account` VALUES (12, 'Nguyen Thai', NULL, '$2a$12$j2uVt8cvHh/tmsv7Lhc/ReqhzUUR9SoiLer1ZRO4JcnuH8EaCsazq', 'us', '0', 'NHAN_VIEN');
INSERT INTO `account` VALUES (13, 'Nguyen Thai', NULL, '$2a$12$0VNLaxf5WpOXVfN3CjzpU.Tmai65lOHIx6V0zJKi1IXO04V7.Aqka', 'usa', '0', 'NHAN_VIEN');
INSERT INTO `account` VALUES (14, 'Nguyen Thai 1', NULL, '$2a$12$7WTS0QNyx2AUdRUbOtJT8e.0iwgyUre5Pg0ttwLrYI4QCJBZGt0aG', 'thaicc', '1', 'NHAN_VIEN');
INSERT INTO `account` VALUES (15, 'Nguyễn Trọng Thái', NULL, '$2a$12$pl3wYUTMZSXX6wf1eojH/.1zMEEPQsxKUlsM8d6YfPM0t6X1X6Q1O', 'thaigogo121', '0', 'NHAN_VIEN');
INSERT INTO `account` VALUES (16, 'Nguyễn Trọng Tháiiiii', NULL, '$2a$12$Ud.jp.t2HuE4qT83cOAyj.8AclKr35F1EB.yxT0JzbwI.C2VN2H/u', 'nguyenthai', '0', 'NHAN_VIEN');
INSERT INTO `account` VALUES (17, 'Nguyễn Trọng Tháid', NULL, '$2a$12$15jp5q0jfCfhPVZoHX8mae7cFLdubR6WjjmmuiBOXABZraPfD74SC', 'thaigogo1211', '0', 'NHAN_VIEN');
INSERT INTO `account` VALUES (18, 'Nguyễn Trọng Thái3', 123456, '$2a$12$1FUM.xBcbbMIFMZY6tLaI.80QdtYSSZA3/412WpNSAevbMt3jw4YG', 'thaigogo11111', '0', 'NHAN_VIEN');
INSERT INTO `account` VALUES (19, 'Nguyễn Trọng Tháiiiiiiiiiiii', 123321, '$2a$12$dNkz1BL7ilQ2ec.uE0l6U.Ho9qo/FYKXCVwGI7mQSJhX4XjxZN4/q', 'admin', '1', 'NHAN_VIEN');

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `id_category` int(11) NOT NULL AUTO_INCREMENT,
  `name_category` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `id_shelf` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id_category`) USING BTREE,
  INDEX `FK_category_id_shelf_shelf_id_shelf`(`id_shelf`) USING BTREE,
  CONSTRAINT `FK_category_id_shelf_shelf_id_shelf` FOREIGN KEY (`id_shelf`) REFERENCES `shelf` (`id_shelf`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (1, 'đồ cắt', 1);

-- ----------------------------
-- Table structure for device
-- ----------------------------
DROP TABLE IF EXISTS `device`;
CREATE TABLE `device`  (
  `id_device` int(11) NOT NULL AUTO_INCREMENT,
  `name_device` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `id_product` int(11) NULL DEFAULT NULL,
  `length_device` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `resolution` float NULL DEFAULT NULL,
  `pos_x` int(11) NULL DEFAULT NULL,
  `pos_y` int(11) NULL DEFAULT NULL,
  `unit` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `status` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `note` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `role` int(1) NULL DEFAULT NULL,
  `date_in` timestamp(0) NULL DEFAULT NULL,
  `rfid` int(200) NULL DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_device`) USING BTREE,
  INDEX `FK_device_id_product_product_id_product`(`id_product`) USING BTREE,
  CONSTRAINT `FK_device_id_product_product_id_product` FOREIGN KEY (`id_product`) REFERENCES `product` (`id_product`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of device
-- ----------------------------
INSERT INTO `device` VALUES (1, 'kéo dài', 1, '10', NULL, 123, 123, NULL, 'không khóa', NULL, 0, '2020-11-19 20:30:25', 123, 'background.jpg');
INSERT INTO `device` VALUES (2, 'kéo ngắn', 1, '5', NULL, 345, 345, NULL, 'khóa', NULL, 0, '2020-11-19 20:30:51', 456, 'dao_tien.jpg');
INSERT INTO `device` VALUES (3, 'kéo trung', 1, '8', NULL, 13123, 13123, NULL, 'không khóa', NULL, 0, '2020-11-19 20:31:10', 789, 'may-khoan-bosch-gbm10re.jpg');
INSERT INTO `device` VALUES (4, 'dao', 2, '15', NULL, 41412, 41442, NULL, 'khóa', NULL, 1, '2020-11-19 20:31:37', 13123, 'panme.jpg');

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product`  (
  `id_product` int(11) NOT NULL AUTO_INCREMENT,
  `name_product` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `id_category` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id_product`) USING BTREE,
  INDEX `FK_product_id_category_category_id_category`(`id_category`) USING BTREE,
  CONSTRAINT `FK_product_id_category_category_id_category` FOREIGN KEY (`id_category`) REFERENCES `category` (`id_category`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES (1, 'kéo', 1);
INSERT INTO `product` VALUES (2, 'dao', 1);
INSERT INTO `product` VALUES (3, 'liềm', 1);

-- ----------------------------
-- Table structure for report
-- ----------------------------
DROP TABLE IF EXISTS `report`;
CREATE TABLE `report`  (
  `id_report` int(11) NOT NULL AUTO_INCREMENT,
  `id_account` int(11) NULL DEFAULT NULL,
  `id_device` int(11) NULL DEFAULT NULL,
  `date_rent` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `date_back` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `note_report` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `check_status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_report`) USING BTREE,
  INDEX `FK_report_id_account_account_id_account`(`id_account`) USING BTREE,
  INDEX `FK_report_id_device_device_id_device`(`id_device`) USING BTREE,
  CONSTRAINT `FK_report_id_account_account_id_account` FOREIGN KEY (`id_account`) REFERENCES `account` (`id_account`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_report_id_device_device_id_device` FOREIGN KEY (`id_device`) REFERENCES `device` (`id_device`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of report
-- ----------------------------
INSERT INTO `report` VALUES (7, 3, 1, '1605967351', '1605967353', 'Mươn sẽ trả', 'TAKEN');
INSERT INTO `report` VALUES (8, 3, 1, '1605967351', '1605967353', 'Mươn sẽ trả nha', NULL);
INSERT INTO `report` VALUES (9, 3, 1, '1605967351', '1605967353', 'Mươn sẽ trả nha', NULL);
INSERT INTO `report` VALUES (10, 3, 1, '1605967351', '1605967353', 'Mươn sẽ trả nha hihi', 'TAKEN');
INSERT INTO `report` VALUES (11, 3, 2, '1605967351', '1605967353', 'Mươn sẽ trả nha hihi', 'REGISTER');
INSERT INTO `report` VALUES (12, 3, 1, '1605967351', '1605967353', 'Mươn sẽ trả nha hihi', 'BORROW');
INSERT INTO `report` VALUES (13, 3, 1, '30/10/2020 22:1', NULL, 'Mượn làm', 'BORROW');
INSERT INTO `report` VALUES (14, 3, 1, '30/10/2020 22:9', NULL, 'ĐÀO HỐ', 'BORROW');
INSERT INTO `report` VALUES (15, 3, 1, '30/10/2020 22:13', '30/10/2020 22:9', 'xây nhà', 'TAKEN');
INSERT INTO `report` VALUES (16, 3, 1, '30/10/2020 22:16', '30/10/2020 22:1', 'làm gừng', 'TAKEN');
INSERT INTO `report` VALUES (17, 3, 1, '30/10/2020 22:23', NULL, 'mượn chơi', 'BORROW');
INSERT INTO `report` VALUES (18, 3, 1, '30/10/2020 22:35', NULL, 'làm việc', 'BORROW');
INSERT INTO `report` VALUES (19, 3, 1, '30/10/2020 22:37', NULL, 'lấy về làm việc', 'BORROW');
INSERT INTO `report` VALUES (20, 3, 1, '30/10/2020 22:40', NULL, 'lấy về làm việc thêm', 'BORROW');
INSERT INTO `report` VALUES (21, 3, 1, '30/10/2020 22:51', NULL, 'mượn đi chơi', 'BORROW');
INSERT INTO `report` VALUES (22, 3, 1, '30/10/2020 22:52', '05/12/2020 22:00', 'lấy đi chơi', 'TAKEN');
INSERT INTO `report` VALUES (23, 3, 1, '30/10/2020 22:53', '05/12/2020 23:00', 'lấy đi làm việc', 'TAKEN');

-- ----------------------------
-- Table structure for shelf
-- ----------------------------
DROP TABLE IF EXISTS `shelf`;
CREATE TABLE `shelf`  (
  `id_shelf` int(11) NOT NULL AUTO_INCREMENT,
  `name_shelf` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `id_wh` int(11) NULL DEFAULT NULL,
  `total_slot` int(11) NULL DEFAULT NULL,
  `blank` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id_shelf`) USING BTREE,
  INDEX `FK_shelf_id_wh_warehouse_id_wh`(`id_wh`) USING BTREE,
  CONSTRAINT `FK_shelf_id_wh_warehouse_id_wh` FOREIGN KEY (`id_wh`) REFERENCES `warehouse` (`id_wh`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of shelf
-- ----------------------------
INSERT INTO `shelf` VALUES (1, 'TU_01', 1, 81, 19);

-- ----------------------------
-- Table structure for warehouse
-- ----------------------------
DROP TABLE IF EXISTS `warehouse`;
CREATE TABLE `warehouse`  (
  `id_wh` int(11) NOT NULL AUTO_INCREMENT,
  `name_warehouse` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_wh`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of warehouse
-- ----------------------------
INSERT INTO `warehouse` VALUES (1, 'KHO_01');

SET FOREIGN_KEY_CHECKS = 1;
